# Next Sweep — 5 Credits of High-Impact Polish

The site has strong bones now (hero carousel, decision trees, templates, scheduler, checklists, FAQ). The remaining gaps are conversion plumbing, trust/credibility signals, and a few content surfaces that still feel thin. This sweep is 100% frontend and tightens what's already there.

---

## 1. Conversion & Trust Layer
- **Trust strip** under the hero: SCAK admission, years active (3), bar number placeholder, confidentiality badge, retainer-friendly note — small icons, navy/gold.
- **Exit-intent / scroll-triggered mini-modal** (desktop only, once per session) offering the free "Do I Have a Case?" check with a soft dismiss.
- **Inline "Talk to a partner in 24 hrs" CTA card** repeated at the bottom of Practice Areas, Results, and Insights with WhatsApp + Call + Schedule buttons.
- **Testimonial trust bar**: 3 short pull-quotes + star rating + "Verified client" tag, placed above the footer site-wide.

## 2. Results Page Depth
- **Outcome metrics dashboard** at the top: animated counters for "KES recovered", "Cases resolved", "KRA disputes won", "Years active: 3" — tied to existing AnimatedCounter.
- **Case study detail modal**: clicking any filtered case opens a modal with Situation / Action / Outcome / Lesson — no new routes, just dialog.
- **Pro bono spotlight expansion**: turn the existing ProBono section into a tabbed view (Access to Justice / Community Education / Legal Aid Clinics) with 2-3 anonymised stories.

## 3. Insights / Blog Finishing
- **Newsletter signup card** (frontend-only, stores to localStorage + success toast) at the end of every blog post and on the Insights index.
- **"Read next" recommendation strip** under each blog post (3 related by category).
- **Estimated read time** badges on every post card (auto-calculated from word count).
- **Author byline block** at top of each post with partner photo + 1-line credential.

## 4. Legal Tools — Two New Mini-Tools
- **Stamp Duty Calculator** (Kenya rates: 4% urban / 2% rural land, 1% shares) — inputs → result + "Get formal valuation" CTA.
- **Employment Notice Period Estimator** — role + length of service → statutory notice + severance estimate + CTA.
- Both as small cards in the existing Legal Tools grid.

## 5. About Page Humanisation
- **Timeline component**: "Our 3-Year Journey" — 2022 founding, 2023 first major KRA win, 2024 pro bono launch, 2025 digital practice expansion, 2026 today.
- **"In the press / speaking" placeholder strip** (3 logo/event cards, marked as illustrative).
- **Values grid** (4 cards): Modern Practice, Plain-Language Counsel, Pro Bono Commitment, Tech-Forward.

## 6. Site-wide Polish
- **404 page redesign** with on-brand illustration + 4 popular destinations.
- **Footer enrichment**: add quick links to top 3 blog posts, top 3 practice areas, office hours, and a small "Built by Munuve Tech" credit (already there — verify hyperlink).
- **Skeleton loaders** on routes that fetch nothing yet (preps for backend later, removes layout shift).
- **Reduced-motion respect**: gate framer-motion animations behind `prefers-reduced-motion`.

---

## Technical Notes
- All frontend, no Cloud/Supabase activation in this sweep.
- New components: `TrustStrip`, `ExitIntentModal`, `TalkToPartnerCTA`, `OutcomeMetrics`, `CaseStudyModal`, `NewsletterSignup`, `RelatedPosts`, `AuthorByline`, `StampDutyCalculator`, `NoticePeriodCalculator`, `FirmTimeline`, `ValuesGrid`.
- Reuse existing tokens (navy/gold/cream), AnimatedCounter, ScrollReveal, framer-motion.
- Newsletter + exit-intent persist to localStorage only.
- Verify mobile breakpoints on every new component; nothing new in the sticky mobile CTA bar.

## Build Order
1. Trust strip + site-wide testimonial bar + Talk-to-Partner CTA card
2. Results: outcome metrics + case study modal + pro bono tabs
3. Blog: newsletter, related posts, read time, author byline
4. Two new legal calculators
5. About timeline + values grid + 404 redesign + footer polish + reduced-motion pass
