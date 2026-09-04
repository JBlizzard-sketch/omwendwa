import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import CaseDocumentChecklist from "@/components/CaseDocumentChecklist";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { practiceAreas } from "@/data/practiceAreas";
import { practiceImages } from "@/data/practiceImages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structuredData";
import { trackCta } from "@/lib/analytics";

const PracticeAreaDetail = () => {
  const { areaId } = useParams();
  const area = practiceAreas.find((a) => a.id === areaId);

  if (!area) return <Navigate to="/practice-areas" replace />;

  const Icon = area.icon;
  const img = practiceImages[area.image];
  const others = practiceAreas.filter((a) => a.id !== area.id).slice(0, 4);
  const path = `/practice-areas/${area.id}`;

  const schemas: Record<string, unknown>[] = [
    serviceSchema({
      name: area.title,
      description: area.description,
      path,
      serviceTypes: area.services,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Practice Areas", path: "/practice-areas" },
      { name: area.shortTitle, path },
    ]),
  ];
  if (area.faqs.length > 0) schemas.push(faqSchema(area.faqs));

  return (
    <>
      <SEOHead
        title={`${area.title} in Kenya`}
        description={area.description.slice(0, 155)}
        canonical={`https://omwendwa.com${path}`}
      />
      <JsonLd data={schemas} />


      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pt-28 pb-14 lg:pt-36 lg:pb-20">
        <img src={img} alt={area.title} className="absolute inset-0 h-full w-full object-cover opacity-20" loading="eager" width={1920} height={900} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        <div className="container relative mx-auto px-4">
          <ScrollReveal>
            <Link to="/practice-areas" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-3 w-3" /> All practice areas
            </Link>
            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{area.shortTitle}</span>
                <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-5xl">{area.title}</h1>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">{area.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" onClick={() => trackCta("cta_consult_click", "practice_area_hero", { practice_area: area.shortTitle })}>
                <Button size="lg" className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                  Consult on {area.shortTitle} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+254796759632" onClick={() => trackCta("cta_call_click", "practice_area_hero", { practice_area: area.shortTitle })}>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  <Phone className="mr-2 h-4 w-4" /> +254 796 759 632
                </Button>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/70 px-4 py-2">
                <span className="font-heading text-xl font-bold text-primary">{area.stat.value}</span>
                <span className="text-xs text-muted-foreground">{area.stat.label}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-card py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="font-heading text-2xl font-bold text-foreground">How We Help</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {area.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 rounded-md border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {area.faqs.length > 0 && (
                <ScrollReveal>
                  <h2 className="mt-12 font-heading text-2xl font-bold text-foreground">Common Questions</h2>
                  <Accordion type="single" collapsible className="mt-5 space-y-2">
                    {area.faqs.map((faq, j) => (
                      <AccordionItem key={j} value={`faq-${j}`} className="rounded-md border border-border bg-background px-4">
                        <AccordionTrigger className="py-3 text-left text-sm font-semibold text-foreground hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <CaseDocumentChecklist area={area} />
              </ScrollReveal>
            </div>

            <aside className="lg:col-span-1">
              <ScrollReveal>
                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Relevant Statutes</h3>
                  <ul className="space-y-2">
                    {area.statutes.map((s) => (
                      <li key={s} className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-6 block" onClick={() => trackCta("cta_consult_click", "practice_area_sidebar", { practice_area: area.shortTitle })}>
                    <Button className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                      Book a consultation
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Related Practices</h3>
                  <nav className="flex flex-col gap-2">
                    {others.map((o) => (
                      <Link key={o.id} to={`/practice-areas/${o.id}`} className="text-sm text-muted-foreground hover:text-primary">
                        {o.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      <TalkToPartnerCTA />
    </>
  );
};

export default PracticeAreaDetail;
