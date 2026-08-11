import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import ScrollReveal from "./ScrollReveal";

const glossaryTerms = [
  { term: "Advocate", definition: "A lawyer admitted to the bar who holds a current practising certificate from the Law Society of Kenya, authorising them to appear in court." },
  { term: "Affidavit", definition: "A written statement confirmed by oath or affirmation, used as evidence in court proceedings." },
  { term: "Arbitration", definition: "A private dispute resolution process where parties agree to have their dispute decided by an independent arbitrator rather than a court." },
  { term: "Bail", definition: "A constitutional right under Article 49 allowing a person accused of a crime to be released from custody pending trial, usually subject to conditions." },
  { term: "Caveat", definition: "A formal notice filed at the lands registry to prevent any dealings with a particular property until the matter is resolved." },
  { term: "Commissioner for Oaths", definition: "A legal professional authorised to administer oaths and witness the signing of statutory declarations and affidavits." },
  { term: "Conveyancing", definition: "The legal process of transferring ownership of land or property from one person to another." },
  { term: "Due Diligence", definition: "A comprehensive investigation or review of a business, property, or legal matter before entering into a transaction." },
  { term: "eTIMS", definition: "Electronic Tax Invoice Management System — KRA's mandatory digital invoicing system for all VAT-registered businesses in Kenya." },
  { term: "Grant of Probate", definition: "A court order authorising the executor named in a will to administer the deceased person's estate." },
  { term: "Injunction", definition: "A court order directing a party to do or refrain from doing a specific act. Can be temporary (interim) or permanent." },
  { term: "Intestacy", definition: "The condition of dying without a valid will. The Law of Succession Act dictates how the estate is distributed." },
  { term: "iTax", definition: "KRA's online tax administration system where taxpayers file returns, make payments, and manage their tax accounts." },
  { term: "Judicial Review", definition: "The process by which courts review decisions of public bodies or government agencies to ensure they are lawful, rational, and procedurally fair." },
  { term: "Letters of Administration", definition: "A court order appointing an administrator to manage the estate of a person who died without a will." },
  { term: "Mediation", definition: "A voluntary dispute resolution process where a neutral third party helps disputing parties reach a mutually acceptable agreement." },
  { term: "Notary Public", definition: "A legal professional authorised to witness signatures, certify documents, and perform notarial acts recognised internationally." },
  { term: "Plaint", definition: "The document that initiates a civil lawsuit in a Kenyan court, setting out the plaintiff's claim against the defendant." },
  { term: "Power of Attorney", definition: "A legal document authorising one person to act on behalf of another in legal, financial, or property matters." },
  { term: "Retainer", definition: "A fee arrangement where a client pays a lawyer in advance for ongoing legal services, ensuring the lawyer's availability." },
  { term: "RLS (Row-Level Security)", definition: "In database terms, a policy that restricts which rows a user can access. In legal context, used in data protection compliance." },
  { term: "Succession", definition: "The legal process of inheriting and distributing a deceased person's estate, governed by the Law of Succession Act." },
  { term: "Title Deed", definition: "A legal document that proves ownership of land or property in Kenya. Should always be verified through an official search at the lands registry." },
  { term: "Tort", definition: "A civil wrong that causes harm or loss to another person, giving rise to a claim for damages (e.g., negligence, defamation)." },
  { term: "Winding Up", definition: "The legal process of dissolving a company, selling its assets, paying creditors, and distributing any remaining funds to shareholders." },
];

const LegalGlossary = () => {
  const [search, setSearch] = useState("");

  const filtered = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Kenyan Law <span className="text-gold-gradient">Glossary</span>
              </h2>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Common legal terms explained in plain language. Understanding these terms will help you navigate the Kenyan legal system with confidence.
            </p>
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search terms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.term} delay={i * 0.03}>
                <div className="rounded-lg border border-border bg-card px-5 py-4">
                  <dt className="font-heading text-sm font-bold text-foreground">{item.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.definition}</dd>
                </div>
              </ScrollReveal>
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">No terms match your search.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalGlossary;
