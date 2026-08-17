import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { practiceAreas } from "@/data/practiceAreas";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CaseDocumentChecklist from "@/components/CaseDocumentChecklist";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";


import { practiceImages as imageMap } from "@/data/practiceImages";

const PracticeAreas = () => (
  <>
    <SEOHead
      title="Practice Areas — Litigation, Tax, Commercial, Employment, Conveyancing & More"
      description="Litigation, tax, commercial, employment, conveyancing, family, succession, governance, land, ADR, human rights, policy and legislative drafting, legal tech — built for Kenya."
    />

    <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">What We Do</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Practice <span className="text-gold-gradient">Areas</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Comprehensive legal services across our core practice areas, each supported by deep expertise in Kenyan statute and case law.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-card py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {practiceAreas.map((area, i) => {
            const Icon = area.icon;
            const imgSrc = imageMap[area.image];
            return (
              <ScrollReveal key={area.id}>
                <div id={area.id} className="scroll-mt-24">
                  {/* Hero image for the practice area */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative mb-8 h-48 lg:h-64 rounded-lg overflow-hidden border border-border"
                  >
                    <img
                      src={imgSrc}
                      alt={area.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={1280}
                      height={720}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">{area.title}</h2>
                      </div>
                      {/* Stat card */}
                      <div className="hidden sm:block rounded-lg bg-card/90 backdrop-blur-sm border border-border px-4 py-3 text-center">
                        <div className="font-heading text-2xl font-bold text-primary">{area.stat.value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{area.stat.label}</div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="rounded-lg border border-border bg-secondary/30 p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        {/* Mobile stat */}
                        <div className="sm:hidden mb-4 inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
                          <span className="font-heading text-xl font-bold text-primary">{area.stat.value}</span>
                          <span className="text-xs text-muted-foreground">{area.stat.label}</span>
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                        
                        <h4 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Key Services</h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {area.services.map((service) => (
                            <li key={service} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-primary" />
                              {service}
                            </li>
                          ))}
                        </ul>

                        {/* Mini-FAQ */}
                        {area.faqs.length > 0 && (
                          <div className="mt-8">
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Common Questions</h4>
                            <Accordion type="single" collapsible className="space-y-2">
                              {area.faqs.map((faq, j) => (
                                <AccordionItem key={j} value={`faq-${area.id}-${j}`} className="rounded-md border border-border bg-background px-4">
                                  <AccordionTrigger className="text-left text-xs font-semibold text-foreground hover:no-underline py-3">
                                    {faq.q}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-xs leading-relaxed text-muted-foreground pb-3">
                                    {faq.a}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        )}

                        <CaseDocumentChecklist area={area} />
                      </div>

                      <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Relevant Statutes</h4>
                        <ul className="space-y-2">
                          {area.statutes.map((statute) => (
                            <li key={statute} className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                              {statute}
                            </li>
                          ))}
                        </ul>
                        <Link to={`/practice-areas/${area.id}`} className="mt-6 block">
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Explore {area.shortTitle}
                          </Button>
                        </Link>
                        <Link to="/contact" className="mt-3 block">
                          <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                            Consult on {area.shortTitle}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
    <TalkToPartnerCTA />
  </>
);


export default PracticeAreas;
