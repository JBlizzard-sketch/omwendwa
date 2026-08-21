import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    heading: "1. Who we are",
    body: [
      "O. Mwendwa & Company Advocates ('the firm', 'we', 'us') is a law firm registered in Kenya with offices at Uniafric House, Koinange Street, Suite 334, Nairobi. We are the data controller in respect of the personal data described in this notice.",
      "Questions about this notice, or any request relating to your personal data, may be sent to Ochielmwendwa@gmail.com or +254 796 759 632.",
    ],
  },
  {
    heading: "2. The law we follow",
    body: [
      "We process personal data in compliance with the Data Protection Act, 2019 (Kenya), the Data Protection (General) Regulations, 2021, and guidance issued by the Office of the Data Protection Commissioner (ODPC). We also observe the confidentiality duties imposed on advocates by the Advocates Act and the Law Society of Kenya's professional conduct rules.",
    ],
  },
  {
    heading: "3. What we collect",
    body: [
      "Identity and contact data: your name, email address, telephone number and postal address.",
      "Matter data: the facts, documents and correspondence you share with us so that we can advise or represent you.",
      "Compliance data: identification documents and source-of-funds information collected to meet anti-money-laundering and know-your-client obligations.",
      "Website data: pages visited, approximate location, device and browser information, and anything you type into our contact, consultation or newsletter forms.",
    ],
  },
  {
    heading: "4. Why we process it",
    body: [
      "To provide legal advice and representation under our retainer with you (performance of a contract).",
      "To respond to enquiries, book consultations and send updates you have asked for (consent or legitimate interest).",
      "To comply with legal, regulatory, tax and court obligations (legal obligation).",
      "To run, secure and improve our website and services (legitimate interest).",
    ],
  },
  {
    heading: "5. Advocate–client privilege",
    body: [
      "Information you share with us in the course of seeking or receiving legal advice is protected by advocate–client privilege and by our professional duty of confidentiality. We do not disclose privileged information to third parties except where you instruct us to, or where disclosure is compelled by law or a court of competent jurisdiction.",
    ],
  },
  {
    heading: "6. Who we share data with",
    body: [
      "Counsel, experts, process servers and other professionals instructed on your matter; courts, tribunals and regulators where required; and vetted service providers who host our email, website and document systems. We do not sell personal data, and we do not share it for advertising purposes.",
    ],
  },
  {
    heading: "7. Transfers outside Kenya",
    body: [
      "Some of our technology providers store data outside Kenya. Where that happens we satisfy ourselves that appropriate safeguards are in place, as required by sections 48 and 49 of the Data Protection Act, 2019.",
    ],
  },
  {
    heading: "8. How long we keep it",
    body: [
      "Client files are retained for a minimum of seven years after a matter closes, in line with professional and statutory requirements. Enquiry and marketing data is kept for two years from your last interaction with us, unless you ask us to delete it sooner.",
    ],
  },
  {
    heading: "9. Your rights",
    body: [
      "Under the Data Protection Act, 2019 you may request access to your personal data; ask us to correct or delete it; object to or request restriction of processing; withdraw consent at any time; and request a copy of your data in a portable format. You also have the right to lodge a complaint with the Office of the Data Protection Commissioner.",
      "To exercise any of these rights, email Ochielmwendwa@gmail.com. We respond within the statutory timelines and will not charge you for a routine request.",
    ],
  },
  {
    heading: "10. Security and changes to this notice",
    body: [
      "We apply access controls, encryption in transit, and confidentiality undertakings across the firm to keep your information safe. This notice may be updated from time to time; the date below records the latest revision.",
    ],
  },
];

const PrivacyNotice = () => (
  <>
    <SEOHead
      title="Privacy Notice — O. Mwendwa & Company Advocates"
      description="How O. Mwendwa & Company Advocates collects, uses and protects personal data in compliance with Kenya's Data Protection Act, 2019."
    />

    <section className="bg-background pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Privacy <span className="text-gold-gradient">Notice</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            How we collect, use and safeguard your personal data — written plainly, and in full compliance with the Data Protection Act, 2019.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary">
            <ShieldCheck className="h-4 w-4" /> Last updated {new Date().toLocaleDateString("en-KE", { month: "long", year: "numeric" })}
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

export default PrivacyNotice;
