import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const events = [
  { year: "2023", title: "The firm is founded", desc: "Rachael Mwendwa and her partner co-found the firm in Nairobi with a thesis: Kenyan law should reflect today's economy, not yesterday's textbooks." },
  { year: "2024", title: "First major KRA win", desc: "Tax Appeals Tribunal reduces a KES 45M assessment for a manufacturing client by 78%, setting our tax practice on the map." },
  { year: "2024", title: "Pro bono programme launched", desc: "Formal partnership with the LSK Pro Bono Programme and civil society groups on community land rights." },
  { year: "2025", title: "Digital practice expansion", desc: "Launch of advisory streams for fintech, digital marketplaces and Data Protection Act compliance." },
  { year: "2026", title: "Today", desc: "150+ matters resolved across six practice areas, with a 94% favourable outcome rate and a 92% client retention rate." },
];

const FirmTimeline = () => (
  <section className="bg-card py-20 lg:py-24">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <div className="h-px w-8 bg-primary/60" /> Our journey <div className="h-px w-8 bg-primary/60" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Three Years, <span className="text-gold-gradient">One Direction</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Young enough to question old assumptions. Disciplined enough to win on them.
          </p>
        </div>
      </ScrollReveal>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-border lg:left-1/2" />
        <ul className="space-y-10">
          {events.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative pl-12 lg:grid lg:grid-cols-2 lg:gap-10 lg:pl-0 ${
                i % 2 === 0 ? "" : "lg:[&>div]:col-start-2"
              }`}
            >
              <span className="absolute left-2 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background lg:left-1/2 lg:-translate-x-1/2" />
              <div className={`${i % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                <div className="font-heading text-2xl font-bold text-primary">{e.year}</div>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default FirmTimeline;
