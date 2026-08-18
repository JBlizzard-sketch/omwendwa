import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import ReadingProgress from "@/components/ReadingProgress";
import SocialShare from "@/components/SocialShare";
import AuthorByline from "@/components/AuthorByline";
import NewsletterSignup from "@/components/NewsletterSignup";


const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  // Category-aware related posts: same category first, then most-recent from other categories
  const others = blogPosts.filter((p) => p.slug !== slug);
  const sameCategory = post ? others.filter((p) => p.category === post.category) : [];
  const otherCategory = post
    ? others
        .filter((p) => p.category !== post.category)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
    : others;
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 3);


  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Article not found</h1>
          <Link to="/insights" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown-ish content to simple HTML
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("## ")) {
        return <h2 key={i} className="mb-4 mt-10 font-heading text-2xl font-bold text-foreground">{paragraph.replace("## ", "")}</h2>;
      }
      if (paragraph.startsWith("### ")) {
        return <h3 key={i} className="mb-3 mt-8 font-heading text-xl font-bold text-foreground">{paragraph.replace("### ", "")}</h3>;
      }
      if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
        const items = paragraph.split("\n").filter(Boolean);
        return (
          <ul key={i} className="mb-4 ml-4 space-y-2">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d]+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
              </li>
            ))}
          </ul>
        );
      }
      if (paragraph.startsWith("|")) {
        // Skip tables for simplicity
        return null;
      }
      return (
        <p
          key={i}
          className="mb-4 leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>"),
          }}
        />
      );
    });
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.metaDescription}
        type="article"
        canonical={`https://omwendwa.com/insights/${post.slug}`}
      />
      <ReadingProgress />

      <article className="bg-background pt-28 pb-20 lg:pt-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <Link to="/insights" className="mb-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Insights
              </Link>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </span>
              <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
              </div>
            </ScrollReveal>

            <AuthorByline category={post.category} />



            <ScrollReveal delay={0.1}>
              <div className="mt-10 border-t border-border pt-10">
                {renderContent(post.content)}
              </div>
            </ScrollReveal>


            <ScrollReveal delay={0.15}>
              <div className="mt-10 border-t border-border pt-6">
                <SocialShare title={post.title} />
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.2}>
              <div className="mt-12 rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
                <h3 className="font-heading text-xl font-bold text-foreground">Need Legal Advice on This Topic?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our advocates are ready to assist. Book a confidential consultation today.</p>
                <Link to="/contact" className="mt-4 inline-block">
                  <Button className="bg-primary text-primary-foreground">
                    Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            </ScrollReveal>



            {/* Related Posts */}
            <ScrollReveal delay={0.2}>
              <div className="mt-16">
                <h3 className="mb-6 font-heading text-xl font-bold text-foreground">Related Articles</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/insights/${p.slug}`}
                      className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <span className="text-[10px] font-semibold uppercase text-primary">{p.category}</span>
                      <h4 className="mt-1 font-heading text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h4>
                      <span className="mt-2 block text-xs text-muted-foreground">{p.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
