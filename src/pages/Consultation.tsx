import { ShieldCheck, Clock, FileText, MessageSquare } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import ConsultationIntake from "@/components/ConsultationIntake";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";

const assurances = [
  { icon: Clock, title: "Confirmed in 4 business hours", text: "A person reads every request — no auto-responder limbo." },
  { icon: ShieldCheck, title: "Privileged & protected", text: "Advocate–client privilege applies, and we handle data under the Data Protection Act 2019." },
  { icon: FileText, title: "You leave with next steps", text: "Even a first call ends with a plain-language view of your position and options." },
  { icon: MessageSquare, title: "Straight answers on cost", text: "We tell you what a matter is likely to cost before you commit to anything." },
];

const Consultation = () => (
  <>
    <SEOHead
      title="Book a Consultation — O. Mwendwa & Company Advocates"
      description="Book a confidential consultation with O. Mwendwa & Company Advocates. Choose your practice area, share a short case summary, and pick a time that suits you."
      canonical="https://omwendwa.com/consultation"
    />

    <section className="bg-background pt-28 pb-12 lg:pt-36 lg:pb-14">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Consultation</span>
          </div>
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Book a <span className="text-gold-gradient">confidential consultation</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Four short steps: choose your practice area, tell us what happened, pick a time, and we confirm. The first
            30 minutes are complimentary for new clients.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-card py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <ConsultationIntake />
      </div>
    </section>

    <section className="bg-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((a, i) => {
            const Icon = a.icon;
            return (
              <ScrollReveal key={a.title} delay={i * 0.07}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>

    <TalkToPartnerCTA
      heading="Prefer to just talk it through?"
      subheading="Call or WhatsApp us and we'll tell you, plainly, whether and how we can help."
    />
  </>
);

export default Consultation;
