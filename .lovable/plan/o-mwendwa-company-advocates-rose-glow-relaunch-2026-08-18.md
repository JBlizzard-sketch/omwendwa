# O. Mwendwa & Company Advocates — "Rose Glow" Relaunch

A full light-mode rebrand plus a serious depth upgrade: magazine-grade layouts, motion, a site-wide command search, and the omwendwa.com domain wired end to end.

## 1. New identity: Rose Glow (light, bright, alive)

Rachel's references (Latham, Kirkland, Bowmans) are white, airy and typographically confident. Her muse — Jessica Pearson, with Michelle Obama / Ketanji Brown Jackson warmth — pushes toward blush and brass rather than corporate navy.

- White canvas (`#FFFFFF`) with a warm blush wash (`#FFF5F6`) on alternating bands.
- Primary rose `#D4576F`, deep plum ink `#3A1B2A` for headings, soft serene blue `#8FC3D8` as the secondary accent, brass `#C9A227` for hairlines and dividers.
- Body text in near-black plum on white — high contrast, tested for legibility at small sizes; no light-grey-on-white.
- Typography: Fraunces (or Playfair) display headings paired with Inter/Plus Jakarta body at generous 17–18px base, wide line height, balanced headline wrapping.
- Every token replaced in `index.css` + `tailwind.config.ts` (semantic HSL only). Dark-mode-era utilities (glass panels over navy, gold gradients) are re-tuned for light surfaces so nothing goes washed-out or invisible.

## 2. Vavavoom: front-end features to add

- **Cinematic hero**: full-bleed image carousel with Ken Burns drift, staggered word-by-word headline reveal, animated rose underline, dual CTA, scroll cue.
- **Sticky "aurora" header**: transparent over hero, frosted white on scroll, mega-menu for the 17 practice areas grouped into columns with icons and one-line descriptors.
- **Practice areas**: filterable bento grid with hover image reveal, category chips (Corporate / Private Client / Public Interest / Advisory), and per-area detail pages with sticky in-page nav.
- **Rachel spotlight**: split-screen portrait with parallax, animated credential chips, pull-quote, and a "Meet Rachel" marquee of institutions (International Lawyers Project, AFRODAD).
- **Results / case studies**: horizontal snap carousel with animated outcome counters and a filterable grid.
- **Client stories**: auto-playing testimonial carousel with fade-through and avatar rail.
- **Insights**: magazine layout — featured article hero, category tabs, reading-time badges, related posts, reading progress bar.
- **Ogiek / pro bono feature band**: editorial callout with the International Lawyers Project links, image treatment, and a soft-blue background.
- **Micro-interactions throughout**: scroll-reveal on every section, magnetic buttons, gradient hairline dividers, count-up stats, hover-lift cards, page transitions, `prefers-reduced-motion` respected everywhere.
- **Mobile**: full-screen animated nav drawer, swipeable carousels, sticky call/WhatsApp bar, 44px tap targets, no horizontal overflow at 320px.

## 3. Site-wide search

- ⌘K / `/` command palette (cmdk, already installed) plus a visible search button in the header and a search field on mobile.
- Indexes practice areas, blog posts, FAQ entries, glossary terms, checklists and static pages from a single generated index module.
- Fuzzy match, grouped results with icons, keyboard navigation, recent searches, empty-state suggestions.

## 4. Domain, SEO and redirects (omwendwa.com)

- Swap every `omwendwa.lovable.app` reference to `https://omwendwa.com` — canonical in `index.html`, per-route canonicals via `SEOHead`, `og:url`, JSON-LD `@id`s, sitemap, robots.
- Regenerate `public/sitemap.xml` from the live route table (all 17 practice areas + all posts), no fabricated `lastmod`.
- JSON-LD refresh: LegalService/Organization + WebSite sitewide, `WebSite` SearchAction for the new search, `BreadcrumbList` + `Article` per insight, `Service` per practice area — all naming O. Mwendwa & Company Advocates, founded March 2026, Ochielmwendwa@gmail.com.
- **301s for legacy paths** — `/ochiel*`, `/services/*` → `/practice-areas/*`, `/blog/*` → `/insights/*`, `/team` → `/about`, `/areas/*`, `/practice/*`:
  - `vercel.json` `redirects` (real 301s on Vercel).
  - A React `LegacyRedirect` route so the same paths also resolve correctly on Lovable hosting, which ignores `vercel.json`.
- Note: Lovable's own hosting cannot issue server 301s; the client-side route covers it there, and Vercel gets true 301 status codes.

## 5. Vercel production readiness

- Verify `vercel.json` (framework, build command, SPA rewrite, cache + security headers) still matches, and add the redirect block.
- Clean `bun run build`, check bundle size, lazy-load route chunks and heavy images, `loading="lazy"` + width/height on all imagery.
- No env vars required (fully static, no backend) — confirmed and documented in README.
- Lighthouse-minded pass: font preconnect, image dimensions, contrast check on the new palette.

## 6. Audit sweep

Re-scan pages, components, data files and metadata for: "Ochiel" in UI copy, "Rachael", pre-2026 founding claims, old domain strings, and any leftover legal-template references — fix all.

## Technical notes

Files touched: `src/index.css`, `tailwind.config.ts`, `index.html`, `vercel.json`, `public/sitemap.xml`, `public/robots.txt`, `src/App.tsx` (search provider + legacy redirects), `src/components/*` (header, hero, spotlight, carousels, new `SiteSearch`, `MegaMenu`, `SearchIndex`), all `src/pages/*`, `src/data/*`. No backend, no new dependencies beyond fonts.
