import { Award, BookOpen, Globe, Scale, Zap, Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import rachelImg from "@/assets/rachel-mwendwa.jpg";
import teamImg from "@/assets/team-meeting.jpg";
import ProBono from "@/components/ProBono";
import PartnerQuotes from "@/components/PartnerQuotes";
import FirmTimeline from "@/components/FirmTimeline";
import OurPromise from "@/components/OurPromise";
import ValuesGrid from "@/components/ValuesGrid";


const About = () => (
  <>
    <SEOHead
      title="About the Firm — Our Advocates & Story"
      description="Learn about O. Mwendwa & Company Advocates, a Nairobi law firm founded on integrity, clarity, and results. Meet Managing Partner Rachael Mwendwa and our partnership."
    />

    {/* Hero */}
    <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">About the Firm</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Modern Law. <span className="text-gold-gradient">Real Results.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Founded in March 2026, O. Mwendwa & Company Advocates is a new-generation law firm based in Nairobi, Kenya. In a rapidly evolving legal landscape, we bring fresh perspective, modern thinking, and rigorous expertise — reflecting today's realities, not outdated dogma.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Team Image */}
    <section className="bg-card">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="overflow-hidden rounded-lg border border-border">
            <img
              src={teamImg}
              alt="O. Mwendwa & Company Advocates team in consultation"
              className="w-full h-64 lg:h-96 object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Edge / Differentiator */}
    <section className="bg-card py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Why We're <span className="text-gold-gradient">Different</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Kenya's legal profession is evolving. Clients deserve advocates who understand the intersection of law, technology, and modern business. That's who we are.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Zap, title: "Modern Approach", desc: "We leverage technology, data-driven insights, and contemporary legal thinking. No dusty precedent worship — just sharp, effective advocacy tailored to today's world." },
            { icon: Scale, title: "Rigorous Expertise", desc: "Dedicated practice across our core areas since March 2026, supported by international training and professional networks spanning the ICC, LCIA, and beyond." },
            { icon: Globe, title: "International Perspective", desc: "Our partners' international experience — from Oslo to Addis Ababa — gives us a global lens on Kenyan law. We understand how local decisions connect to international frameworks." },
            { icon: BookOpen, title: "Prevention First", desc: "We prioritise keeping clients out of disputes. Our advisory work is designed to structure your affairs correctly from the start, saving you time, money, and stress." },
            { icon: Users, title: "Client-Centric", desc: "Every client — whether a multinational or a first-time homebuyer — receives the same level of strategic attention and professional commitment. That's our promise." },
            { icon: Award, title: "Thought Leadership", desc: "We don't just practise law — we shape the conversation. Our advocates publish, speak, and contribute to legal discourse across Kenya and the continent." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="hover-lift surface-elevated h-full rounded-xl border border-border p-6 lg:p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* Partners */}
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
            Our <span className="text-gold-gradient">Partners</span>
          </h2>
        </ScrollReveal>

        {/* Rachael Mwendwa */}
        <ScrollReveal>
          <div className="mb-16 grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border">
                <img
                  src={rachelImg}
                  alt="Rachael Mwendwa — Managing Partner, O. Mwendwa & Company Advocates"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Managing Partner</span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-3xl">Rachael Mwendwa</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Rachael Mwendwa holds a Bachelor of Laws (LLB) from the University of Nairobi and a Post-Graduate Diploma from the Kenya School of Law. She is an Advocate of the High Court of Kenya, a Commissioner for Oaths, a Notary Public, and a member of the Law Society of Kenya.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Before co-founding the firm, Rac gained significant international experience. She served as a Legal Intern at the Institute for Law and Environmental Governance (ILEG) and the International Livestock Research Institute (ILRI). She also worked with the African Forum and Network on Debt and Development (AFRODAD) on debt governance across Africa, and contributed to the International Law and Policy Institute (ILP) in Oslo, Norway, on fisheries governance. She has consulted for the United Nations Environment Programme (UNEP) on environmental law matters.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A distinguished moot court competitor, Rac was a Grand Finalist at the Africa Human Rights Moot Court Competition, a National Finalist at the Phillip C. Jessup International Moot Court Competition (Kenya Rounds), and has competed in the East African Moot Court Competition. She has authored publications on environmental law, international governance, and fisheries policy, and has been invited to speak at international conferences in Nairobi, Oslo, and Cape Town.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["LSK Member", "Commissioner for Oaths", "Notary Public", "ICC YAF", "LCIA YIAG", "YICCA", "Environmental Law", "Land Law", "UNEP Consultant"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* The Partner (private profile) */}
        <ScrollReveal>
          <div className="rounded-lg border border-border bg-secondary/30 p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-border bg-gradient-to-br from-secondary to-card">
                  <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/50">
                      <span className="font-heading text-3xl font-bold text-primary">OM</span>
                    </div>
                    <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">The Partnership</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Partner</span>
                <h3 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
                  Commercial, Tax &amp; Corporate Governance
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The firm's second partner is an Advocate of the High Court of Kenya, a Commissioner for Oaths, and a member of the Law Society of Kenya, with a practice centred on commercial law, corporate governance, and tax advisory.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A MAC-accredited mediator and member of the Chartered Institute of Arbitrators (Kenya Branch), our Partner has advised clients from technology startups to established manufacturers, and has argued matters before the Tax Appeals Tribunal and the Commercial Division of the High Court.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  By preference, our Partner keeps a private public profile and works behind the scenes on client mandates. Instructions, correspondence, and client relationships are led by the Managing Partner.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["LSK Member", "Commissioner for Oaths", "CIArb Member", "MAC Certified Mediator", "Commercial Law", "Tax Advisory", "Corporate Governance"].map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Our Promise */}
    <OurPromise />

    {/* Values */}
    <ValuesGrid />

    {/* Partner Quotes */}
    <PartnerQuotes />

    {/* Timeline */}
    <FirmTimeline />

    {/* Pro Bono */}
    <ProBono />




    {/* Affiliations */}
    <section className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <h3 className="mb-8 font-heading text-xl font-bold text-foreground">Professional Affiliations</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: "Law Society of Kenya (LSK)", badge: "LSK" },
              { name: "ICC Young Arbitrators Forum (YAF)", badge: "ICC" },
              { name: "LCIA Young International Arbitration Group", badge: "LCIA" },
              { name: "Chartered Institute of Arbitrators (CIArb)", badge: "CIArb" },
              { name: "Young ICCA", badge: "YICCA" },
              { name: "East African Law Society", badge: "EALS" },
            ].map((aff) => (
              <div key={aff.name} className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-[7px] font-bold text-primary">{aff.badge}</span>
                </div>
                {aff.name}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default About;
