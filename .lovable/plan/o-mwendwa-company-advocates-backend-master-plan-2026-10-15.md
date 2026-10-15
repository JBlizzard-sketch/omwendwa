# O. Mwendwa & Company Advocates — Backend Master Plan

## Before we start: cost and hosting, honestly

- **Cost:** Lovable Cloud includes a free monthly allowance of about 20 credits for the backend plus 4 for AI on every plan. A small law-firm site usually stays near that. Heavy AI use or a lot of traffic can go over, and anything over the allowance comes out of your normal credits. You can set a spending cap in Workspace settings → Usage limits so you're never surprised.
- **Hosting:** The backend works the same whether people visit through Vercel (omwendwa.com today) or through Lovable later. The site just talks to it, so there's nothing to redo if you move the domain.
- **Building it:** Each phase costs normal build credits. That's why we work in phases.

## Phase 1: Foundation and forms that actually work
1. Turn on Lovable Cloud.
2. Contact form saves every enquiry and emails the firm right away (from the firm's own address once a sending domain is set up).
3. Visitors get an automatic "we received your message" email.
4. Consultation booking: real available times, no double-booking, confirmation and reminder emails 24 hours and 1 hour before.
5. Newsletter sign-up with double opt-in and one-click unsubscribe (Data Protection Act compliant).
6. Spam protection on every form: rate limits, a hidden honeypot field, input checks.
7. Consent records: what each visitor agreed to and when (privacy compliance evidence).

## Phase 2: Private back office (Rachel + invited staff)
1. Secure staff login with email, plus Google sign-in.
2. Roles: Admin (Rachel), Editor, Assistant. Staff join by invitation only.
3. Enquiries inbox: new, contacted, converted, closed, with notes and who it's assigned to.
4. Booking calendar: set working hours, block holidays and court dates, reschedule or cancel.
5. Lead pipeline from first enquiry to retained client, with conversion rates.
6. Activity log of who changed what and when.

## Phase 3: SEO and growth dashboard (your top priority)
1. Google Search Console connection: indexed pages, crawl errors, impressions, clicks, top searches.
2. Our own visitor analytics: page views, where visitors come from (Google, ChatGPT, LinkedIn, WhatsApp), and clicks on every button.
3. Conversion funnel: visit → enquiry → booking → client.
4. Charts over time, with a weekly emailed summary to Rachel.
5. Alerts when a page breaks or drops out of Google.

## Phase 4: Article editor (no more waiting on me)
1. Write, edit, preview and publish articles from the back office.
2. Workflow: draft → review → scheduled → published → updated → archived.
3. Every version saved, with one-click restore.
4. Page addresses never change, so Google rankings are kept. Visible "published" and "last updated" dates.
5. Image uploads with automatic resizing.
6. Sitemap and AI-search files update automatically when you publish.
7. FAQs, tags, series and author per article.

## Phase 5: AI features
1. **"Ask about Kenyan law" assistant:** visitors ask in plain English or Swahili. Answers draw only on the firm's articles, link to them, include a clear "this is not legal advice" notice, and offer "book a consultation".
2. AI intake helper: turns a visitor's story into a tidy case summary for Rachel before the meeting.
3. AI writing help in the editor: outlines, SEO titles, summaries, FAQ ideas. Rachel always approves before anything goes live.
4. Weekly Kenyan legal news digest (Kenya Law, KRA, Gazette) drafted for review, never auto-published.
5. Document first-look: a client uploads a contract and gets a plain-English list of key points and risks, kept private and deleted on a schedule.

## Phase 6: Client portal
1. Clients log in with a secure email link.
2. Their matters, status updates and next steps.
3. Secure document exchange (encrypted storage; clients can only ever see their own files).
4. Private messaging with the firm.
5. Fee notes and payment history.
6. Matter timeline and court dates.

## Phase 7: Payments and practice tools
1. Pay consultation fees online (M-Pesa where possible, cards through Stripe or Paddle).
2. Invoices and receipts emailed automatically.
3. Saved compliance-checker reports stored online, with shareable links that keep working.
4. Matter deadline reminders (limitation periods, filing dates) for staff.

## Phase 8: Trust, reach and compliance
1. Google Reviews pulled in automatically, plus review requests after a matter closes.
2. Swahili version of the site, with translations kept on file.
3. Data Protection Act tools: download-my-data and delete-my-data requests, retention timers.
4. Security: per-user access rules on every record, automatic backups, regular security scans.
5. Error and uptime monitoring with an email alert when something breaks.

## How we proceed
Each phase is its own build session. After this plan is approved I start Phase 1. When it's done, Phase 3 (SEO dashboard) is next, as you asked earlier, followed by the others in order.

## Technical notes
- Lovable Cloud gives us the database, staff logins, file storage and server functions. Vercel or Lovable hosting only serves the pages.
- Every table gets access rules. Staff roles live in a separate table and are checked on the server.
- Emails use Lovable's built-in email sending with a verified firm sending domain.
- AI goes through the Lovable AI Gateway, so there are no outside API keys.
- Search Console, Google Places and payments each need a one-time connection or key, requested when we reach that phase.
- ROADMAP.md is updated after each phase.
