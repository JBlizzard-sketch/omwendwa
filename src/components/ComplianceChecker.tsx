import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardCheck, Download, Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "@/components/ui/sonner";
import { complianceCheckers } from "@/data/complianceCheckers";

type Answer = "yes" | "no" | "unsure";

const ComplianceChecker = () => {
  const [activeId, setActiveId] = useState(complianceCheckers[0].id);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showReport, setShowReport] = useState(false);

  const checker = complianceCheckers.find((c) => c.id === activeId)!;

  const switchChecker = (id: string) => {
    setActiveId(id);
    setAnswers({});
    setShowReport(false);
  };

  const answered = checker.questions.filter((q) => answers[q.id]).length;
  const complete = answered === checker.questions.length;

  const { score, gaps } = useMemo(() => {
    const total = checker.questions.reduce((s, q) => s + q.weight, 0);
    const earned = checker.questions.reduce(
      (s, q) => s + (answers[q.id] === "yes" ? q.weight : answers[q.id] === "unsure" ? q.weight * 0.4 : 0),
      0,
    );
    return {
      score: total ? Math.round((earned / total) * 100) : 0,
      gaps: checker.questions.filter((q) => answers[q.id] === "no" || answers[q.id] === "unsure"),
    };
  }, [answers, checker]);

  const band =
    score >= 85
      ? { label: "Strong position", tone: "text-primary" }
      : score >= 60
        ? { label: "Some exposure", tone: "text-foreground" }
        : { label: "Significant exposure", tone: "text-destructive" };

  const reportText = () => {
    const lines = [
      "O. MWENDWA & COMPANY ADVOCATES",
      `Compliance Report — ${checker.title}`,
      `Generated: ${new Date().toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}`,
      "",
      `COMPLIANCE SCORE: ${score}% — ${band.label}`,
      "",
      "YOUR ANSWERS",
      "",
      ...checker.questions.map(
        (q, i) => `${i + 1}. ${q.question}\n   Answer: ${(answers[q.id] ?? "not answered").toUpperCase()}\n   Authority: ${q.authority}`,
      ),
      "",
      "TAILORED ACTION CHECKLIST",
      "",
      ...(gaps.length
        ? gaps.map((q, i) => `[ ] ${i + 1}. ${q.action}\n      Basis: ${q.authority}`)
        : ["[x] No gaps identified on the questions answered. Keep evidence of compliance on file."]),
      "",
      "----------------------------------------",
      "",
      "This report is a general self-assessment tool based on the answers you provided. It is not legal advice and does not create an advocate-client relationship. Every matter turns on its own facts.",
      "",
      "Contact:",
      "  Phone:    +254 796 759 632",
      "  Email:    Ochielmwendwa@gmail.com",
      "  Website:  omwendwa.com",
    ];
    return lines.join("\n");
  };

  const download = () => {
    const blob = new Blob([reportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Compliance-Report-${checker.service.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Report downloaded");
  };

  const print = () => {
    const w = window.open("", "_blank", "width=760,height=900");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${checker.title}</title>
      <style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.6;color:#1f1220}
      h1{font-size:18px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #d4576f;padding-bottom:8px}
      pre{font-family:Georgia,serif;white-space:pre-wrap;font-size:13px}</style></head><body>
      <h1>${checker.title}</h1><pre>${reportText().replace(/[<>]/g, "")}</pre>
      <script>window.onload=()=>window.print()<\/script></body></html>`);
    w.document.close();
  };

  return (
    <section id="compliance-checkers" className="bg-card py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <div className="h-px w-8 bg-primary/60" /> Compliance checkers <div className="h-px w-8 bg-primary/60" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Where do you actually <span className="text-gold-gradient">stand?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Answer a handful of questions for the service that matters to you. You'll get a compliance score, a
              tailored action checklist grounded in Kenyan statute, and a report you can download or print.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {complianceCheckers.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => switchChecker(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  c.id === activeId
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : "border border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {c.service}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-lg shadow-primary/5 lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{checker.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{checker.blurb}</p>
              </div>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Progress</div>
                <div className="font-heading text-lg font-bold text-primary">
                  {answered}/{checker.questions.length}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showReport ? (
                <motion.div
                  key={`q-${checker.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-4"
                >
                  {checker.questions.map((q, i) => (
                    <div key={q.id} className="rounded-xl border border-border bg-secondary/25 p-4 sm:p-5">
                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-foreground">{q.question}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{q.why}</p>
                          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-primary/80">
                            {q.authority}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(["yes", "no", "unsure"] as Answer[]).map((a) => {
                              const active = answers[q.id] === a;
                              return (
                                <button
                                  key={a}
                                  type="button"
                                  onClick={() => setAnswers((s) => ({ ...s, [q.id]: a }))}
                                  className={`rounded-lg border px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                                    active
                                      ? a === "yes"
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-primary bg-primary/10 text-primary"
                                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                  }`}
                                >
                                  {a === "unsure" ? "Not sure" : a}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-[11px] text-muted-foreground">
                      Nothing you enter leaves your browser. This is a self-assessment tool, not legal advice.
                    </p>
                    <Button
                      className="bg-primary text-primary-foreground"
                      disabled={!complete}
                      onClick={() => setShowReport(true)}
                    >
                      {complete ? "See my results" : `Answer ${checker.questions.length - answered} more`}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`r-${checker.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6"
                >
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/25 bg-primary/5 p-6 sm:flex-row sm:items-center">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                        <circle cx="50" cy="50" r="42" className="fill-none stroke-border" strokeWidth="9" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="fill-none stroke-primary"
                          strokeWidth="9"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 42}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="absolute font-heading text-xl font-bold text-foreground">{score}%</span>
                    </div>
                    <div>
                      <div className={`font-heading text-xl font-bold ${band.tone}`}>{band.label}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {gaps.length === 0
                          ? "No gaps flagged on these questions. Keep your evidence filed and revisit after any change in the law."
                          : `${gaps.length} item${gaps.length === 1 ? "" : "s"} need attention. Your tailored checklist is below.`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <ClipboardCheck className="h-4 w-4" /> Your tailored checklist
                    </div>
                    <ul className="space-y-2">
                      {gaps.length === 0 ? (
                        <li className="flex gap-3 rounded-xl border border-border bg-secondary/25 p-4 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          Keep certificates, filings and signed records on file — that evidence is what protects you in
                          an audit or a claim.
                        </li>
                      ) : (
                        gaps.map((q) => (
                          <li key={q.id} className="flex gap-3 rounded-xl border border-border bg-secondary/25 p-4">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{q.action}</p>
                              <p className="mt-1 text-[11px] uppercase tracking-wider text-primary/80">{q.authority}</p>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                    <Button variant="outline" onClick={download}>
                      <Download className="mr-2 h-4 w-4" /> Download report
                    </Button>
                    <Button variant="outline" onClick={print}>
                      <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Link to="/consultation">
                      <Button className="bg-primary text-primary-foreground">
                        Review this with an advocate <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={() => switchChecker(checker.id)}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Start over
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceChecker;
