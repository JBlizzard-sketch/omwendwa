import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";
import { practiceAreas } from "@/data/practiceAreas";
import { groupedPracticeAreas, categoryForArea, practiceGroups } from "@/data/practiceGroups";
import { practiceImages as imageMap } from "@/data/practiceImages";
import { cn } from "@/lib/utils";

const filters = ["All", ...practiceGroups.map((g) => g.label)];

const PracticeAreas = () => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return practiceAreas.filter((area) => {
      const inFilter = filter === "All" || categoryForArea(area.id) === filter;
      const inQuery =
        !q ||
        `${area.title} ${area.shortTitle} ${area.description} ${area.services.join(" ")}`
          .toLowerCase()
          .includes(q);
      return inFilter && inQuery;
    });
  }, [filter, query]);

  return (
    <>
      <SEOHead
        title="Practice Areas — Litigation, Tax, Commercial, Employment, Conveyancing & More"
        description="Litigation, tax, commercial, employment, conveyancing, family, succession, governance, land, ADR, human rights, policy and legislative drafting, legal tech — built for Kenya."
        canonical="https://omwendwa.com/practice-areas"
      />

      <section className="bg-blush-wash pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <p className="eyebrow">What we do</p>
            <h1 className="mt-3 font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
              Seventeen practice areas.{" "}
              <span className="text-rose-gradient">One standard.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Comprehensive legal services grounded in Kenyan statute and case law — from boardroom
              transactions to public-interest litigation.
            </p>
          </ScrollReveal>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-all",
                    filter === f
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-plum-light hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter areas…"
                aria-label="Filter practice areas"
                className="min-h-[44px] w-full rounded-full border border-border bg-background pl-11 pr-10 text-sm outline-none transition-colors focus:border-primary"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear filter"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{visible.length}</span> of {practiceAreas.length} practice areas
          </p>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((area, i) => {
                const Icon = area.icon;
                const featured = i === 0 && filter === "All" && !query;
                return (
                  <motion.article
                    key={area.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                    className={cn(
                      "hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card",
                      featured && "sm:col-span-2 lg:col-span-2",
                    )}
                  >
                    <Link to={`/practice-areas/${area.id}`} className="flex h-full flex-col">
                      <div className={cn("relative overflow-hidden", featured ? "h-56" : "h-40")}>
                        <img
                          src={imageMap[area.image]}
                          alt=""
                          loading="lazy"
                          width={960}
                          height={540}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/10 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur">
                          {categoryForArea(area.id)}
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                          <h2 className="font-heading text-xl font-semibold text-white drop-shadow-sm">
                            {area.shortTitle}
                          </h2>
                          <span className="rounded-xl bg-background/90 px-3 py-1.5 text-center backdrop-blur">
                            <span className="block font-heading text-base font-bold text-primary">{area.stat.value}</span>
                            <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                              {area.stat.label}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <p className="text-sm font-semibold text-plum">{area.title}</p>
                        </div>
                        <p className={cn("text-sm leading-relaxed text-muted-foreground", featured ? "" : "line-clamp-3")}>
                          {area.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {area.services.slice(0, featured ? 5 : 3).map((s) => (
                            <li key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-plum-light">
                              {s}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
                          Explore {area.shortTitle}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center">
              <p className="font-heading text-xl">Nothing matches “{query}”</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a broader term, or tell us what you need.</p>
              <Link to="/contact">
                <Button className="mt-5 rounded-full">Talk to us</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50 py-14">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {groupedPracticeAreas.map(({ group, areas }) => (
            <div key={group.label}>
              <p className="eyebrow">{group.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
              <ul className="mt-3 space-y-1.5">
                {areas.map((area) => (
                  <li key={area.id}>
                    <Link
                      to={`/practice-areas/${area.id}`}
                      className="text-sm font-medium text-plum transition-colors hover:text-primary"
                    >
                      {area.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <TalkToPartnerCTA />
    </>
  );
};

export default PracticeAreas;
