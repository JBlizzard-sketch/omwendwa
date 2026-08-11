import { Scale, ShieldCheck, Clock, Handshake, BookOpenCheck } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Scale, label: "LSK Admitted", sub: "Advocates of the High Court" },
  { icon: Clock, label: "Founded March 2026", sub: "Nairobi, Kenya" },
  { icon: ShieldCheck, label: "Strict Confidentiality", sub: "Attorney–client privilege" },
  { icon: Handshake, label: "Retainer Friendly", sub: "Flexible engagement models" },
  { icon: BookOpenCheck, label: "Pro Bono Active", sub: "30+ hours monthly" },
];

const TrustStrip = () => (
  <section className="border-y border-border bg-card/50">
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-foreground">{it.label}</div>
                <div className="truncate text-[11px] text-muted-foreground">{it.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustStrip;
