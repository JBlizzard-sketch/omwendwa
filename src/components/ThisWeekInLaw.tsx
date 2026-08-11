import { Link } from "react-router-dom";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const updates = [
  {
    date: "April 14, 2026",
    title: "High Court Upholds Tenant Protections in Landmark Ruling",
    summary: "The High Court ruled that landlords must provide 3 months' notice before terminating residential leases, strengthening tenant protections in Nairobi.",
    category: "Property Law",
  },
  {
    date: "April 11, 2026",
    title: "KRA Launches Automated Tax Compliance Checks for SMEs",
    summary: "The Kenya Revenue Authority has rolled out automated compliance reviews for businesses with turnover below KES 50M. Non-compliant firms face penalties from July.",
    category: "Tax Law",
  },
  {
    date: "April 9, 2026",
    title: "Employment Court Awards Record Damages for Unfair Dismissal",
    summary: "An employee was awarded 18 months' salary after proving their employer failed to follow due process before termination. The ruling reinforces Section 45 of the Employment Act.",
    category: "Employment Law",
  },
  {
    date: "April 7, 2026",
    title: "Environment Tribunal Halts Construction in Nairobi Wetland",
    summary: "The National Environment Tribunal issued a stop order against a major development project in a protected wetland area, citing violations of EMCA 1999.",
    category: "Environmental Law",
  },
];

const ThisWeekInLaw = () => (
  <section className="bg-card py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Legal Developments</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              This Week in <span className="text-gold-gradient">Kenyan Law</span>
            </h2>
          </div>
          <Link to="/insights" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            All insights <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 md:grid-cols-2">
        {updates.map((update, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-lg border border-border bg-secondary/30 p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5 h-full"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  {update.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {update.date}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold leading-snug text-foreground">
                {update.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {update.summary}
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Discuss with an advocate <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link to="/insights" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View all insights <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default ThisWeekInLaw;
