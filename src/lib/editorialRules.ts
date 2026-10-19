import type { StaffRole } from "@/lib/staffRules";
export const articleStatuses = ["draft", "review", "approved", "scheduled", "published", "archived"] as const;
export type ArticleStatus = typeof articleStatuses[number];
export const canEditArticles = (roles: StaffRole[]) => roles.includes("admin") || roles.includes("editor");
export const canPublishArticles = (roles: StaffRole[]) => roles.includes("admin");
export const validArticleSlug = (slug: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && slug.length <= 160;