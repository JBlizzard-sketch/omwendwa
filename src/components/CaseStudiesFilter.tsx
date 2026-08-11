import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies, type CaseStudy } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CaseStudiesFilter = () => {
  const categories = useMemo(() => {
    const set = new Set<string>(caseStudies.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, []);
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<CaseStudy | null>(null);

  const filtered = active === "All" ? caseStudies : caseStudies.filter((c) => c.category === active);

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
                Filter by <span className="text-gold-gradient">Practice Area</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              {filtered.length} {filtered.length === 1 ? "case" : "cases"} shown
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <motion.button
                key={cs.title}
                type="button"
                onClick={() => setOpen(cs)}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="block w-full rounded-lg border border-border bg-card p-8 text-left transition-shadow hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 lg:p-10"
              >
                <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {cs.category}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{cs.title}</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {[
                    { label: "Challenge", text: cs.challenge },
                    { label: "Approach", text: cs.approach },
                    { label: "Outcome", text: cs.outcome },
                  ].map((col) => (
                    <div key={col.label}>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{col.label}</h4>
                      <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{col.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Read full case <ArrowRight className="h-3 w-3" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              No case studies in this category yet.
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <div className="mb-2 inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {open.category}
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
                <Link to="/contact" onClick={() => setOpen(null)}>
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
