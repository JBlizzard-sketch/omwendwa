import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { series, seriesPosts } from "@/data/series";

const SeriesStrip = () => (
  <section className="bg-background py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Reading journeys</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Read it as a <span className="text-gold-gradient">series</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Our guides are grouped into ordered journeys, so you can go from first question to confident decision
            without hunting through the archive.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {series.map((s, i) => {
          const posts = seriesPosts(s);
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/insights/series/${s.id}`}
                className={`group flex h-full flex-col rounded-2xl border border-border bg-gradient-to-br ${s.accent} p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {posts.length} parts · {s.tagline}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-foreground group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <ol className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
                  {posts.slice(0, 3).map((p, idx) => (
                    <li key={p.slug} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="font-bold text-primary">{idx + 1}.</span>
                      <span className="line-clamp-1">{p.title}</span>
                    </li>
                  ))}
                </ol>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Start the series <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SeriesStrip;
