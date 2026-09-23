import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/structuredData";

export interface Faq {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
  intro?: string;
  /** Emit FAQPage structured data. Set false when the parent page already emits it. */
  withSchema?: boolean;
  /** Reviewed/last-updated date shown under the heading (YYYY-MM-DD). */
  lastUpdated?: string;
  className?: string;
  idPrefix?: string;
}

/**
 * Reusable FAQ block for practice areas and articles.
 * Emits valid FAQPage structured data and a visible last-updated date so both
 * search engines and AI answer engines can quote the answers with confidence.
 */
const FaqSection = ({
  faqs,
  title = "Frequently asked questions",
  intro,
  withSchema = true,
  lastUpdated,
  className = "",
  idPrefix = "faq",
}: FaqSectionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faqs" className={`scroll-mt-28 ${className}`} aria-labelledby={`${idPrefix}-heading`}>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id={`${idPrefix}-heading`} className="font-heading text-xl font-bold text-foreground md:text-2xl">
          {title}
        </h2>
      </div>
      {intro && <p className="mt-2 text-sm text-muted-foreground">{intro}</p>}
      {lastUpdated && (
        <p className="mt-1 text-xs text-muted-foreground">Last updated {lastUpdated}</p>
      )}
      <Accordion type="single" collapsible className="mt-5 space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={`${idPrefix}-${i}`}
            value={`${idPrefix}-${i}`}
            className="rounded-md border border-border bg-background px-4"
          >
            <AccordionTrigger className="py-3 text-left text-sm font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-3 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqSection;
