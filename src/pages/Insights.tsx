import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import NewsletterSignup from "@/components/NewsletterSignup";


const Insights = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Legal Insights — Kenyan Law Blog & Commentary"
        description="Expert legal analysis and commentary on Kenyan law. Read our blog covering tax updates, succession planning, commercial disputes, family law, and land rights."
      />

      <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Knowledge & Analysis</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Legal <span className="text-gold-gradient">Insights</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Expert commentary on Kenyan law, regulatory changes, and practical legal guidance for businesses and individuals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link
                  to={`/insights/${post.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40"
                >
                  <span className="inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No articles match your search. Try different keywords.
            </div>
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

