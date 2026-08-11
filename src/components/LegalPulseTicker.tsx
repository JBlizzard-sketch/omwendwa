import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const updates = [
  "Finance Act 2025 now in effect — new corporate tax rates apply",
  "eTIMS deadline extended to December 2026 for all VAT-registered persons",
  "KRA iTax 3.0 migration mandatory for all businesses",
  "Court-Annexed Mediation now available at all High Court stations",
  "Children Act 2022 introduces new custody best-interest standards",
  "Digital Services Tax expanded to resident digital marketplace operators",
  "Land Registration Act amendments strengthen title verification",
  "Companies Act 2015: Annual return deadline approaching — penalties for non-compliance",
];

const LegalPulseTicker = () => {
  const tickerContent = [...updates, ...updates];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center gap-2 border-r border-border pr-3">
            <Zap className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary whitespace-nowrap">
              Legal Pulse
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              className="flex whitespace-nowrap gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {tickerContent.map((update, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  {update}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPulseTicker;
