import { Clock, MessageSquare, Briefcase, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const promises = [
  { icon: Clock, label: "Timely" },
  { icon: MessageSquare, label: "Responsive" },
  { icon: Briefcase, label: "Commercially Minded" },
  { icon: ShieldCheck, label: "Always Professional" },
];

const OurPromise = () => (
  <section className="border-y border-border bg-background py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="rounded-lg border border-primary/20 bg-card p-8 lg:p-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Promise</span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Four words. <span className="text-gold-gradient">Every matter.</span>
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {promises.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-heading text-sm font-semibold text-foreground md:text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default OurPromise;
