import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const enquiry = z.object({
  kind: z.literal("enquiry"),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  practice_area: z.string().trim().max(120).optional().default(""),
  urgency: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(5).max(3000),
  source: z.string().trim().max(40).optional().default("contact"),
  website: z.string().max(0).optional(), // honeypot
});

const booking = z.object({
  kind: z.literal("booking"),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  practice_area: z.string().trim().min(1).max(120),
  urgency: z.string().trim().max(40).optional().default(""),
  summary: z.string().trim().min(10).max(3000),
  mode: z.enum(["video", "in-person", "phone"]).default("video"),
  slot_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot_time: z.string().regex(/^\d{2}:\d{2}$/),
  website: z.string().max(0).optional(),
});

const newsletter = z.object({
  kind: z.literal("newsletter"),
  email: z.string().trim().email().max(255),
  website: z.string().max(0).optional(),
});

const schema = z.discriminatedUnion("kind", [enquiry, booking, newsletter]);

async function hashIp(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip + "omca"));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return json({ error: "Please check the form fields and try again." }, 400);
  const data = parsed.data;
  if (data.website) return json({ ok: true }); // bot

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ip_hash = await hashIp(ip);
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const table = data.kind === "enquiry" ? "enquiries" : data.kind === "booking" ? "consultation_bookings" : "newsletter_subscribers";
  const { count } = await db.from(table).select("id", { count: "exact", head: true }).eq("ip_hash", ip_hash).gte("created_at", since);
  if ((count ?? 0) >= 5) return json({ error: "Too many submissions. Please try again later or call +254 796 759 632." }, 429);

  if (data.kind === "enquiry") {
    const { website: _w, kind: _k, ...row } = data;
    const { error } = await db.from("enquiries").insert({ ...row, consent_privacy: true, ip_hash });
    if (error) { console.error(error); return json({ error: "Could not save your enquiry." }, 500); }
    return json({ ok: true });
  }

  if (data.kind === "booking") {
    const day = new Date(data.slot_date + "T00:00:00Z");
    if (day.getTime() < Date.now() - 86400000 || [0, 6].includes(day.getUTCDay())) {
      return json({ error: "Please choose a weekday in the future." }, 400);
    }
    const reference = `OM-${data.slot_date.replace(/-/g, "").slice(4)}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    const { website: _w, kind: _k, ...row } = data;
    const { error } = await db.from("consultation_bookings").insert({ ...row, reference, consent_privacy: true, ip_hash });
    if (error) {
      if (error.code === "23505") return json({ error: "That time was just taken. Please pick another slot." }, 409);
      console.error(error); return json({ error: "Could not save your booking." }, 500);
    }
    return json({ ok: true, reference });
  }

  const { error } = await db.from("newsletter_subscribers").upsert(
    { email: data.email.toLowerCase(), status: "subscribed", ip_hash },
    { onConflict: "email", ignoreDuplicates: true },
  );
  if (error) { console.error(error); return json({ error: "Could not subscribe." }, 500); }
  return json({ ok: true });
});
