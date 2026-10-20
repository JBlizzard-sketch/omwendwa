import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { CalendarDays, Inbox, LogOut, RefreshCw, ShieldCheck, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useStaff } from "@/hooks/use-staff";
import { canManageRecords, canReadActivity, bookingStatuses, enquiryStatuses } from "@/lib/staffRules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOHead from "@/components/SEOHead";
import { canEditArticles } from "@/lib/editorialRules";

type RecordRow = Tables<"enquiries"> | Tables<"consultation_bookings">;

function RecordItem({ row, booking, editable, onSaved }: { row: RecordRow; booking: boolean; editable: boolean; onSaved: () => void }) {
  const [notes, setNotes] = useState(row.staff_notes);
  const [status, setStatus] = useState(row.status);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const save = async () => {
    setBusy(true); setMessage("");
    try {
      const { data, error } = await supabase.from(booking ? "consultation_bookings" : "enquiries").update({ status, staff_notes: notes }).eq("id", row.id).select("id");
      if (error || !data?.length) setMessage("Changes were not saved. Please refresh and try again.");
      else { setMessage("Saved"); onSaved(); }
    } catch { setMessage("Changes were not saved. Check your connection."); }
    finally { setBusy(false); }
  };
  return <article className="rounded-lg border bg-card p-5 min-w-0">
    <div className="flex flex-wrap justify-between gap-3 mb-3"><h3 className="text-xl break-words">{row.name}</h3><span className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleDateString("en-KE")}</span></div>
    <p className="text-sm text-primary mb-2">{row.practice_area || "General enquiry"}</p>
    {"slot_date" in row && <p className="text-sm mb-3">{row.slot_date} · {row.slot_time} EAT · {row.mode} · {row.reference}</p>}
    <p className="text-sm whitespace-pre-wrap break-words mb-4">{"message" in row ? row.message : row.summary}</p>
    <div className="text-sm space-y-1 mb-5"><a className="text-primary underline break-all" href={`mailto:${row.email}`}>{row.email}</a>{row.phone && <p><a className="text-primary underline" href={`tel:${row.phone}`}>{row.phone}</a></p>}</div>
    <Label htmlFor={`status-${row.id}`}>Status</Label>
    <Select value={status} onValueChange={setStatus} disabled={!editable || busy}><SelectTrigger id={`status-${row.id}`}><SelectValue /></SelectTrigger><SelectContent>{(booking ? bookingStatuses : enquiryStatuses).map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
    <Label className="block mt-4 mb-1" htmlFor={`notes-${row.id}`}>Private staff notes</Label>
    <Textarea id={`notes-${row.id}`} value={notes} onChange={e => setNotes(e.target.value)} disabled={!editable || busy} maxLength={10000} />
    <div className="flex items-center gap-3 mt-4">{editable && <Button size="sm" disabled={busy} onClick={() => void save()}>{busy ? "Saving…" : "Save changes"}</Button>}<span role="status" className="text-sm">{message}</span></div>
  </article>;
}

export default function StaffWorkspace() {
  const staff = useStaff();
  const [enquiries, setEnquiries] = useState<Tables<"enquiries">[]>([]);
  const [bookings, setBookings] = useState<Tables<"consultation_bookings">[]>([]);
  const [activity, setActivity] = useState<Tables<"staff_activity">[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const isAdmin = canReadActivity(staff.roles);
  const permitted = staff.roles.length > 0;
  useEffect(() => {
    if (!staff.user || !permitted) return;
    let active = true;
    setLoading(true); setError("");
    const load = async () => {
      try {
        const [e, b, p, a] = await Promise.all([
          supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100),
          supabase.from("consultation_bookings").select("*").order("slot_date", { ascending: true }).limit(100),
          supabase.from("profiles").select("display_name").eq("id", staff.user?.id ?? "").maybeSingle(),
          isAdmin ? supabase.from("staff_activity").select("*").order("created_at", { ascending: false }).limit(50) : Promise.resolve({ data: [], error: null }),
        ]);
        if (!active) return;
        if (e.error || b.error || p.error || a.error) { setError("Firm records could not be loaded. Please refresh."); return; }
        setEnquiries(e.data ?? []); setBookings(b.data ?? []); setDisplayName(p.data?.display_name ?? ""); setActivity(a.data ?? []);
      } catch { if (active) setError("Firm records could not be loaded. Check your connection."); }
      finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, [staff.user?.id, permitted, isAdmin, revision]);
  const signOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError("Sign-out failed. Please try again.");
  };
  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!staff.user) return;
    const { data, error: saveError } = await supabase.from("profiles").update({ display_name: displayName.trim() }).eq("id", staff.user.id).select("id");
    setProfileMessage(saveError || !data?.length ? "Your name could not be saved." : "Name saved");
  };
  const visible = (rows: RecordRow[]) => rows.filter(row => (filter === "all" || row.status === filter) && `${row.name} ${row.email} ${row.practice_area}`.toLowerCase().includes(search.toLowerCase()));
  if (staff.loading) return <p role="status" className="p-10">Checking secure staff access…</p>;
  if (!staff.user) return <Navigate to="/staff/login" replace />;
  if (!permitted) return <section className="max-w-lg mx-auto px-6 py-20"><SEOHead title="Staff access" description="Private staff access." noindex /><ShieldCheck className="text-primary mb-5" /><h1 className="text-4xl mb-4">Access not assigned</h1><p className="text-muted-foreground mb-6">{staff.error || "This account has no staff role. Ask the firm's administrator to activate your invitation."}</p><Button onClick={() => void signOut()}><LogOut />Sign out</Button></section>;
  return <section className="max-w-6xl mx-auto px-5 py-12">
    <SEOHead title="Private staff workspace" description="Protected enquiries and consultation records." noindex />
    {canEditArticles(staff.roles) && <Button asChild variant="outline" className="mb-6"><Link to="/staff/articles">Article publishing</Link></Button>}
    <div className="flex justify-between flex-wrap gap-5 border-b pb-7 mb-7"><div><p className="text-sm text-primary mb-2">O. Mwendwa & Company Advocates</p><h1 className="text-4xl">{displayName ? `Welcome, ${displayName}` : "Firm workspace"}</h1><p className="text-sm text-muted-foreground mt-3 capitalize">{staff.roles.join(" · ")}</p></div><div className="flex gap-2"><Button variant="outline" title="Refresh records" aria-label="Refresh records" size="icon" onClick={() => setRevision(r => r + 1)}><RefreshCw /></Button><Button variant="outline" onClick={() => void signOut()}><LogOut />Sign out</Button></div></div>
    <Tabs defaultValue="enquiries" onValueChange={() => setFilter("all")}>
      <TabsList className="h-auto flex flex-wrap justify-start gap-1 mb-6"><TabsTrigger value="enquiries"><Inbox className="h-4 w-4 mr-2" />Enquiries</TabsTrigger><TabsTrigger value="bookings"><CalendarDays className="h-4 w-4 mr-2" />Bookings</TabsTrigger>{isAdmin && <TabsTrigger value="activity"><ShieldCheck className="h-4 w-4 mr-2" />Activity</TabsTrigger>}<TabsTrigger value="profile"><UserRound className="h-4 w-4 mr-2" />My profile</TabsTrigger></TabsList>
      {error && <p role="alert" className="text-destructive mb-5">{error}</p>}
      {(["enquiries", "bookings"] as const).map(tab => <TabsContent key={tab} value={tab}>
        <div className="flex flex-wrap gap-3 mb-6"><Input className="max-w-sm" aria-label="Search firm records" placeholder="Search name, email or practice area" value={search} onChange={e => setSearch(e.target.value)} /><Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-44" aria-label="Filter by status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{(tab === "bookings" ? bookingStatuses : enquiryStatuses).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
        {loading ? <p role="status">Loading firm records…</p> : error ? null : visible(tab === "bookings" ? bookings : enquiries).length ? <div className="grid md:grid-cols-2 gap-5">{visible(tab === "bookings" ? bookings : enquiries).map(row => <RecordItem key={`${row.id}-${revision}`} row={row} booking={tab === "bookings"} editable={canManageRecords(staff.roles)} onSaved={() => setRevision(r => r + 1)} />)}</div> : <p className="text-muted-foreground py-10">No matching {tab}.</p>}
      </TabsContent>)}
      {isAdmin && <TabsContent value="activity"><h2 className="text-2xl mb-5">Recent activity</h2>{activity.length ? <ul className="divide-y">{activity.map(item => <li key={item.id} className="py-4"><p className="text-sm">{item.action}</p><p className="text-xs text-muted-foreground break-all">{item.record_type === "enquiries" ? "Enquiry" : "Booking"} · {new Date(item.created_at).toLocaleString("en-KE")} · Staff ID {item.actor_id}</p></li>)}</ul> : <p className="text-muted-foreground">No recorded staff changes yet.</p>}</TabsContent>}
      <TabsContent value="profile"><form onSubmit={saveProfile} className="max-w-md space-y-4"><h2 className="text-2xl">My profile</h2><div><Label htmlFor="display-name">Display name</Label><Input id="display-name" maxLength={100} value={displayName} onChange={e => setDisplayName(e.target.value)} required /></div><Button type="submit">Save name</Button><p role="status">{profileMessage}</p></form></TabsContent>
    </Tabs>
  </section>;
}