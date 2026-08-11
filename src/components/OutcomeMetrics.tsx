import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { Banknote, Gavel, FileCheck2, CalendarRange } from "lucide-react";

const metrics = [
  { icon: Banknote, value: 380, suffix: "M+", label: "KES recovered or saved", sub: "Tax, commercial & land matters" },
  { icon: FileCheck2, value: 150, suffix: "+", label: "Matters resolved", sub: "Across six practice areas" },
  { icon: Gavel, value: 42, suffix: "", label: "KRA disputes won", sub: "Tribunal & objection stage" },
  { icon: CalendarRange, value: 8, suffix: "", label: "Practice areas", sub: "Founded March 2026 in Nairobi" },
];

const OutcomeMetrics = () => (
  <section className="bg-background py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <div className="h-px w-8 bg-primary/60" />
            Outcomes that matter
            <div className="h-px w-8 bg-primary/60" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Numbers we're proud of — and held to
          </h2>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <ScrollReveal key={m.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-125" />
                <Icon className="relative mb-4 h-6 w-6 text-primary" />
                <div className="relative font-heading text-4xl font-bold text-primary">
                  <AnimatedCounter end={m.value} suffix={m.suffix} />
                </div>
                <div className="relative mt-2 text-sm font-semibold text-foreground">{m.label}</div>
                <div className="relative mt-1 text-xs text-muted-foreground">{m.sub}</div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Figures are aggregate, anonymised, and reflect engagements since the firm opened in March 2026.
      </p>
    </div>
  </section>
);

export default OutcomeMetrics;
