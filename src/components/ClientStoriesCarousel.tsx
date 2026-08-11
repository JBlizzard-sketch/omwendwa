import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientStory {
  initials: string;
  name: string;
  role: string;
  matter: string;
  story: string;
  outcome: string;
  rating: number;
}

const stories: ClientStory[] = [
  {
    initials: "JK",
    name: "James K.",
    role: "Manufacturing CEO",
    matter: "KRA Tax Dispute",
    story: "We received a crippling KES 45M assessment that threatened to shut us down. The team didn't just fight it — they rebuilt our entire compliance posture so it never happens again.",
    outcome: "78% reduction at the Tax Appeals Tribunal",
    rating: 5,
  },
  {
    initials: "MW",
    name: "Margaret W.",
    role: "Property Developer",
    matter: "Boundary Injunction — Mombasa",
    story: "A title overlap was about to derail a development we'd waited two years to break ground on. Rac's team moved within 48 hours and steered the matter into mediation.",
    outcome: "Project delivered on schedule",
    rating: 5,
  },
  {
    initials: "AH",
    name: "Amina H.",
    role: "Startup Founder",
    matter: "Seed Round Structuring",
    story: "I'd never seen a SAFE before. the firm's commercial partner walked me through cap tables, IP assignment, and shareholder rights without ever making me feel small. The investors noticed.",
    outcome: "Closed seed round 3 months later",
    rating: 5,
  },
  {
    initials: "PN",
    name: "Peter N.",
    role: "Family Heir",
    matter: "Succession Settlement",
    story: "Our case had been stuck in court for three years. Eight months after engaging the firm, we walked out with a settlement everyone could live with — and our family could finally breathe.",
    outcome: "Negotiated settlement, closure achieved",
    rating: 5,
  },
  {
    initials: "SM",
    name: "Susan M.",
    role: "NGO Director",
    matter: "PBO Act Compliance",
    story: "They understood we needed governance that fit a small NGO — not a corporate behemoth. Their advice was practical, proportionate, and refreshingly free of jargon.",
    outcome: "Full compliance with zero overhead bloat",
    rating: 5,
  },
];

const ClientStoriesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-10 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Client Stories</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Real People. <span className="text-gold-gradient">Real Outcomes.</span>
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous story"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next story"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {stories.map((s, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <Quote className="absolute right-5 top-5 h-10 w-10 text-primary/10 transition-colors group-hover:text-primary/20" />
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                        {s.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.role}</div>
                      </div>
                    </div>
                    <div className="mt-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {s.matter}
                    </div>
                    <p className="mt-4 text-sm italic leading-relaxed text-foreground/90">"{s.story}"</p>
                    <div className="mt-5 border-t border-border pt-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Outcome</div>
                      <div className="mt-1 text-sm font-semibold text-primary">{s.outcome}</div>
                      <div className="mt-3 flex gap-1">
                        {Array.from({ length: s.rating }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {stories.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to story ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesCarousel;
