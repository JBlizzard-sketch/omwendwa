import { ShieldCheck, Sparkles, Lock, Target, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  { icon: ShieldCheck, name: "Integrity", desc: "We act with honesty even when no one is watching." },
  { icon: Sparkles, name: "Excellence", desc: "We hold ourselves to the highest professional standard, always." },
  { icon: Lock, name: "Confidentiality", desc: "Your matter stays inside our walls. No exceptions." },
  { icon: Target, name: "Client Focus", desc: "Every decision is filtered through what serves you best." },
  { icon: TrendingUp, name: "Results Driven", desc: "We measure success by outcomes, not by hours billed." },
];

const ValuesGrid = () => (
  <section className="bg-background py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Values</span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            What we <span className="text-gold-gradient">stand for</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {values.map(({ icon: Icon, name, desc }, i) => (
          <ScrollReveal key={name} delay={i * 0.08}>
            <div className="h-full rounded-lg border border-border bg-card p-5 text-center transition-colors hover:border-primary/40">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground md:text-base">{name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesGrid;
