import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
export interface PublishedPost extends BlogPost { modified?: string; author?: string }
export function useArticles() {
  const result = useQuery({
    queryKey: ["published-articles"], staleTime: 30000, refetchInterval: 30000,
    queryFn: async () => {
      const [posts, index] = await Promise.all([
        supabase.from("published_articles").select("*").order("published_at", { ascending: false }),
        supabase.rpc("article_public_index"),
      ]);
      if (posts.error || index.error) throw posts.error || index.error;
      const excluded = new Set(index.data?.map(p => p.slug) ?? []);
      const merged: PublishedPost[] = blogPosts.filter(p => !excluded.has(p.slug));
      for (const p of posts.data ?? []) merged.push({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, content: p.content, date: p.published_at.slice(0, 10), modified: p.updated_at.slice(0, 10), author: p.author_name, metaDescription: p.meta_description || p.excerpt, readTime: `${Math.max(1, Math.ceil(p.content.split(/\s+/).length / 220))} min read` });
      return merged;
    },
  });
  return { ...result, articles: result.data ?? blogPosts as PublishedPost[] };
}