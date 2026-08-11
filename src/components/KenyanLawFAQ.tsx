import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
  category: string;
  cta: { label: string; href: string };
}

const FAQS: FAQItem[] = [
  {
    category: "Tax",
    q: "Can I object to a KRA tax assessment?",
    a: "Yes. You must file a Notice of Objection within 30 days of the assessment under section 51 of the Tax Procedures Act. If KRA fails to respond within 60 days, your objection is deemed allowed. Beyond that, you can escalate to the Tax Appeals Tribunal within 30 days of an objection decision.",
    cta: { label: "Talk to a tax advocate", href: "/practice-areas#tax" },
  },
  {
    category: "Tax",
    q: "What is eTIMS and is my business required to use it?",
    a: "eTIMS (Electronic Tax Invoice Management System) is mandatory for all VAT-registered businesses. By December 2026, every VAT invoice must be generated through eTIMS. Without an eTIMS invoice, your buyer cannot claim input VAT — which means non-compliance silently kills your sales pipeline.",
    cta: { label: "Get an eTIMS readiness check", href: "/contact" },
  },
  {
    category: "Family",
    q: "Who gets custody of the children in a Kenyan divorce?",
    a: "Courts apply the 'best interests of the child' standard under the Children Act 2022. Joint custody is increasingly favoured. Factors considered include the child's age and wishes, each parent's capacity to provide, the child's emotional and educational needs, any history of domestic violence, and the importance of sibling relationships.",
    cta: { label: "Speak to a family advocate", href: "/practice-areas#family" },
  },
  {
    category: "Family",
    q: "Can I claim a share of property if the title is in my spouse's name?",
    a: "Yes. The Matrimonial Property Act 2013 entitles each spouse to a share proportional to their contribution. The Supreme Court in FIDA-K v AG confirmed that domestic contributions — childcare, homemaking, supporting a partner's career — must be given real weight, not lip service.",
    cta: { label: "Discuss your matrimonial property", href: "/contact" },
  },
  {
    category: "Land",
    q: "How do I verify if a title deed is genuine before buying land?",
    a: "Conduct an official search at the relevant land registry within the 30 days before signing. Engage an advocate to verify the title chain, check for encumbrances, confirm the seller's identity against ID and KRA PIN, and obtain land rates and rent clearance certificates. Never rely on a photocopy or a 'shortcut' search.",
    cta: { label: "Order due diligence", href: "/practice-areas#environment-land" },
  },
  {
    category: "Land",
    q: "What is adverse possession and am I at risk?",
    a: "If someone occupies your land openly, continuously, peacefully, and without your permission for 12 years, they can claim ownership under the Limitation of Actions Act. Absentee owners — especially those with land in Kiambu, Kajiado, and the Coast — are most exposed. Annual inspections and clear caretaker arrangements are essential.",
    cta: { label: "Protect your land", href: "/contact" },
  },
  {
    category: "Succession",
    q: "What happens if a loved one dies without a will in Kenya?",
    a: "The estate passes under intestacy rules in the Law of Succession Act (Cap 160). The surviving spouse takes personal effects absolutely and a life interest in the residue; children share the residue equally on the spouse's death or remarriage. Polygamous families and dependants outside the immediate household often end up in court — exactly what no one wanted.",
    cta: { label: "Start a succession matter", href: "/practice-areas#succession" },
  },
  {
    category: "Succession",
    q: "Can a will be challenged in Kenya?",
    a: "Yes. Section 26 of the Law of Succession Act allows a dependant who has been excluded or inadequately provided for to apply for reasonable provision. Strict time limits apply — typically six months from the grant of probate. The earlier you act, the more you preserve.",
    cta: { label: "Review a contested will", href: "/contact" },
  },
  {
    category: "Commercial",
    q: "Do I really need a shareholders' agreement for my startup?",
    a: "Absolutely. The Articles of Association are public, generic, and silent on the things that actually matter — vesting, drag-along, tag-along, deadlock, founder departure. A shareholders' agreement is the single cheapest piece of insurance you can buy. Drafting one costs a fraction of litigating without one.",
    cta: { label: "Draft a shareholders' agreement", href: "/practice-areas#commercial" },
  },
  {
    category: "Commercial",
    q: "What is the Data Protection Act and does it affect my small business?",
    a: "The Data Protection Act 2019 applies to every business that collects personal data — even just email addresses. Penalties reach KES 5 million or 1% of annual turnover, whichever is higher. Most SMEs need a registered Data Controller, a privacy notice, and a breach response plan. None of this is optional.",
    cta: { label: "Run a DPA compliance audit", href: "/contact" },
  },
  {
    category: "Governance",
    q: "What are the penalties for not filing annual returns?",
    a: "Under the Companies Act 2015, late or missing annual returns attract penalties and ultimately strike-off from the register. Once struck off, the company's bank accounts can be frozen and directors may face personal liability for company debts. Reinstatement is possible but costly and slow.",
    cta: { label: "Restore compliance", href: "/practice-areas#governance" },
  },
  {
    category: "Rights",
    q: "What are my rights if I'm arrested in Kenya?",
    a: "Under Article 49 of the Constitution: the right to remain silent, to be informed promptly of the reason for arrest, to communicate with an advocate, to be brought before a court within 24 hours, to be released on bond unless there are compelling reasons otherwise, and not to be compelled to make a self-incriminating confession. Exercise these rights — politely but firmly.",
    cta: { label: "Get urgent legal help", href: "/contact" },
  },
];

const CATEGORIES = ["All", "Tax", "Family", "Land", "Succession", "Commercial", "Governance", "Rights"];

const KenyanLawFAQ = () => {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCat = active === "All" || f.category === active;
      const q = search.toLowerCase();
      const matchSearch =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [active, search]);

  return (
    <section className="bg-card py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-8 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <div className="h-px w-10 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kenyan Law FAQ</span>
                <div className="h-px w-10 bg-primary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Plain Answers to <span className="text-gold-gradient">Real Questions</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Quick, accurate answers grounded in current Kenyan law — each with a clear next step when you're ready.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search e.g. 'KRA', 'custody', 'title deed'…"
                className="pl-10"
              />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                    active === cat
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Accordion type="single" collapsible className="space-y-2">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={`${faq.category}-${i}`}
                  value={`law-faq-${i}`}
                  className="overflow-hidden rounded-lg border border-border bg-secondary/30 px-4"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {faq.category}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-5 text-sm leading-relaxed text-muted-foreground">
                    <p>{faq.a}</p>
                    <Link
                      to={faq.cta.href}
                      className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                    >
                      {faq.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filtered.length === 0 && (
              <div className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
                No questions match. Try a different keyword or{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  ask us directly
                </Link>
                .
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default KenyanLawFAQ;
