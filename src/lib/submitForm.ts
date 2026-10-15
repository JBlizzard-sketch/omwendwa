import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";

export type FormPayload =
  | { kind: "enquiry"; name: string; email: string; phone?: string; practice_area?: string; urgency?: string; message: string; source?: string }
  | { kind: "booking"; name: string; email: string; phone?: string; practice_area: string; urgency?: string; summary: string; mode: "video" | "in-person" | "phone"; slot_date: string; slot_time: string }
  | { kind: "newsletter"; email: string };

export async function submitForm(payload: FormPayload): Promise<{ ok: boolean; reference?: string; error?: string }> {
  const { data, error } = await supabase.functions.invoke("submit-form", { body: payload });
  if (error) {
    let msg = "Something went wrong. Please call +254 796 759 632.";
    if (error instanceof FunctionsHttpError) {
      try { const body = await error.context.json(); if (body?.error) msg = body.error; } catch { /* ignore */ }
    }
    return { ok: false, error: msg };
  }
  return { ok: true, reference: data?.reference };
}

export async function fetchTakenSlots(from: string, to: string): Promise<Set<string>> {
  const { data } = await supabase.rpc("get_taken_slots", { _from: from, _to: to });
  return new Set((data ?? []).map((r: { slot_date: string; slot_time: string }) => `${r.slot_date}|${r.slot_time}`));
}
