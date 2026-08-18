import { practiceAreas } from "./practiceAreas";
import { blogPosts } from "./blogPosts";

export type SearchGroup =
  | "Pages"
  | "Practice Areas"
  | "Insights"
  | "FAQs"
  | "Checklists";

export interface SearchItem {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
}

const staticPages: SearchItem[] = [
  { id: "page-home", group: "Pages", title: "Home", subtitle: "O. Mwendwa & Company Advocates", href: "/", keywords: "home firm nairobi advocates law" },
  { id: "page-about", group: "Pages", title: "About the Firm", subtitle: "Rachel Mwendwa, our story and values", href: "/about", keywords: "about rachel mwendwa managing partner team values founded march 2026" },
  { id: "page-practice", group: "Pages", title: "Practice Areas", subtitle: "All 17 areas of practice", href: "/practice-areas", keywords: "practice areas services expertise" },
  { id: "page-results", group: "Pages", title: "Results & Case Studies", subtitle: "Outcomes we have delivered", href: "/results", keywords: "results outcomes case studies wins clients" },
  { id: "page-insights", group: "Pages", title: "Insights", subtitle: "Legal analysis and commentary", href: "/insights", keywords: "insights blog articles updates kenyan law" },
  { id: "page-tools", group: "Pages", title: "Legal Tools", subtitle: "Calculators and readiness checks", href: "/legal-tools", keywords: "tools calculators stamp duty notice period glossary quick legal check" },
  { id: "page-contact", group: "Pages", title: "Contact & Consultation", subtitle: "Book a consultation with the firm", href: "/contact", keywords: "contact consultation booking phone email whatsapp nairobi koinange" },
];

const areaItems: SearchItem[] = practiceAreas.map((area) => ({
  id: `area-${area.id}`,
  group: "Practice Areas",
  title: area.title,
  subtitle: area.description.slice(0, 110) + "…",
  href: `/practice-areas/${area.id}`,
  keywords: [area.shortTitle, ...area.services, ...area.statutes].join(" "),
}));

const postItems: SearchItem[] = blogPosts.map((post) => ({
  id: `post-${post.slug}`,
  group: "Insights",
  title: post.title,
  subtitle: `${post.category} · ${post.readTime}`,
  href: `/insights/${post.slug}`,
  keywords: `${post.excerpt} ${post.category} ${post.metaDescription}`,
}));

const faqItems: SearchItem[] = practiceAreas.flatMap((area) =>
  area.faqs.map((faq, i) => ({
    id: `faq-${area.id}-${i}`,
    group: "FAQs" as const,
    title: faq.q,
    subtitle: `${area.shortTitle} · ${faq.a.slice(0, 90)}…`,
    href: `/practice-areas/${area.id}#faqs`,
    keywords: `${faq.a} ${area.shortTitle}`,
  })),
);

const checklistItems: SearchItem[] = practiceAreas.map((area) => ({
  id: `checklist-${area.id}`,
  group: "Checklists",
  title: `${area.shortTitle} document checklist`,
  subtitle: `${area.checklist.length} documents to bring to your first meeting`,
  href: `/practice-areas/${area.id}#checklist`,
  keywords: area.checklist.join(" "),
}));

export const searchIndex: SearchItem[] = [
  ...staticPages,
  ...areaItems,
  ...postItems,
  ...faqItems,
  ...checklistItems,
];

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

export function searchSite(query: string, limit = 24): SearchItem[] {
  const q = normalise(query).trim();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return searchIndex
    .map((item) => {
      const title = normalise(item.title);
      const haystack = normalise(`${item.title} ${item.subtitle ?? ""} ${item.keywords}`);
      let score = 0;
      for (const term of terms) {
        if (title.startsWith(term)) score += 12;
        else if (title.includes(term)) score += 8;
        else if (haystack.includes(term)) score += 3;
        else return null;
      }
      if (item.group === "Practice Areas") score += 2;
      if (item.group === "Pages") score += 1;
      return { item, score };
    })
    .filter((hit): hit is { item: SearchItem; score: number } => hit !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((hit) => hit.item);
}
