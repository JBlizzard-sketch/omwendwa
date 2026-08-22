import { blogPosts, type BlogPost } from "./blogPosts";

export interface Series {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  postSlugs: string[];
}

export const series: Series[] = [
  {
    id: "business-in-kenya",
    title: "Doing Business in Kenya",
    tagline: "From incorporation to compliance",
    description:
      "A step-by-step reading journey for founders and directors: how to set up cleanly, govern properly, keep KRA satisfied, and resolve commercial disputes without burning cash or time.",
    accent: "from-primary/15 to-primary/5",
    postSlugs: [
      "starting-business-kenya-legal-checklist-2026",
      "corporate-governance-kenyan-smes",
      "kenya-new-tax-laws-2026",
      "commercial-disputes-adr-vs-litigation-kenya",
    ],
  },
  {
    id: "family-and-legacy",
    title: "Family, Property & Legacy",
    tagline: "Protecting the people who come after you",
    description:
      "What Kenyan law actually says about marriage, separation, matrimonial property and succession — and the practical steps that keep families out of a decade-long court file.",
    accent: "from-accent/20 to-accent/5",
    postSlugs: ["succession-planning-kenyan-law", "divorce-rights-kenya-custody-property"],
  },
  {
    id: "land-and-work",
    title: "Land & Workplace Rights",
    tagline: "Where most Kenyan disputes actually start",
    description:
      "Title, boundaries, evictions, contracts, terminations and redundancy. Two subjects that generate more litigation in Kenya than almost anything else, explained in plain language.",
    accent: "from-secondary to-secondary/30",
    postSlugs: ["land-disputes-kenya-property-owners", "employment-law-kenyan-workers-rights"],
  },
];

const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export const seriesPosts = (s: Series): BlogPost[] =>
  s.postSlugs.map((slug) => bySlug.get(slug)).filter((p): p is BlogPost => Boolean(p));

export const seriesById = (id?: string) => series.find((s) => s.id === id);

export const findSeriesForPost = (slug: string) => {
  for (const s of series) {
    const index = s.postSlugs.indexOf(slug);
    if (index !== -1) return { series: s, index, total: s.postSlugs.length };
  }
  return null;
};
