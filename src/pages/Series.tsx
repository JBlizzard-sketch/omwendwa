import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import AuthorByline from "@/components/AuthorByline";
import NewsletterSignup from "@/components/NewsletterSignup";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";
import { Button } from "@/components/ui/button";
import { seriesById, seriesPosts, series as allSeries } from "@/data/series";

const Series = () => {
  const { seriesId } = useParams();
  const current = seriesById(seriesId);

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20 text-center">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Series not found</h1>
          <Link to="/insights" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const posts = seriesPosts(current);
  const others = allSeries.filter((s) => s.id !== current.id);

  return (
    <>
      <SEOHead
        title={`${current.title} — Reading Series on Kenyan Law`}
        description={current.description.slice(0, 155)}
        canonical={`https://omwendwa.com/insights/series/${current.id}`}
      />

      <section className={`bg-gradient-to-b ${current.accent} pt-28 pb-14 lg:pt-36 lg:pb-16`}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Link to="/insights" className="mb-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Reading series · {posts.length} parts
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {current.title}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary">{current.tagline}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{current.description}</p>
            {posts[0] && (
              <Link to={`/insights/${posts[0].slug}`} className="mt-7 inline-block">
                <Button className="bg-primary text-primary-foreground">
                  Start reading — Part 1 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ol className="relative space-y-5 border-l border-border pl-6">
              {posts.map((p, i) => (
                <motion.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <Link
                    to={`/insights/${p.slug}`}
                    className="group block rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">{p.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {p.readTime}
                      </span>
                      <span>{p.date}</span>
                    </div>
                    <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Read part {i + 1} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ol>

            <AuthorByline category={posts[0]?.category ?? "Legal Guides"} />

            <div className="mt-12">
              <NewsletterSignup />
            </div>

            {others.length > 0 && (
              <div className="mt-14">
                <h3 className="mb-5 font-heading text-xl font-bold text-foreground">Continue with another series</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {others.map((s) => (
                    <Link
                      key={s.id}
                      to={`/insights/series/${s.id}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {s.postSlugs.length} parts
                      </span>
                      <h4 className="mt-1 font-heading text-base font-bold text-foreground group-hover:text-primary">
                        {s.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">{s.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <TalkToPartnerCTA />
    </>
  );
};

export default Series;
