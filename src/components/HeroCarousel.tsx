import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const slides = [
  {
    image: heroSlide1,
    subtitle: "Advocates & Legal Consultants · Nairobi",
    headline: "Fresh Thinking.",
    headlineGold: "Sharp Advocacy.",
    subheadline: "Justice for a Modern Kenya.",
    description: "A new-generation law firm at the intersection of law, technology, and modern business. Founded in March 2026 for relentless, results-driven practice.",
    cta: "Book a Consultation",
    ctaLink: "/contact",
    secondaryCta: "Our Practice Areas",
    secondaryLink: "/practice-areas",
  },
  {
    image: heroSlide2,
    subtitle: "Tax Advisory & Compliance",
    headline: "Tax Disputes?",
    headlineGold: "We Fight KRA For You.",
    subheadline: "Expert Tax Tribunal Representation.",
    description: "From compliance audits to Tax Appeals Tribunal litigation. We help businesses navigate Kenya's complex tax landscape with confidence.",
    cta: "Get Tax Help",
    ctaLink: "/practice-areas#tax",
    secondaryCta: "Read Tax Insights",
    secondaryLink: "/insights/kenya-new-tax-laws-2026",
  },
  {
    image: heroSlide3,
    subtitle: "Legal Knowledge for Every Kenyan",
    headline: "Know Your Rights",
    headlineGold: "Under Kenyan Law.",
    subheadline: "Expert Analysis & Commentary.",
    description: "Stay informed with our expert blog covering tax updates, succession planning, commercial disputes, family law, and land rights across Kenya.",
    cta: "Read Our Insights",
    ctaLink: "/insights",
    secondaryCta: "Free Legal Tools",
    secondaryLink: "/legal-tools",
  },
  {
    image: heroSlide4,
    subtitle: "Free Legal Assessment",
    headline: "Do You Have a Case?",
    headlineGold: "Find Out in 2 Minutes.",
    subheadline: "Quick, Confidential, No Obligation.",
    description: "Use our free legal assessment tool to understand your options. Answer a few questions and get an instant recommendation on next steps.",
    cta: "Start Assessment",
    ctaLink: "/legal-tools",
    secondaryCta: "Contact Us Directly",
    secondaryLink: "/contact",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background pt-20">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover opacity-20"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="h-px w-12 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {slide.subtitle}
                </span>
              </div>

              <h1 className="font-heading text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                {slide.headline}{" "}
                <span className="text-gold-gradient">{slide.headlineGold}</span>
                <br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">{slide.subheadline}</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to={slide.ctaLink}>
                  <Button size="lg" className="bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={slide.secondaryLink}>
                  <Button variant="outline" size="lg" className="border-border text-base text-foreground hover:bg-secondary">
                    {slide.secondaryCta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
