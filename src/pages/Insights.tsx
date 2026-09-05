import { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterSignup from "@/components/NewsletterSignup";
import SeriesStrip from "@/components/SeriesStrip";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import { trackEvent } from "@/lib/analytics";
import {
  POSTS_PER_PAGE,
  categoryFromSlug,
  categoryList,
  categorySlug,
  paginate,
  sortedPosts,
} from "@/data/blogTaxonomy";

const Insights = () => {
  const { categorySlug: slugParam } = useParams();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const activeCategory = slugParam ? categoryFromSlug(slugParam) : undefined;
  const categories = categoryList();

  const basePath = activeCategory ? `/insights/category/${categorySlug(activeCategory)}` : "/insights";
  const page = Number(params.get("page") ?? 1) || 1;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedPosts().filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory;
      const matchesSearch =
        !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const { items, current, totalPages } = paginate(filtered, search ? 1 : page, POSTS_PER_PAGE);

  const goToPage = (next: number) => {
    trackEvent("blog_pagination", { to_page: next, category: activeCategory ?? "all" });
    const sp = new URLSearchParams(params);
    if (next <= 1) sp.delete("page");
    else sp.set("page", String(next));
    setParams(sp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (slugParam && !activeCategory) return <Navigate to="/insights" replace />;

  const canonicalPath = current > 1 ? `${basePath}?page=${current}` : basePath;
  const title = activeCategory
    ? `${activeCategory} — Kenyan Law Articles${current > 1 ? ` (Page ${current})` : ""}`
    : `Legal Insights — Kenyan Law Blog & Commentary${current > 1 ? ` (Page ${current})` : ""}`;
  const description = activeCategory
    ? categories.find((c) => c.name === activeCategory)!.description
    : "Expert legal analysis and commentary on Kenyan law: tax updates, succession planning, commercial disputes, employment, family law and land rights.";

  return (
    <>
      <SEOHead title={title} description={description} canonical={`https://omwendwa.com${canonicalPath}`} />
      <JsonLd
        data={[
          breadcrumbSchema(
            activeCategory
              ? [
                  { name: "Home", path: "/" },
                  { name: "Insights", path: "/insights" },
                  { name: activeCategory, path: basePath },
                ]
              : [
                  { name: "Home", path: "/" },
                  { name: "Insights", path: "/insights" },
                ],
          ),
          itemListSchema(
            activeCategory ? `${activeCategory} articles` : "Legal insights",
            items.map((p) => ({ name: p.title, path: `/insights/${p.slug}` })),
          ),
        ]}
      />

      <section className="bg-blush-wash pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              {activeCategory ? (
                <>
                  <Link to="/insights" className="hover:text-primary">Insights</Link>
                  <span className="mx-2" aria-hidden="true">/</span>
                  <span className="text-foreground">{activeCategory}</span>
                </>
              ) : (
                <span className="text-foreground">Insights</span>
              )}
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="eyebrow">Knowledge &amp; Analysis</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              {activeCategory ? (
                <>
                  {activeCategory.replace(/(\s\w+)$/, "")}{" "}
                  <span className="text-rose-gradient">{activeCategory.split(" ").slice(-1)[0]}</span>
                </>
              ) : (
                <>
                  Legal <span className="text-rose-gradient">Insights</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
          </ScrollReveal>
        </div>
      </section>

      <SeriesStrip />

      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <nav aria-label="Article categories" className="flex flex-wrap gap-2">
                <Link
                  to="/insights"
                  onClick={() => trackEvent("blog_category_filter", { category: "all" })}
                  aria-current={!activeCategory ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    !activeCategory
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All articles
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/insights/category/${cat.slug}`}
                    onClick={() => trackEvent("blog_category_filter", { category: cat.name })}
                    aria-current={activeCategory === cat.name ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      activeCategory === cat.name
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name} <span className="opacity-70">({cat.count})</span>
                  </Link>
                ))}
              </nav>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <label htmlFor="insights-search" className="sr-only">Search articles</label>
                <Input
                  id="insights-search"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <article className="h-full">
                  <Link
                    to={`/insights/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 hover-lift"
                  >
                    <span className="inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {post.category}
                    </span>
                    <h2 className="mt-4 font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs text-muted-foreground">
                        <time dateTime={post.date}>{post.date}</time> · {post.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        Read <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No articles match your search. Try different keywords.
            </div>
          )}

          {totalPages > 1 && !search && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(current - 1)}
                disabled={current === 1}
                aria-label="Previous page"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === current ? "page" : undefined}
                  className={`h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition-colors ${
                    n === current
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(current + 1)}
                disabled={current === totalPages}
                aria-label="Next page"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
};

export default Insights;
