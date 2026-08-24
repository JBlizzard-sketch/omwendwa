import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies, type CaseStudy } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building, CalendarDays, Lightbulb, RotateCcw, Scale, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type FacetKey = "category" | "outcomeType" | "industry";

const facets: { key: FacetKey; label: string; icon: typeof Scale }[] = [
  { key: "category", label: "Practice area", icon: Scale },
  { key: "outcomeType", label: "Outcome", icon: Trophy },
  { key: "industry", label: "Industry", icon: Building },
];

const CaseStudiesFilter = () => {
  const [selected, setSelected] = useState<Record<FacetKey, string>>({
    category: "All",
    outcomeType: "All",
    industry: "All",
  });
  const [open, setOpen] = useState<CaseStudy | null>(null);

  const options = useMemo(() => {
    const build = (key: FacetKey) => ["All", ...Array.from(new Set(caseStudies.map((c) => c[key])))];
    return {
      category: build("category"),
      outcomeType: build("outcomeType"),
      industry: build("industry"),
    } as Record<FacetKey, string[]>;
  }, []);

  const filtered = caseStudies.filter((c) =>
    facets.every(({ key }) => selected[key] === "All" || c[key] === selected[key]),
  );

  const activeCount = facets.filter(({ key }) => selected[key] !== "All").length;
  const reset = () => setSelected({ category: "All", outcomeType: "All", industry: "All" });

  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-10 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Case Studies</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Narrow it down to <span className="text-gold-gradient">matters like yours</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                Filter by practice area, the kind of outcome you need, and your industry.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-semibold">
                {filtered.length} {filtered.length === 1 ? "story" : "stories"}
              </span>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10 space-y-4 rounded-2xl border border-border bg-card p-5 lg:p-6">
            {facets.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <div className="flex min-w-[140px] items-center gap-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary" /> {label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {options[key].map((opt) => {
                    const active = selected[key] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [key]: opt }))}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                            : "border border-border bg-secondary/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <motion.article
                key={cs.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{cs.category}</span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-foreground">{cs.outcomeType}</span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                    {cs.industry}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> {cs.year}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold leading-snug text-foreground">{cs.title}</h3>

                <div className="mt-5 space-y-3">
                  {[
                    { label: "Challenge", text: cs.challenge },
                    { label: "Outcome", text: cs.outcome },
                  ].map((col) => (
                    <div key={col.label}>
                      <h4 className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {col.label}
                      </h4>
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{col.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
                  <Button size="sm" variant="outline" onClick={() => setOpen(cs)}>
                    Read full story
                  </Button>
                  <Link to="/consultation" state={{ area: cs.category }}>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      Request a consultation <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">No case studies match that combination yet.</p>
            <Button variant="ghost" size="sm" className="mt-3 text-primary" onClick={reset}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <div className="mb-2 flex flex-wrap gap-2 text-[11px] font-semibold">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{open.category}</span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-foreground">{open.outcomeType}</span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                    {open.industry} · {open.year}
                  </span>
                </div>
                <DialogTitle className="font-heading text-2xl leading-tight">{open.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-5">
                {[
                  { label: "The Challenge", text: open.challenge },
                  { label: "Our Approach", text: open.approach },
                  { label: "The Outcome", text: open.outcome },
                ].map((col) => (
                  <div key={col.label}>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{col.label}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{col.text}</p>
                  </div>
                ))}
                {open.lesson && (
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Lightbulb className="h-3.5 w-3.5" /> Key lesson
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{open.lesson}</p>
                  </div>
                )}
                <Link to="/consultation" onClick={() => setOpen(null)}>
                  <Button className="w-full bg-primary text-primary-foreground">
                    Discuss a similar matter <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CaseStudiesFilter;
