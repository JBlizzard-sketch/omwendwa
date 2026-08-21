import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Scale } from "lucide-react";

const sections = [
  {
    heading: "1. Acceptance",
    body: [
      "By accessing omwendwa.com you agree to these terms of use. If you do not accept them, please do not use the site.",
    ],
  },
  {
    heading: "2. No advocate–client relationship",
    body: [
      "The content on this website is general information about Kenyan law and about our firm. It is not legal advice, and reading it does not create an advocate–client relationship. That relationship begins only when we have completed our conflict and identification checks and both parties have signed a written engagement letter.",
      "Do not send confidential or time-sensitive material through the website forms before we have confirmed an engagement.",
    ],
  },
  {
    heading: "3. Tools, calculators and checklists",
    body: [
      "The calculators, compliance checkers, checklists and quizzes on this site produce indicative results based on the information you enter and on the law as we understood it at the time of publication. They do not account for the facts of your matter and must not be relied upon as a substitute for advice from an advocate.",
    ],
  },
  {
    heading: "4. Accuracy and updates",
    body: [
      "Kenyan law changes frequently. While we take care to keep this site current, we make no warranty that its content is complete, accurate or up to date, and we accept no liability for any loss arising from reliance on it.",
    ],
  },
  {
    heading: "5. Intellectual property",
    body: [
      "All text, design, graphics and downloadable reports on this site belong to O. Mwendwa & Company Advocates unless stated otherwise. You may read, print and share them for personal, non-commercial use with attribution. Any other reproduction requires our written permission.",
    ],
  },
  {
    heading: "6. Third-party links",
    body: [
      "We link to external resources — including legislation, court judgments and partner organisations — for convenience. We do not control and are not responsible for the content of those sites.",
    ],
  },
  {
    heading: "7. Professional regulation",
    body: [
      "O. Mwendwa & Company Advocates is a firm of advocates regulated by the Law Society of Kenya and subject to the Advocates Act (Cap. 16) and the Law Society of Kenya's professional conduct rules. Complaints about our service may be raised with us directly at Ochielmwendwa@gmail.com and, if unresolved, with the Advocates Complaints Commission.",
    ],
  },
  {
    heading: "8. Data protection",
    body: [
      "We process personal data in compliance with the Data Protection Act, 2019. See our Privacy Notice for full detail on what we collect, why, and the rights available to you.",
    ],
  },
  {
    heading: "9. Governing law",
    body: [
      "These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
];

const TermsOfUse = () => (
  <>
    <SEOHead
      title="Terms of Use — O. Mwendwa & Company Advocates"
      description="Terms governing use of the O. Mwendwa & Company Advocates website, including the limits of the information and legal tools published here."
    />

    <section className="bg-background pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Terms of <span className="text-gold-gradient">Use</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The ground rules for using this website, and the limits of what you'll find on it.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary">
            <Scale className="h-4 w-4" /> Last updated {new Date().toLocaleDateString("en-KE", { month: "long", year: "numeric" })}
          </div>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-card py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <ScrollReveal key={s.heading}>
              <article className="rounded-xl border border-border bg-background p-6 lg:p-8">
                <h2 className="font-heading text-xl font-bold text-foreground">{s.heading}</h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default TermsOfUse;
