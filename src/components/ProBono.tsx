import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Scale, GraduationCap, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "access",
    icon: Scale,
    label: "Access to Justice",
    intro: "Representing individuals and families who cannot afford private legal counsel.",
    stories: [
      {
        title: "Ogiek community — Mau Forest",
        body: "Rachel worked with the Ogiek indigenous community of the Mau Forest through the International Lawyers Project, supporting their fight to defend ancestral land and forest rights.",
        links: [
          { label: "The law is both a shield and a sword", href: "https://www.internationallawyersproject.org/post/the-law-is-both-a-shield-and-a-sword" },
          { label: "I am Ogiek — the Mau Forest is our home", href: "https://www.internationallawyersproject.org/post/i-am-ogiek-we-are-indigenous-people-the-mau-forest-is-our-home-and-we-will-fight-for-it" },
        ],
      },
      {
        title: "Succession dispute — widow & minors",
        body: "Defended a widow and three minor children whose late husband's family attempted to disinherit them. Estate distribution restored under the Law of Succession Act.",
      },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Community Education",
    intro: "Plain-language legal literacy through workshops, blog posts and short guides.",
    stories: [
      {
        title: "Tenants' rights workshops — Eastlands",
        body: "Quarterly free sessions explaining notice periods, deposit recovery and the Distress for Rent Act in everyday language.",
      },
      {
        title: "Plain-language legal guides",
        body: "Free explainers published on this site covering succession, land, employment and tax — written so a non-lawyer can act on them.",
      },
    ],
  },
  {
    id: "clinic",
    icon: Users,
    label: "Legal Aid Clinics",
    intro: "Partnering with the LSK Pro Bono Programme and civil society organisations.",
    stories: [
      {
        title: "LSK Pro Bono Programme",
        body: "Active participant: 30+ hours monthly committed to triage, drafting and representation referred through the LSK roster.",
      },
      {
        title: "SGBV legal support",
        body: "Free advisory referrals for survivors of gender-based violence in partnership with women's rights organisations in Nairobi County.",
      },
    ],
  },
];

const ProBono = () => {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="relative border-t border-border bg-card py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kenya-green/5 via-transparent to-primary/5" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kenya-green/10">
                <Heart className="h-5 w-5 text-kenya-green" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-kenya-green">Giving Back</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Access to Justice <span className="text-gold-gradient">Matters</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Justice should never be a privilege reserved for those who can pay. Our pro bono practice runs across three streams.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-kenya-green/15 text-kenya-green ring-1 ring-kenya-green/30"
                        : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <p className="text-sm italic text-muted-foreground">{current.intro}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {current.stories.map((s) => (
                  <div key={s.title} className="rounded-lg border border-border bg-secondary/30 p-5">
                    <h4 className="font-heading text-base font-bold text-foreground">{s.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    {"links" in s && (s as { links?: { label: string; href: string }[] }).links?.length ? (
                      <div className="mt-3 flex flex-col gap-1.5">
                        {(s as { links?: { label: string; href: string }[] }).links!.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            {l.label} →
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 rounded-lg border border-kenya-green/20 bg-kenya-green/5 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Need pro bono support?</strong> If you or someone you know needs legal help but cannot afford representation,{" "}
                <Link to="/contact" className="text-primary hover:underline">reach out</Link>. All inquiries are confidential.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProBono;
