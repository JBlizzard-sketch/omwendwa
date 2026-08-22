import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Video,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { practiceAreas } from "@/data/practiceAreas";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const formatDateValue = (d: Date) => d.toISOString().slice(0, 10);

const buildNextDays = (count = 10) => {
  const days: Date[] = [];
  const today = new Date();
  let cursor = 1;
  while (days.length < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + cursor);
    cursor++;
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    days.push(d);
  }
  return days;
};

// Deterministic "availability" so slots feel real without a backend
const slotTaken = (dateValue: string, slot: string) => {
  const seed = [...(dateValue + slot)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return seed % 7 === 0;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  summary: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps us assign the right advocate")
    .max(1200, "Please keep the summary under 1200 characters"),
});

const STEPS = ["Practice area", "Your matter", "Pick a time", "Your details"] as const;

const ConsultationIntake = () => {
  const days = useMemo(() => buildNextDays(10), []);
  const [step, setStep] = useState(0);
  const [areaId, setAreaId] = useState("");
  const [urgency, setUrgency] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState(formatDateValue(days[0]));
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"video" | "in-person" | "phone">("video");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);

  const area = practiceAreas.find((a) => a.id === areaId);

  const canAdvance = () => {
    if (step === 0) return Boolean(areaId);
    if (step === 1) return summary.trim().length >= 20 && Boolean(urgency);
    if (step === 2) return Boolean(date && time);
    return true;
  };

  const submit = () => {
    const parsed = schema.safeParse({ name, email, phone, summary });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      toast("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    const ref = `OM-${date.replace(/-/g, "").slice(4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setReference(ref);
    toast("Consultation request received — confirmation on its way");
  };

  const reset = () => {
    setReference(null);
    setStep(0);
    setAreaId("");
    setUrgency("");
    setSummary("");
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
  };

  const prettyDate = new Date(date).toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (reference) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-2xl border border-primary/30 bg-card p-8 text-center shadow-xl shadow-primary/5 lg:p-10"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">Your consultation is reserved</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          A confirmation has been sent to <span className="font-semibold text-foreground">{email}</span>. We confirm
          every booking personally within 4 business hours.
        </p>
        <div className="mt-6 grid gap-3 rounded-xl border border-border bg-secondary/30 p-5 text-left text-sm sm:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Reference</div>
            <div className="font-semibold text-foreground">{reference}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Practice area</div>
            <div className="font-semibold text-foreground">{area?.title}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">When</div>
            <div className="font-semibold text-foreground">
              {prettyDate} · {time} EAT
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Format</div>
            <div className="font-semibold capitalize text-foreground">{mode.replace("-", " ")}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="mailto:Ochielmwendwa@gmail.com">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" /> Email us a document
            </Button>
          </a>
          <Button variant="ghost" onClick={reset}>
            Book another session
          </Button>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
          Everything you share is protected by advocate–client privilege and handled in line with the Data Protection
          Act 2019.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
      {/* Progress */}
      <div className="border-b border-border bg-secondary/30 px-6 py-5">
        <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </span>
          <span>{Math.round((step / STEPS.length) * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">What does your matter involve?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Pick the closest fit — we'll route it correctly.</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {practiceAreas.map((a) => {
                    const Icon = a.icon;
                    const active = a.id === areaId;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAreaId(a.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
                        <span className="font-medium">{a.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Tell us what happened</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A short summary is enough. Do not include anything you would not want in an email.
                  </p>
                </div>
                <div>
                  <Label htmlFor="intake-summary">Case summary *</Label>
                  <Textarea
                    id="intake-summary"
                    value={summary}
                    maxLength={1200}
                    rows={6}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="e.g. KRA issued an assessment of KES 4.2m in June. We objected but have not had a response…"
                    className="mt-1.5"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>{errors.summary ?? "Minimum 20 characters"}</span>
                    <span>{summary.length}/1200</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">How urgent is it? *</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      "Emergency — court date or deadline this week",
                      "Urgent — within the month",
                      "Planning ahead",
                      "Just seeking advice",
                    ].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUrgency(u)}
                        className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                          urgency === u
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">Choose a time that suits you</h3>
                <p className="mt-1 text-sm text-muted-foreground">All times East Africa Time. Weekdays only.</p>

                <div className="mt-5 flex items-center gap-2 text-primary">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Date</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {days.map((d) => {
                    const value = formatDateValue(d);
                    const active = value === date;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setDate(value);
                          setTime("");
                        }}
                        className={`rounded-lg border p-2 text-center transition-all ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                          {d.toLocaleDateString("en-KE", { weekday: "short" })}
                        </div>
                        <div className="text-sm font-bold text-foreground">{d.getDate()}</div>
                        <div className="text-[10px] uppercase text-muted-foreground">
                          {d.toLocaleDateString("en-KE", { month: "short" })}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-2 text-primary">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Available slots</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const taken = slotTaken(date, slot);
                    const active = slot === time;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setTime(slot)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                          taken
                            ? "cursor-not-allowed border-dashed border-border text-muted-foreground/50 line-through"
                            : active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">Format</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { value: "video" as const, label: "Video", icon: Video },
                    { value: "in-person" as const, label: "In person", icon: Building2 },
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
                            : "border-border bg-background text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Where should we send confirmation?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    First 30 minutes are complimentary for new clients.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="intake-name">Full name *</Label>
                    <Input
                      id="intake-name"
                      value={name}
                      maxLength={100}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5"
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="intake-email">Email *</Label>
                    <Input
                      id="intake-email"
                      type="email"
                      value={email}
                      maxLength={255}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5"
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="intake-phone">Phone (optional)</Label>
                  <Input
                    id="intake-phone"
                    value={phone}
                    maxLength={30}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
                  <div className="mb-2 font-semibold uppercase tracking-wider text-primary">Booking summary</div>
                  <ul className="space-y-1">
                    <li className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> {area?.title}
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> {prettyDate} at {time} EAT
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> <span className="capitalize">{mode.replace("-", " ")}</span> consultation
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> {urgency}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              className="bg-primary text-primary-foreground"
              disabled={!canAdvance()}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-primary text-primary-foreground" onClick={submit}>
              Confirm booking <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationIntake;
