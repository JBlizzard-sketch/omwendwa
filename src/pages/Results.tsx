import { Star } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { testimonials, firmStats } from "@/data/testimonials";
import { motion } from "framer-motion";
import ClientStoriesCarousel from "@/components/ClientStoriesCarousel";
import CaseStudiesFilter from "@/components/CaseStudiesFilter";
import OutcomeMetrics from "@/components/OutcomeMetrics";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";




const Results = () => (
  <>
    <SEOHead
      title="Results & Testimonials — Client Success Stories"
      description="See how O. Mwendwa & Company Advocates delivers results. Read client testimonials and case studies from our tax, land, and corporate law practice."
    />

    <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Track Record</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Results & <span className="text-gold-gradient">Testimonials</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Three years of practice. {firmStats.casesHandled}+ matters resolved. Our reputation is built on outcomes, not promises.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Outcome Metrics dashboard */}
    <OutcomeMetrics />


    {/* Client Stories Carousel */}
    <ClientStoriesCarousel />

    {/* Case Studies — filterable by practice area */}
    <CaseStudiesFilter />

    {/* Testimonials */}
    <section className="bg-card py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="mb-12 font-heading text-3xl font-bold text-foreground">Client Testimonials</h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} className="flex h-full flex-col justify-between rounded-lg border border-border bg-secondary/30 p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                <div>
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed text-foreground">"{t.content}"</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <TalkToPartnerCTA heading="Your case could be our next success story" subheading="Tell us what you're up against. We'll tell you, plainly, whether and how we can help." />
  </>
);

export default Results;

