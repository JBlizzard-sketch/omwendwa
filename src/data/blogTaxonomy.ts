import { blogPosts, blogCategories } from "./blogPosts";

export const POSTS_PER_PAGE = 6;

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const categoryFromSlug = (slug?: string) =>
  blogCategories.find((c) => c !== "All" && categorySlug(c) === slug);

export interface CategoryMeta {
  name: string;
  slug: string;
  count: number;
  description: string;
}

const descriptions: Record<string, string> = {
  "Kenyan Law Updates":
    "Timely briefings on new Kenyan statutes, Finance Act changes, regulations and regulator practice, written for business owners and individuals.",
  "Legal Guides":
    "Evergreen, step-by-step guides to Kenyan law — succession, employment, land, company formation and everyday compliance.",
  Commentary:
    "Considered commentary on how Kenyan law is developing, and what the direction of travel means in practice.",
  "Case Analysis":
    "Breakdowns of decided Kenyan cases and what the reasoning means for similar disputes.",
};

export const categoryList = (): CategoryMeta[] =>
  blogCategories
    .filter((c) => c !== "All")
    .map((name) => ({
      name,
      slug: categorySlug(name),
      count: blogPosts.filter((p) => p.category === name).length,
      description: descriptions[name] ?? `Articles on ${name} from O. Mwendwa & Company Advocates.`,
    }));

export const sortedPosts = () => [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const paginate = <T,>(items: T[], page: number, perPage = POSTS_PER_PAGE) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    current,
    totalPages,
    items: items.slice((current - 1) * perPage, current * perPage),
  };
};
