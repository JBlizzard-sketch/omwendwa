import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award, Briefcase, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { practiceAreas } from "@/data/practiceAreas";
import { testimonials, firmStats } from "@/data/testimonials";
import { blogPosts } from "@/data/blogPosts";
import nairobiImg from "@/assets/nairobi-skyline.jpg";
import signingImg from "@/assets/legal-signing.jpg";
import courtroomImg from "@/assets/courtroom-kenya.jpg";
import DidYouKnow from "@/components/DidYouKnow";
import HeroCarousel from "@/components/HeroCarousel";
import LegalPulseTicker from "@/components/LegalPulseTicker";
import ThisWeekInLaw from "@/components/ThisWeekInLaw";
import AnimatedCounter from "@/components/AnimatedCounter";
import TrustStrip from "@/components/TrustStrip";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";
import OurPromise from "@/components/OurPromise";
import ManagingPartnerSpotlight from "@/components/ManagingPartnerSpotlight";
import { motion } from "framer-motion";


const Index = () => {
  const featuredPost = blogPosts[0];
  const featuredTestimonial = testimonials[0];

  return (
    <>
      <SEOHead
        title="Nairobi Law Firm — Tax, Commercial, Family & Land Law"
        description="O. Mwendwa & Company Advocates is a modern Nairobi law firm offering expert legal services in tax, commercial, family, succession, governance, and land law."
      />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Our Promise */}
      <OurPromise />

      {/* Trust strip */}
      <TrustStrip />

      {/* Legal Pulse Ticker */}
      <LegalPulseTicker />

      {/* Managing Partner Spotlight */}
      <ManagingPartnerSpotlight />


      {/* Visual Bento Grid */}
      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Areas of <span className="text-gold-gradient">Expertise</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Comprehensive legal services grounded in deep knowledge of Kenyan law and international best practice.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Hero card with image */}
            <ScrollReveal>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative md:col-span-2 lg:col-span-2 rounded-lg border border-border overflow-hidden h-64 lg:h-80"
              >
                <img src={courtroomImg} alt="Kenyan courtroom" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1200} height={800} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <Scale className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-heading text-xl font-bold text-foreground lg:text-2xl">Justice in the Kenyan Courts</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-lg">
                    From the Tax Appeals Tribunal to the Supreme Court, we represent clients across every tier of Kenya's judicial system with precision and conviction.
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

            {practiceAreas.slice(0, 1).map((area) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.id} delay={0.1}>
                  <motion.div whileHover={{ y: -4 }}>
                    <Link
                      to={`/practice-areas/${area.id}`}
                      className="group flex h-64 lg:h-80 flex-col justify-between rounded-lg border border-border bg-secondary/50 p-6 transition-all hover:border-primary/40 hover:bg-secondary"
                    >
                      <div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{area.shortTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">{area.description.substring(0, 180)}...</p>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}

            {practiceAreas.slice(1).map((area, i) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.id} delay={(i + 1) * 0.08}>
                  <motion.div whileHover={{ y: -4 }}>
                    <Link
                      to={`/practice-areas/${area.id}`}
                      className="group flex h-full min-h-[200px] flex-col justify-between rounded-lg border border-border bg-secondary/50 p-6 transition-all hover:border-primary/40 hover:bg-secondary"
                    >
                      <div>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground">{area.shortTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{area.description.substring(0, 120)}...</p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nairobi Skyline + Stats with Animated Counters */}
      <section className="relative border-y border-border overflow-hidden">
        <img src={nairobiImg} alt="Nairobi skyline at sunset" className="absolute inset-0 h-full w-full object-cover opacity-15" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative mx-auto px-4 py-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                <span className="text-gold-gradient">Three Years</span> of Relentless Advocacy
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
                In just three years, we've built a track record that speaks for itself — because in our firm, results aren't aspirational, they're expected.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: firmStats.yearsExperience, label: "Years of Practice", sub: "Since 2023", suffix: "" },
              { value: firmStats.casesHandled, label: "Cases Handled", sub: "Across all practice areas", suffix: "+" },
              { value: firmStats.successRate, label: "Success Rate", sub: "Favourable outcomes", suffix: "%" },
              { value: firmStats.clientRetention, label: "Client Retention", sub: "Clients who return", suffix: "%" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-primary md:text-5xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                How We <span className="text-gold-gradient">Work</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                A structured approach that ensures clarity, alignment, and results from day one.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-5 items-center">
            <div className="lg:col-span-2 hidden lg:block">
              <ScrollReveal direction="left">
                <div className="rounded-lg border border-border overflow-hidden">
                  <img src={signingImg} alt="Legal document signing" className="w-full h-80 object-cover" loading="lazy" width={1200} height={800} />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {[
                  { step: "01", title: "Initial Consultation", desc: "We begin with a confidential consultation to understand your legal needs, assess the merits of your matter, and outline your options. No commitment required." },
                  { step: "02", title: "Retainer & Strategy", desc: "Once engaged, we develop a tailored legal strategy with clear milestones, transparent fee structures, and regular progress updates throughout." },
                  { step: "03", title: "Execution & Results", desc: "Our team works diligently to deliver outcomes — whether through negotiation, mediation, or litigation — keeping you informed at every stage." },
                ].map((item, i) => (
                  <ScrollReveal key={item.step} delay={i * 0.12}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-5 rounded-lg border border-border bg-secondary/30 p-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary text-lg font-bold text-primary">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Did You Know Tips - Flip Cards */}
      <DidYouKnow />

      {/* This Week in Kenyan Law */}
      <ThisWeekInLaw />

      {/* Featured Testimonial + Blog */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-8 lg:p-10">
                <div>
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: featuredTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="font-heading text-lg italic leading-relaxed text-foreground">
                    "{featuredTestimonial.content}"
                  </blockquote>
                </div>
                <div className="mt-6">
                  <div className="font-semibold text-foreground">{featuredTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{featuredTestimonial.role}</div>
                </div>
                <Link to="/results" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  View all testimonials <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-8 lg:p-10">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {featuredPost.category}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-foreground">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{featuredPost.date} · {featuredPost.readTime}</span>
                  <Link to={`/insights/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Ready to Discuss Your <span className="text-gold-gradient">Legal Matter</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Every case begins with a conversation. Reach out today for a confidential consultation with one of our advocates.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90">
                  Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/254796759632" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-border text-base text-foreground hover:bg-secondary">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TalkToPartnerCTA />
    </>
  );
};

export default Index;

