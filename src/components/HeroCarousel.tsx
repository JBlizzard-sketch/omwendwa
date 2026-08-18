import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSiteSearch } from "@/hooks/use-site-search";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const slides = [
  {
    image: heroSlide1,
    alt: "Nairobi legal practice at work",
    subtitle: "Advocates & Legal Consultants · Nairobi",
    headline: "Fresh thinking.",
    headlineAccent: "Sharp advocacy.",
    subheadline: "Justice for a modern Kenya.",
    description:
      "A new-generation law firm at the intersection of law, technology and modern business. Founded March 2026 for relentless, results-driven practice.",
    cta: "Book a Consultation",
    ctaLink: "/contact",
    secondaryCta: "Our Practice Areas",
    secondaryLink: "/practice-areas",
  },
  {
    image: heroSlide2,
    alt: "Tax advisory documents and analysis",
    subtitle: "Tax Advisory & Compliance",
    headline: "Tax dispute?",
    headlineAccent: "We take on KRA.",
    subheadline: "Tribunal representation that holds up.",
    description:
      "From compliance audits to Tax Appeals Tribunal litigation, we help businesses navigate Kenya's tax landscape with confidence.",
    cta: "Get Tax Help",
    ctaLink: "/practice-areas/tax",
    secondaryCta: "Read Tax Insights",
    secondaryLink: "/insights/kenya-new-tax-laws-2026",
  },
  {
    image: heroSlide3,
    alt: "Reading Kenyan legal commentary",
    subtitle: "Legal Knowledge for Every Kenyan",
    headline: "Know your rights",
    headlineAccent: "under Kenyan law.",
    subheadline: "Expert analysis, plainly written.",
    description:
      "Commentary on tax, succession, commercial disputes, employment, family law and land rights — written to be understood, not decoded.",
    cta: "Read Our Insights",
    ctaLink: "/insights",
    secondaryCta: "Free Legal Tools",
    secondaryLink: "/legal-tools",
  },
  {
    image: heroSlide4,
    alt: "Client consultation in progress",
    subtitle: "Free Legal Assessment",
    headline: "Do you have a case?",
    headlineAccent: "Find out in 2 minutes.",
    subheadline: "Quick, confidential, no obligation.",
    description:
      "Answer a few questions and get an instant read on your options and the documents you should gather first.",
    cta: "Start Assessment",
    ctaLink: "/legal-tools",
    secondaryCta: "Talk to Us",
    secondaryLink: "/contact",
  },
];

const trustChips = [
  { icon: Clock, label: "Reply within 1 business day" },
  { icon: ShieldCheck, label: "Partner-led on every matter" },
  { icon: Sparkles, label: "17 practice areas" },
];

const DURATION = 6500;

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const { openSearch } = useSiteSearch();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, DURATION);
    return () => clearTimeout(timer.current);
  }, [current, paused, next]);

  const slide = slides[current];
  const words = `${slide.headline} ${slide.headlineAccent}`.split(" ");
  const accentStart = slide.headline.split(" ").length;

  return (
    <section
      className="relative overflow-hidden bg-blush-wash pt-24 pb-14 lg:pt-32 lg:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Firm introduction"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-serene/20 blur-3xl" aria-hidden="true" />

      <div className="container relative mx-auto grid items-center gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum-light">
                  {slide.subtitle}
                </span>
              </div>

              <h1 className="font-heading text-[2.5rem] font-semibold leading-[1.08] text-plum sm:text-5xl lg:text-[3.75rem]">
                {words.map((word, i) => (
                  <motion.span
                    key={`${current}-${i}`}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
                    className={i >= accentStart ? "text-rose-gradient inline-block" : "inline-block"}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </h1>

              <p className="mt-3 font-heading text-xl text-plum-light sm:text-2xl">{slide.subheadline}</p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="min-h-[52px] rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_16px_32px_-18px_hsl(348_56%_52%/0.9)] transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={slide.secondaryLink}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-h-[52px] rounded-full border-plum/20 bg-background/70 px-6 text-base font-semibold text-plum hover:bg-secondary"
                  >
                    {slide.secondaryCta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={openSearch}
            className="mt-7 flex w-full max-w-md items-center gap-3 rounded-full border border-border bg-background px-5 py-3.5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
          >
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Search practice areas, insights, FAQs…</span>
            <kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:block">
              ⌘K
            </kbd>
          </button>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {trustChips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-plum-light">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-[0_40px_80px_-40px_hsl(336_38%_16%/0.45)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current}
                src={slide.image}
                alt={slide.alt}
                width={1200}
                height={1500}
                loading={current === 0 ? "eager" : "lazy"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className={`absolute inset-0 h-full w-full object-cover ${reduce ? "" : "ken-burns"}`}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/60 bg-background/90 p-4 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Nairobi CBD</p>
              <p className="mt-1 text-sm font-medium text-plum">
                Uniafric House, Koinange Street, Suite 334 — consultations in person or online.
              </p>
            </div>
          </div>

          {/* Progress rail */}
          <div className="mt-5 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.headline}
                onClick={() => setCurrent(i)}
                aria-label={`Show slide ${i + 1}: ${s.headline}`}
                aria-current={i === current}
                className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-border"
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--brass))] transition-all ${
                    i < current ? "w-full" : i === current ? "w-full origin-left" : "w-0"
                  }`}
                  style={
                    i === current && !paused && !reduce
                      ? { animation: `hero-progress ${DURATION}ms linear forwards` }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
};

export default HeroCarousel;
