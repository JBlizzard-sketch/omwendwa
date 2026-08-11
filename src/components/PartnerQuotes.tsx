import { Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import rachelImg from "@/assets/rachel-mwendwa.jpg";
import { motion } from "framer-motion";

const quotes: {
  name: string;
  role: string;
  image?: string;
  headline: string;
  quote: string;
}[] = [
  {
    name: "Rachael Mwendwa",
    role: "Managing Partner",
    image: rachelImg,
    headline: "Why I Practice Law",
    quote:
      "I came to law because I watched communities lose ancestral land to a stamped piece of paper they could not read. The law can be a weapon — or a shield. My job is to make sure my clients always hold the shield.",
  },
  {
    name: "Our Partner",
    role: "Commercial, Tax & Governance",
    headline: "Why We Practice Law",
    quote:
      "Most business disasters are not legal failures — they are clarity failures. I practice law because I love the moment a founder finally understands their cap table, or a board sees its risk map for the first time. Clarity is power.",
  },
];

const PartnerQuotes = () => (
  <section className="bg-background py-20 lg:py-24">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">In Their Words</span>
            <div className="h-px w-10 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Why We <span className="text-gold-gradient">Practice Law</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {quotes.map((q, i) => (
          <ScrollReveal key={q.name} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10 transition-colors group-hover:text-primary/20" />
              <div className="flex items-center gap-4">
                {q.image ? (
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
                    <img src={q.image} alt={q.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                    <span className="font-heading text-lg font-bold text-primary">OM</span>
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{q.headline}</div>
                  <div className="mt-1 font-heading text-lg font-bold text-foreground">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </div>
              <blockquote className="mt-6 font-heading text-lg italic leading-relaxed text-foreground/90 lg:text-xl">
                "{q.quote}"
              </blockquote>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerQuotes;
