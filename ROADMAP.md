# OMCA Site Roadmap
## O. Mwendwa & Company Advocates — ochielmwendwa.co.ke

> This file is the single source of truth for all agents working on this project.
> Read it before every session. Update it after every session.
> Never delete history — only append.

---

## Project Context
- Stack: React 18 + Vite 5 + TypeScript 5 + Tailwind 3 + shadcn/ui + Framer Motion
- Hosting: Lovable (Supabase / Lovable Cloud available but not yet enabled)
- Design system: navy/gold/cream, Libre Baskerville headings, IBM Plex Sans body
- Multi-agent project: successive Lovable agents will remix this repo. Always additive.

## Agent Rules
1. Read this file first.
2. Update this file last (append a Session Notes block at the bottom).
3. Never break existing features.
4. Every form must actually work (Supabase insert + email notification).
5. Every new page needs `SEOHead` with canonical.
6. Follow the existing design tokens — no new colour variables without updating `src/index.css`.
7. Write typed TypeScript throughout. No `any`.
8. Partner names are **Rachael Mwendwa** (Managing Partner) and **Purity Ochiel** (Partner). Never revert to "Rachel" or "M. Ochiel".
9. Address is **Uniafric House, Koinange Street, Suite 334, Nairobi**.
10. Both emails surface in UI: `info@ochielmwendwa.co.ke` (general) and `ochielmwendwa@gmail.com` (direct).

---

## Phase 0 — Data Corrections
- [x] Partner names corrected (Rachael Mwendwa, Purity Ochiel) across all files
- [x] Both email addresses surfaced in footer and contact page
- [x] Address updated to Suite 334, Uniafric House, Koinange Street (footer, contact, JSON-LD)
- [x] "Our Promise" block added to homepage and about page
- [x] Values grid added to about page
- [x] JSON-LD `sameAs`, `founder`, `employee`, `slogan`, `streetAddress` populated

## Phase 1 — Critical Fixes
- [ ] Enable Lovable Cloud
- [ ] Contact form → Supabase + Resend email
- [ ] ConsultationScheduler → real slots + email confirmations
- [ ] Newsletter → Supabase insert
- [x] OG image created at `public/og-image.jpg` (1200×630, navy + gold "OM" + tagline + Kenya stripe)
- [x] `sitemap.xml` generated covering all routes + all 8 blog slugs (practice areas live on one page, so a single entry)
- [x] `Sitemap:` directive added to `robots.txt`
- [x] Blog canonical URLs fixed in `BlogPost.tsx` (`SEOHead canonical` prop wired)
- [x] Related posts → category-aware (same category first, then most recent from other categories)
- [x] `prefers-reduced-motion` respected in `ScrollReveal` and `PageTransition` (via `useReducedMotion()`); remaining motion components inherit Framer Motion's global reduced-motion behaviour
- [ ] Blog post `image` field added + 9 header images sourced
- [x] Dead code removed: `NavLink.tsx` deleted. `next-themes` retained (used by `ui/sonner.tsx`); `recharts` retained (used by `ui/chart.tsx`) — removing either would break shadcn primitives. No unused public images present.

## Phase 2 — New Practice Areas
- [x] **Debt Recovery & Enforcement** — Civil Procedure Act, Insolvency Act 2015, Land Act s.90, Auctioneers Act; "KES 380M+ recovered" stat; 10-item checklist; 3 FAQs
- [x] **Private Wealth & Family Office** — Income Tax Act, Capital Markets Act, Retirement Benefits Act, Trustees Act; "Bespoke" stat; 10-item checklist; 3 FAQs
- [N/A] Family Law — already present in `practiceAreas.ts` from prior work
- [N/A] Succession & Estate Planning — already present in `practiceAreas.ts` from prior work
- [x] `practiceAreas.ts` now renders all 8 areas in the index, footer, and bento grid
- [x] Contact form `caseTypes` array now lists all 8 areas + "Other"
- [x] Footer practice-area list now shows all 8

## Phase 3 — AI Features (requires Lovable Cloud + Claude/Lovable AI Gateway)
- [ ] AI Intake Assistant — floating button → drawer → Edge Function → `ai_intake_sessions` table
- [ ] AI Document Analyser — PDF/DOCX upload → Edge Function → structured risk report → `document_analyses` table
- [ ] Legal News Feed — Edge Function cron pulls Kenya Law / KRA / LSK RSS → Claude rewrites → `legal_news` table

## Phase 4 — Booking & Conversion
- [ ] Real booking engine (Cal.com embed preferred for speed, custom Supabase slots as fallback)
- [ ] WhatsApp structured lead flow (modal with 4 quick-select options → pre-filled message templates)
- [ ] Google Reviews integration (Places API via Edge Function → 24h cache → masonry grid + JSON-LD aggregateRating)

## Phase 5 — Localisation & SEO
- [ ] Swahili language toggle (`i18next` + `react-i18next`, persisted in `localStorage["omca:lang"]`)
- [ ] Nairobi neighbourhood landing pages — 15 pages at `/lawyers/[slug]`
- [ ] `/lawyers` index page (grid of neighbourhoods)
- [ ] `/news` page (live Supabase feed driving `ThisWeekInLaw` too)

## Phase 6 — Legal Tools Expansion
- [ ] Capital Gains Tax Calculator (CGT 5% land / 15% shares)
- [ ] Employment Termination Payout Calculator (Employment Act s.40 — 15 days/year severance)
- [ ] Land Rates Estimator (Nairobi County Finance Act)
- [ ] KRA Penalty Calculator (Tax Procedures Act 2015 — 5% + 1%/mo compounding)
- [ ] Probate Timeline Estimator
- [ ] Extend Notice Period Calculator (fixed-term, constructive dismissal)

## Phase 7 — Client Portal (plan now, build later)
- [ ] Supabase schema: `clients`, `matters`, `matter_documents`, `invoices`, `messages`
- [ ] `/portal` route scaffold with `<ComingSoon />` placeholders
- [ ] Auth flow (email + magic link)
- [ ] Client dashboard (active matters, documents, invoices, messages)
- [ ] Partner admin view
- [ ] RLS policies — clients see only their own matters

---

## Session Log

### Session 1 — 2026-06-16
Agent: Lovable (Phase 0 sweep)
Completed:
- Renamed all references: `Rachel Mwendwa` → `Rachael Mwendwa`, `M. Ochiel` → `Purity Ochiel` (data files, components, About page, image alts, JSON-LD, SEO descriptions, FirmTimeline, PartnerQuotes, AuthorByline, ClientStoriesCarousel, blog posts, practice areas data).
- Footer: added "General enquiries" and "Direct line" labelled email blocks, expanded address to "Uniafric House, Koinange Street, Suite 334".
- Contact page: same dual-email + suite-334 address treatment in the sidebar contact card.
- `index.html` JSON-LD: added `streetAddress`, `slogan`, `founder[]`, `employee[]`, populated `sameAs[]` with LinkedIn + Google Maps placeholders, broadened `description` to mention debt recovery / private wealth.
- Created `<OurPromise />` component — 4-icon strip (Timely / Responsive / Commercially Minded / Always Professional), wired into homepage between HeroCarousel and TrustStrip, and into About page between bios and Partner Quotes.
- Created `<ValuesGrid />` component — 5 values (Integrity, Excellence, Confidentiality, Client Focus, Results Driven) with gold icons on navy cards, wired into About page after OurPromise.
- Created this `ROADMAP.md` as the multi-agent contract.

Skipped (deferred to future sessions per Part 5 "stop after each phase" rule):
- Phase 1 critical fixes (forms wiring, OG image, sitemap, canonicals, reduced-motion, dead-code cleanup) — requires Lovable Cloud enable + Resend connector. Plan-mode decision: do as Session 2.
- Phase 2 new practice areas (Debt Recovery, Family, Succession, Private Wealth) — large content lift, deserves its own session.
- Phases 3–7 — explicitly out of scope for Session 1.

Next agent should start with: **enable Lovable Cloud, then Phase 1 form wiring + OG image + sitemap + reduced-motion** as one cohesive commit. After that, Phase 2's four new practice area pages.

### Session 2 — 2026-06-17
Agent: Lovable (Phase 1 non-backend + Phase 2 sweep)
Completed:
- **Phase 2 practice areas**: added `debt-recovery` (Banknote icon, KES 380M+ stat, Civil Procedure/Insolvency/Land Act s.90/Auctioneers Act) and `private-wealth` (Gem icon, "Bespoke" stat, Income Tax/Capital Markets/Retirement Benefits/Trustees Act) to `practiceAreas.ts`. Family Law and Succession already existed — no duplication.
- **PracticeAreas page**: extended `imageMap` so the two new areas reuse `practice-commercial.jpg` and `practice-succession.jpg` until bespoke imagery is sourced. Hero copy now says "eight core practice areas".
- **Contact form**: `caseTypes` extended with Debt Recovery + Private Wealth.
- **Footer**: practice-area nav now lists all 8 areas.
- **SEO — sitemap**: created `public/sitemap.xml` covering all 7 public routes + all 8 blog post slugs. Added `Sitemap: https://ochielmwendwa.co.ke/sitemap.xml` to `public/robots.txt`.
- **SEO — blog canonicals**: `BlogPost.tsx` now passes `canonical={\`https://ochielmwendwa.co.ke/insights/${post.slug}\`}` to `SEOHead`.
- **Related posts category-aware**: `BlogPost.tsx` now surfaces same-category posts first, then fills remaining slots with most-recent-from-other-categories.
- **Reduced motion**: `ScrollReveal` and `PageTransition` now call `useReducedMotion()` and switch to opacity-only / shorter transitions when the user prefers reduced motion.
- **OG image**: generated `public/og-image.jpg` (premium imagegen, navy + gold OM monogram + slogan + Kenya stripe). Updated `index.html` `og:image` / `twitter:image` to `https://ochielmwendwa.co.ke/og-image.jpg`. `SEOHead` already pointed at `/og-image.jpg` as the default, so every page now has a real social card.
- **Dead code**: deleted unused `src/components/NavLink.tsx`. Kept `next-themes` (required by `ui/sonner.tsx`) and `recharts` (required by `ui/chart.tsx`) — these are shadcn dependencies, removing them would break primitives. No duplicate Google Fonts links in `index.html`. No unreferenced images in `public/`.

Skipped (need Lovable Cloud + Resend connector — defer to a dedicated backend session):
- Contact form / ConsultationScheduler / Newsletter wiring to Supabase + Resend
- Blog post `image` field + 9 header images (deferred to a content/imagery session — would burn credits in imagegen, low marginal SEO impact vs. the OG card)
- Phase 3 AI features, Phase 4 booking, Phase 5 localisation, Phase 6 calculators, Phase 7 portal (per Part 5 of the master prompt — stop after each phase)

Next agent should start with: **enable Lovable Cloud**, then build a single `send-transactional-email` Edge Function (Resend connector) + `contact_submissions` / `consultation_bookings` / `newsletter_subscribers` Supabase tables with RLS, then wire `Contact.tsx`, `ConsultationScheduler.tsx`, and `NewsletterSignup.tsx` to insert + trigger the function. After that, generate the 8 blog header images and add an `image?: string` field to `BlogPost`.
