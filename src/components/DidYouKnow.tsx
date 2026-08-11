import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, AlertTriangle, Scale, Shield, FileText, Landmark, Home, Briefcase, Wifi, Gavel, Users, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const tips = [
  {
    icon: AlertTriangle,
    label: "Did You Know?",
    front: "A handshake deal is legally binding in Kenya",
    back: "Oral contracts are enforceable under Kenyan law — but nearly impossible to prove in court. A written agreement protects both parties.",
    cta: "Get your contracts reviewed",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  },
  {
    icon: Lightbulb,
    label: "Legal Tip",
    front: "Your spouse must consent to sell your matrimonial home",
    back: "Under the Matrimonial Property Act 2013, no spouse can dispose of the matrimonial home without the other's written consent — even if the title is in one name only.",
    cta: "Protect your property rights",
    color: "from-kenya-green/20 to-kenya-green/5",
    borderColor: "border-kenya-green/30",
  },
  {
    icon: Scale,
    label: "Know Your Rights",
    front: "KRA must respond to your tax objection within 60 days",
    back: "If KRA fails to respond to a valid objection within 60 days, the objection is deemed to have been allowed. Many taxpayers don't know this.",
    cta: "Challenge your assessment",
    color: "from-gold-light/20 to-gold-light/5",
    borderColor: "border-gold/30",
  },
  {
    icon: Shield,
    label: "Protect Yourself",
    front: "You have 24 hours after arrest before you must see a judge",
    back: "Article 49 of the Kenyan Constitution guarantees that every arrested person must be brought before a court within 24 hours. Exercise your rights.",
    cta: "Know your constitutional rights",
    color: "from-kenya-red/20 to-kenya-red/5",
    borderColor: "border-kenya-red/30",
  },
  {
    icon: FileText,
    label: "Estate Planning",
    front: "Dying without a will in Kenya triggers intestacy rules",
    back: "Without a will, the Law of Succession Act dictates how your property is distributed — often not as you would have wished. A will costs far less than a succession dispute.",
    cta: "Draft your will today",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  },
  {
    icon: Landmark,
    label: "Business Alert",
    front: "Every Kenyan company must appoint a secretary within 6 months",
    back: "The Companies Act 2015 requires every registered company to have a company secretary. Non-compliance can lead to penalties and strike-off.",
    cta: "Ensure your company complies",
    color: "from-gold-light/20 to-gold-light/5",
    borderColor: "border-gold/30",
  },
  {
    icon: Home,
    label: "Landlord Alert",
    front: "A tenant can challenge a rent increase if it's unreasonable",
    back: "Under Kenya's Rent Restriction Act, tenants in controlled tenancies can challenge excessive rent increases through the Rent Tribunal. Know your limits.",
    cta: "Review your tenancy rights",
    color: "from-kenya-green/20 to-kenya-green/5",
    borderColor: "border-kenya-green/30",
  },
  {
    icon: Briefcase,
    label: "Employee Rights",
    front: "Your employer cannot terminate you without a fair hearing",
    back: "The Employment Act 2007 requires employers to follow a fair procedure before termination. Summary dismissal without cause can lead to compensation of up to 12 months' salary.",
    cta: "Know your employment rights",
    color: "from-kenya-red/20 to-kenya-red/5",
    borderColor: "border-kenya-red/30",
  },
  {
    icon: Wifi,
    label: "Digital Business",
    front: "All online businesses in Kenya must comply with the Data Protection Act",
    back: "The Data Protection Act 2019 applies to every business that collects personal data. Non-compliance can attract fines of up to KES 5 million or 1% of annual turnover.",
    cta: "Check your data compliance",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  },
  {
    icon: Gavel,
    label: "Criminal Law",
    front: "Bail is a constitutional right, not a privilege",
    back: "Article 49(1)(h) of the Constitution grants every arrested person the right to be released on bail or bond on reasonable conditions, unless there are compelling reasons not to.",
    cta: "Understand bail rights",
    color: "from-gold-light/20 to-gold-light/5",
    borderColor: "border-gold/30",
  },
  {
    icon: Users,
    label: "Family Law",
    front: "Children born outside marriage have equal inheritance rights",
    back: "Under Kenyan law, all children — whether born in or out of wedlock — have equal rights to inherit from their parents. The Law of Succession Act makes no distinction.",
    cta: "Secure your children's future",
    color: "from-kenya-green/20 to-kenya-green/5",
    borderColor: "border-kenya-green/30",
  },
  {
    icon: HeartHandshake,
    label: "ADR Tip",
    front: "Mediation can resolve your dispute in days, not years",
    back: "Court-annexed mediation in Kenya has a 60%+ settlement rate. It's confidential, costs 10-20% of litigation, and preserves business relationships.",
    cta: "Explore mediation options",
    color: "from-kenya-red/20 to-kenya-red/5",
    borderColor: "border-kenya-red/30",
  },
];

const FlipCard = ({ tip, index }: { tip: typeof tips[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = tip.icon;

  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className="group relative h-[260px] cursor-pointer [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d] transition-all duration-500"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Front */}
          <div className={`absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-lg border ${tip.borderColor} bg-gradient-to-br ${tip.color} p-5 flex flex-col justify-between`}>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {tip.label}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold leading-snug text-foreground">
                {tip.front}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Tap to learn more</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          {/* Back */}
          <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg border ${tip.borderColor} bg-gradient-to-br ${tip.color} p-5 flex flex-col justify-between`}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tip.back}
            </p>
            <Link
              to="/contact"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-gold-light"
            >
              {tip.cta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
};

const DidYouKnow = () => (
  <section className="bg-background py-20 lg:py-28 overflow-hidden">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Legal <span className="text-gold-gradient">Intelligence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Practical legal knowledge every Kenyan should have. Tap any card to learn more — don't wait for a crisis.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tips.map((tip, i) => (
          <FlipCard key={i} tip={tip} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default DidYouKnow;
