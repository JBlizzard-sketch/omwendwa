/**
 * schema.org helpers — LawFirm, Person, Service, FAQPage, Article, BreadcrumbList.
 * Every builder returns a plain object rendered by <JsonLd />.
 */

export const SITE_URL = "https://omwendwa.com";
export const FIRM_NAME = "O. Mwendwa & Company Advocates";

export const abs = (path = "/") => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export const ORG_ID = `${SITE_URL}/#organization`;

export const lawFirmSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LegalService", "LawFirm", "Organization"],
  "@id": ORG_ID,
  name: FIRM_NAME,
  legalName: FIRM_NAME,
  url: SITE_URL,
  telephone: "+254796759632",
  email: "Ochielmwendwa@gmail.com",
  foundingDate: "2026-03",
  slogan: "Timely. Responsive. Commercially Minded. Always Professional.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Uniafric House, Koinange Street, Suite 334",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: { "@type": "Country", name: "Kenya" },
  priceRange: "$$",
  openingHours: "Mo-Fr 08:00-18:00",
});

export const personSchema = (person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  alumniOf?: string[];
  awards?: string[];
  knowsAbout?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#${person.name.toLowerCase().replace(/\s+/g, "-")}`,
  name: person.name,
  jobTitle: person.jobTitle,
  description: person.description,
  image: person.image ? abs(person.image) : undefined,
  url: abs(person.url ?? "/about"),
  worksFor: { "@id": ORG_ID },
  alumniOf: person.alumniOf?.map((n) => ({ "@type": "EducationalOrganization", name: n })),
  award: person.awards,
  knowsAbout: person.knowsAbout,
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  path: string;
  serviceTypes?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${abs(service.path)}#service`,
  name: service.name,
  description: service.description,
  serviceType: service.name,
  url: abs(service.path),
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Kenya" },
  audience: { "@type": "Audience", audienceType: "Businesses and individuals in Kenya" },
  hasOfferCatalog: service.serviceTypes?.length
    ? {
        "@type": "OfferCatalog",
        name: `${service.name} services`,
        itemListElement: service.serviceTypes.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s },
        })),
      }
    : undefined,
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = (article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
  authorName?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${abs(article.path)}#article`,
  headline: article.title,
  description: article.description,
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(article.path) },
  url: abs(article.path),
  datePublished: article.datePublished,
  dateModified: article.dateModified ?? article.datePublished,
  image: article.image ? abs(article.image) : abs("/og-image.jpg"),
  articleSection: article.section,
  keywords: article.keywords?.join(", "),
  wordCount: article.wordCount,
  inLanguage: "en-KE",
  author: { "@type": "Person", name: article.authorName ?? "Rachel Mwendwa", url: abs("/about") },
  publisher: { "@id": ORG_ID },
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: abs(it.path),
  })),
});
