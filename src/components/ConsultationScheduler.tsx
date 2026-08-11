import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Clock, ArrowRight, Video, Building2, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/ScrollReveal";
import { practiceAreas } from "@/data/practiceAreas";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const formatDateLabel = (d: Date) =>
  d.toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" });

const formatDateValue = (d: Date) => d.toISOString().slice(0, 10);

const buildNextDays = (count = 10) => {
  const days: Date[] = [];
  const today = new Date();
  let added = 0;
  let cursor = 0;
  while (added < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + cursor);
    cursor++;
    const day = d.getDay();
    if (day === 0 || day === 6) continue; // weekdays only
    days.push(d);
    added++;
  }
  return days;
};

const ConsultationScheduler = () => {
  const days = useMemo(() => buildNextDays(10), []);
  const [date, setDate] = useState<string>(formatDateValue(days[0]));
  const [time, setTime] = useState<string>("");
  const [mode, setMode] = useState<"video" | "in-person" | "phone">("video");
  const [practiceArea, setPracticeArea] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState<string>("");
  const [opposingParty, setOpposingParty] = useState("");
  const [priorAdvocate, setPriorAdvocate] = useState("");
  const [summary, setSummary] = useState("");

  const canSubmit = date && time && practiceArea && name && email && summary;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast("Please complete the required fields");
      return;
    }
    toast("Consultation request sent — we'll confirm within 4 business hours");
    setName("");
    setEmail("");
    setPhone("");
    setSummary("");
    setOpposingParty("");
    setPriorAdvocate("");
    setUrgency("");
    setTime("");
  };

  return (
    <section id="schedule" className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Schedule Your Consultation</span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Book a <span className="text-gold-gradient">Confidential Session</span> in 90 Seconds
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Pick a time that works for you. Tell us a little about your matter so the right advocate is in the room. All details are protected by attorney-client privilege.
            </p>
          </div>
        </ScrollReveal>

        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-primary/5">
          <div className="grid lg:grid-cols-5">
            {/* Left: scheduling */}
            <div className="border-b border-border p-7 lg:col-span-2 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Pick a date</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
                {days.map((d) => {
                  const value = formatDateValue(d);
                  const active = value === date;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDate(value)}
                      className={`rounded-lg border p-2 text-center text-[11px] transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <div className="font-semibold">{formatDateLabel(d).split(",")[0]}</div>
                      <div className="mt-0.5 text-xs font-bold text-foreground">{d.getDate()}</div>
                      <div className="text-[10px] uppercase opacity-70">{d.toLocaleDateString("en-KE", { month: "short" })}</div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 mb-4 flex items-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Pick a time (EAT)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const active = slot === time;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Format</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "video" as const, label: "Video", icon: Video },
                  { value: "in-person" as const, label: "In Person", icon: Building2 },
                  { value: "phone" as const, label: "Phone", icon: Phone },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const active = mode === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setMode(opt.value)}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-[11px] font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <Check className="mb-1 inline h-3 w-3 text-primary" /> First 30 minutes complimentary for new clients. We confirm within 4 business hours.
              </div>
            </div>

            {/* Right: intake */}
            <div className="space-y-5 p-7 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sched-name">Full name *</Label>
                  <Input id="sched-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="sched-email">Email *</Label>
                  <Input id="sched-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sched-phone">Phone</Label>
                  <Input id="sched-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="sched-area">Practice area *</Label>
                  <select
                    id="sched-area"
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select area</option>
                    {practiceAreas.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="Other">Other / not sure</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>How urgent is this matter?</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { v: "exploring", l: "Just exploring" },
                    { v: "weeks", l: "Within weeks" },
                    { v: "days", l: "Within days" },
                    { v: "today", l: "Urgent — today" },
                  ].map((u) => (
                    <button
                      key={u.v}
                      type="button"
                      onClick={() => setUrgency(u.v)}
                      className={`rounded-md border px-3 py-2 text-[11px] font-semibold transition-all ${
                        urgency === u.v
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {u.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sched-opposing">Opposing party (if any)</Label>
                  <Input id="sched-opposing" value={opposingParty} onChange={(e) => setOpposingParty(e.target.value)} placeholder="e.g. KRA, ex-spouse, supplier" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="sched-prior">Prior advocate engaged?</Label>
                  <Input id="sched-prior" value={priorAdvocate} onChange={(e) => setPriorAdvocate(e.target.value)} placeholder="Name (or 'none')" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="sched-summary">Brief summary of your matter *</Label>
                <Textarea
                  id="sched-summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A few sentences on what's happening, key dates, and what outcome you're hoping for."
                  className="mt-1 min-h-[110px]"
                />
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Request {date && time ? `${formatDateLabel(new Date(date))} · ${time}` : "Consultation"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <p className="text-center text-[11px] text-muted-foreground">
                Protected by attorney-client privilege. We never share your details.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConsultationScheduler;
