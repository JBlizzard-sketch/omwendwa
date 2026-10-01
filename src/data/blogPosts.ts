export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  metaDescription: string;
  /** Optional FAQs rendered on the article and published as FAQPage structured data. */
  faqs?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    faqs: [
      {
        q: "Which businesses now pay Digital Services Tax in Kenya?",
        a: "Digital Services Tax applies at 1.5% of gross transaction value. It previously covered only non-resident digital service providers, but now also applies to resident companies offering digital marketplace services — online marketplaces, payment platforms and digital intermediaries.",
      },
      {
        q: "What is the withholding tax rate on professional fees?",
        a: "Withholding tax on professional fees paid to resident persons moved from 5% to 7.5%. This covers legal fees, consultancy payments and management fees. Cross-border service payments are withheld at 20%, subject to relief under an applicable Double Taxation Agreement.",
      },
      {
        q: "How often must my business file tax returns now?",
        a: "The Kenya Revenue Authority requires quarterly digital tax filings for registered businesses, replacing the previous annual filing cycle for SMEs. Companies with turnover below KES 50 million also benefit from a graduated corporate tax rate starting at 15%.",
      },
    ],
    slug: "kenya-new-tax-laws-2026",
    title: "Understanding Kenya's New Tax Laws: What Businesses Need to Know in 2026",
    excerpt: "The Finance Act 2025 introduced sweeping changes to corporate and individual tax obligations. Here's what every Kenyan business must do to stay compliant.",
    category: "Kenyan Law Updates",
    date: "2026-04-10",
    readTime: "8 min read",
    metaDescription: "Expert analysis of Kenya's Finance Act 2025 tax changes. Learn what new tax obligations apply to your business and how to stay compliant.",
    content: `Kenya's Finance Act 2025 brought significant reforms to the country's tax framework, affecting businesses of all sizes. As we move into 2026, understanding these changes is not optional — it is a legal obligation.

## Key Changes to Corporate Tax

The Act introduced a revised corporate tax rate structure for small and medium enterprises. Companies with annual turnover below KES 50 million now benefit from a graduated tax rate, starting at 15% for the first KES 10 million and scaling to the standard 30% rate.

However, this relief comes with enhanced reporting requirements. The Kenya Revenue Authority (KRA) now mandates quarterly digital tax filings for all registered businesses, replacing the previous annual filing cycle for SMEs.

## Digital Services Tax Expansion

Perhaps the most impactful change is the expansion of the Digital Services Tax (DST). Previously limited to non-resident digital service providers, the DST now applies to resident companies offering digital marketplace services. The rate remains at 1.5% of gross transaction value.

**What this means for your business:** If you operate any form of online marketplace, payment platform, or digital intermediary service, you are now subject to DST regardless of your physical location within Kenya.

## Withholding Tax Adjustments

Withholding tax rates on professional fees have been adjusted from 5% to 7.5% for payments to resident persons. This affects legal fees, consultancy payments, and management fees.

For businesses engaging international contractors, the withholding tax on cross-border service payments has increased to 20%, with limited relief available under existing Double Taxation Agreements.

## Compliance Timeline

The KRA has set the following compliance deadlines:
- **Q1 2026:** All businesses must register for the iTax 3.0 platform
- **March 2026:** First quarterly filing under the new regime
- **June 2026:** Deadline for DST registration for affected digital businesses
- **December 2026:** Full transition to electronic tax invoicing (eTIMS) for all VAT-registered persons

## How We Can Help

At O. Mwendwa & Company Advocates, our tax advisory team works with businesses to ensure full compliance with these new obligations. From restructuring your tax position to representing you before the Tax Appeals Tribunal, we provide end-to-end tax support.

**Don't wait for a KRA audit to discover gaps in your compliance.** Contact us today for a confidential tax health check.`
  },
  {
    faqs: [
      {
        q: "What does a surviving spouse inherit if there is no will in Kenya?",
        a: "Under intestate succession, the surviving spouse takes the deceased's personal and household effects absolutely, plus a life interest in the remainder of the estate. The children share the residuary estate equally.",
      },
      {
        q: "Do my children inherit equally under Kenyan law?",
        a: "Yes. Under intestate succession the children share equally in the residuary estate, subject to the surviving spouse's life interest in it.",
      },
    ],
    slug: "succession-planning-kenyan-law",
    title: "A Complete Guide to Succession Planning Under Kenyan Law",
    excerpt: "Dying without a will in Kenya can leave your family in a costly legal battle. Learn how the Law of Succession Act protects — and limits — your estate wishes.",
    category: "Legal Guides",
    date: "2026-04-05",
    readTime: "10 min read",
    metaDescription: "Complete guide to succession and estate planning under Kenya's Law of Succession Act. Understand wills, intestacy, and how to protect your family's inheritance.",
    content: `Every adult Kenyan with assets — however modest — needs a succession plan. The Law of Succession Act (Cap 160) governs how property is distributed upon death, and the consequences of failing to plan can be devastating for your loved ones.

## Testate vs. Intestate Succession

When a person dies having made a valid will, their estate is distributed according to its terms (testate succession). When no will exists, the law dictates distribution through a rigid formula (intestate succession).

Under intestate succession, the surviving spouse is entitled to the personal and household effects of the deceased absolutely, plus a life interest in the remainder of the estate. Children share equally in the residuary estate.

## What Makes a Will Valid in Kenya?

A valid will under Kenyan law must meet these requirements:
1. **The testator must be at least 18 years old** and of sound mind
2. **The will must be in writing** — oral wills are only valid for members of the Kenya Defence Forces on active duty
3. **It must be signed** by the testator in the presence of at least two witnesses
4. **Witnesses must also sign** in the presence of the testator and each other
5. The witnesses must not be beneficiaries under the will

A common mistake is having a spouse witness the will. This renders any gift to that spouse void.

## Dependants' Claims

Even with a valid will, Kenyan law allows dependants to challenge the distribution. Under Section 26 of the Act, a court may order reasonable provision for a dependant who has been excluded or inadequately provided for.

Dependants include:
- The surviving spouse (or spouses, in polygamous marriages)
- Children of the deceased (including adopted children)
- Parents who were being maintained by the deceased
- Any person who was being maintained by the deceased immediately prior to death

## The Role of the Court

All succession matters in Kenya are handled by the High Court (or Kadhis' Court for Muslims). The process involves:
1. Filing a Petition for Grant of Probate (with a will) or Letters of Administration (without)
2. Publishing a gazette notice
3. Waiting for any objections (typically 30 days)
4. Court hearing and issuance of the Grant
5. Confirmation of the Grant after six months

This process typically takes 12-18 months, though contested matters can take considerably longer.

## Protecting Your Estate

We advise our clients to take these steps:
- **Draft a comprehensive will** that accounts for all assets including digital assets and insurance policies
- **Review your will every 3-5 years** or after major life events
- **Consider a trust** for complex estates or minor beneficiaries
- **Maintain clear records** of all assets and liabilities
- **Communicate your wishes** to your family to reduce the likelihood of disputes

## Our Succession Practice

O. Mwendwa & Company Advocates has extensive experience in succession matters, from will drafting to contested probate proceedings. We understand the emotional weight of these matters and handle every case with the sensitivity it deserves.`
  },
  {
    slug: "commercial-disputes-adr-vs-litigation-kenya",
    title: "Navigating Commercial Disputes: ADR vs. Litigation in Kenya",
    excerpt: "When a business deal goes wrong, you have options. Understanding when to negotiate, mediate, arbitrate, or litigate can save your company millions.",
    category: "Commentary",
    date: "2026-03-28",
    readTime: "7 min read",
    metaDescription: "ADR vs litigation in Kenya: expert guide on mediation, arbitration, and court proceedings for commercial disputes. Choose the right path for your business.",
    content: `Commercial disputes are inevitable in business. The question is not whether a dispute will arise, but how you will resolve it. Kenya's legal framework offers multiple pathways, and choosing the right one can mean the difference between a swift resolution and years of costly litigation.

## The ADR Landscape in Kenya

Alternative Dispute Resolution (ADR) gained constitutional recognition under Article 159(2)(c) of the Constitution of Kenya 2010, which directs courts to promote ADR mechanisms including reconciliation, mediation, arbitration, and traditional dispute resolution.

The Nairobi Centre for International Arbitration (NCIA), established under the Nairobi Centre for International Arbitration Act 2013, has positioned Kenya as East Africa's premier arbitration hub.

## Mediation: The First Line of Resolution

Mediation involves a neutral third party facilitating negotiation between disputing parties. It is:
- **Cost-effective:** Typically 10-20% of litigation costs
- **Fast:** Most mediations conclude within 1-3 days
- **Confidential:** Unlike court proceedings, which are public record
- **Relationship-preserving:** Ideal when ongoing business relationships are at stake

The Court-Annexed Mediation programme, launched as a pilot at the Milimani Commercial Courts, has achieved settlement rates exceeding 60%.

## Arbitration: When You Need a Binding Decision

Arbitration under the Arbitration Act 1995 (as amended in 2023) provides a binding determination by a private tribunal. Key advantages include:
- **Enforceability:** Arbitral awards are enforceable as court judgments
- **Party autonomy:** Parties choose their arbitrators, procedural rules, and venue
- **Expertise:** Complex commercial matters can be decided by industry specialists
- **Finality:** Limited grounds for appeal reduce prolonged uncertainty

However, arbitration can be expensive — arbitrator fees, institutional charges, and venue costs can rival litigation expenses for complex matters.

## Litigation: The Court System

When ADR fails or is inappropriate, Kenya's commercial courts provide a robust forum. The Commercial and Tax Division of the High Court in Nairobi handles business disputes, with a dedicated case management system designed to expedite hearings.

Recent reforms have introduced:
- Mandatory pre-trial mediation screening
- Electronic filing through the Judiciary's e-filing system
- Virtual hearings for interlocutory applications
- Case management conferences to set strict timelines

## Choosing the Right Path

| Factor | Mediation | Arbitration | Litigation |
|--------|-----------|-------------|------------|
| Cost | Low | Medium-High | High |
| Duration | Days-Weeks | Months | Years |
| Confidentiality | Yes | Yes | No |
| Enforceability | By agreement | As judgment | Full |
| Precedent value | None | Limited | Yes |

## Our Recommendation

At O. Mwendwa & Company, we always explore ADR options before recommending litigation. Our dispute resolution team includes trained mediators and experienced arbitration counsel who can guide you to the most efficient resolution path.

**Facing a commercial dispute?** Don't let it escalate. Early legal advice can save significant time and resources.`
  },
  {
    slug: "divorce-rights-kenya-custody-property",
    title: "Your Rights in a Kenyan Divorce: Custody, Maintenance & Property",
    excerpt: "Divorce is never easy, but knowing your legal rights under the Marriage Act 2014 and the Matrimonial Property Act 2013 can protect you and your children.",
    category: "Legal Guides",
    date: "2026-03-20",
    readTime: "9 min read",
    metaDescription: "Understanding your rights in a Kenyan divorce: child custody, spousal maintenance, and matrimonial property division under current Kenyan law.",
    content: `Divorce is one of the most difficult experiences a person can face. At O. Mwendwa & Company, we believe that understanding your legal rights is the first step toward protecting yourself and your children during this challenging time.

## Grounds for Divorce in Kenya

Under the Marriage Act 2014, a court may grant a divorce if it is satisfied that the marriage has broken down irretrievably. The petitioner must prove one or more of the following:
- **Adultery** by the respondent
- **Cruelty** — physical or mental
- **Desertion** for at least three years
- **Exceptional depravity** (including habitual drunkenness, drug addiction, or persistent criminal behaviour)

There is no concept of "no-fault" divorce in Kenya — at least one ground must be established.

## Child Custody and Access

The Children Act 2022 (which replaced the 2001 Act) places the **best interests of the child** as the paramount consideration in all custody decisions. Courts consider:
- The child's age and wishes (if old enough to express them)
- Each parent's capacity to provide
- The child's emotional and educational needs
- Any history of domestic violence
- The importance of maintaining sibling relationships

Joint custody is increasingly favoured by Kenyan courts, reflecting a growing recognition that children benefit from meaningful relationships with both parents.

## Spousal Maintenance

Either spouse may apply for maintenance during or after divorce proceedings. Courts consider:
- The income and earning capacity of both parties
- The standard of living during the marriage
- The age and health of each spouse
- The duration of the marriage
- Contributions to the marriage (including domestic contributions)

Maintenance orders can be periodic or lump-sum, and they can be varied if circumstances change significantly.

## Matrimonial Property Division

The Matrimonial Property Act 2013 governs the division of property acquired during the marriage. Key principles include:
- **Ownership follows contribution:** Each spouse is entitled to a share proportional to their contribution
- **Contribution is broadly defined:** It includes monetary contributions, non-monetary contributions (domestic work, childcare), and contribution to the management of matrimonial property
- **The matrimonial home** receives special protection — it cannot be disposed of without both spouses' consent

The landmark Supreme Court decision in *Federation of Women Lawyers (FIDA-K) & Others v Attorney General* affirmed that domestic contributions must be given real weight in property division.

## Practical Steps

If you are considering divorce:
1. **Document everything** — financial records, property documents, evidence of grounds
2. **Seek legal advice early** — before making any major decisions
3. **Protect your children** — avoid using them as bargaining tools
4. **Consider mediation** — court-annexed mediation has excellent outcomes in family matters
5. **Secure your finances** — open individual accounts if necessary

## Our Family Law Practice

Our family law team handles divorce, custody, and property matters with the discretion and sensitivity they require. We understand that behind every case file is a family in transition, and we are committed to achieving outcomes that protect our clients' rights while minimising conflict.`
  },
  {
    slug: "corporate-governance-kenyan-smes",
    title: "Corporate Governance Best Practices for Kenyan SMEs",
    excerpt: "Good governance isn't just for listed companies. Here's how Kenyan SMEs can build structures that attract investors, reduce risk, and ensure long-term growth.",
    category: "Commentary",
    date: "2026-03-15",
    readTime: "6 min read",
    metaDescription: "Corporate governance best practices for Kenyan SMEs. Build investor-ready structures, ensure compliance, and reduce business risk with proper governance.",
    content: `Many Kenyan small and medium enterprises treat corporate governance as a concern only for large corporations or publicly listed companies. This is a costly misconception. Good governance is the foundation of sustainable business growth, and its absence is the single greatest risk factor for SME failure.

## Why Governance Matters for SMEs

The Companies Act 2015 imposes governance obligations on all registered companies, regardless of size. Beyond legal compliance, proper governance:
- **Attracts investment:** Investors and lenders assess governance structures before committing capital
- **Reduces fraud risk:** Clear separation of duties and oversight mechanisms protect company assets
- **Improves decision-making:** Structured processes lead to better outcomes
- **Ensures succession:** Governance frameworks survive individual directors and shareholders

## Essential Governance Structures

### Board of Directors
Even for small companies, a functional board is essential. Consider:
- Appointing at least one independent director
- Establishing clear terms of reference for the board
- Scheduling regular board meetings (at least quarterly)
- Maintaining proper minutes and records

### Company Secretary
Under the Companies Act 2015, every company must appoint a company secretary within six months of incorporation. The secretary is responsible for:
- Maintaining statutory registers
- Filing annual returns with the Registrar of Companies
- Advising the board on compliance matters
- Managing corporate records

### Financial Controls
At minimum, every SME should implement:
- Separation of financial authorisation and payment functions
- Regular bank reconciliations
- Annual audited accounts (mandatory for companies with turnover above KES 50 million)
- Budget approval processes

## Common Governance Failures

In our practice, we frequently encounter these issues:
1. **Mixing personal and company finances** — this can pierce the corporate veil and expose directors to personal liability
2. **Failure to hold AGMs** — mandatory under the Act, with penalties for non-compliance
3. **Inadequate record-keeping** — makes due diligence impossible when seeking investment or sale
4. **Related party transactions** without proper disclosure — creates legal and tax exposure
5. **Absence of shareholder agreements** — leads to deadlock and disputes

## Building a Governance Framework

We recommend a phased approach:

**Phase 1 (Immediate):**
- Review and update Articles of Association
- Appoint a company secretary
- Establish a board meeting calendar
- Implement basic financial controls

**Phase 2 (3-6 months):**
- Draft a shareholders' agreement
- Create a conflict of interest policy
- Implement a related party transaction policy
- Review all existing contracts and compliance obligations

**Phase 3 (6-12 months):**
- Consider board committee structures (audit, remuneration)
- Develop a risk management framework
- Create a succession plan for key personnel
- Review insurance coverage

## How We Help

O. Mwendwa & Company advises SMEs across Kenya on governance structures that are proportionate, practical, and effective. We don't believe in one-size-fits-all solutions — we tailor our advice to your company's size, sector, and growth aspirations.`
  },
  {
    slug: "land-disputes-kenya-property-owners",
    title: "Land Disputes in Kenya: What Every Property Owner Must Know",
    excerpt: "Land is Kenya's most contested asset. From historical injustices to modern fraud, here's how to protect your property rights under current Kenyan law.",
    category: "Case Analysis",
    date: "2026-03-08",
    readTime: "8 min read",
    metaDescription: "Protect your property rights in Kenya. Expert guide on land disputes, title fraud, adverse possession, and how to safeguard your land under Kenyan law.",
    content: `Land disputes remain Kenya's most litigated category of cases, accounting for an estimated 30% of all civil matters before the Environment and Land Court. The reasons are deeply rooted in history, but the solutions lie in understanding current law and taking proactive steps to protect your rights.

## The Legal Framework

Kenya's land law was fundamentally reformed by the Constitution 2010 and the subsequent Land Act 2012, Land Registration Act 2012, and National Land Commission Act 2012. These laws established:
- **Three categories of land:** public, community, and private
- **The National Land Commission** as an oversight body
- **A unified land registration system** replacing the multiple registries that previously existed
- **Constitutional limits** on land ownership by non-citizens

## Common Types of Land Disputes

### Title Fraud
Despite digitisation efforts, title fraud remains prevalent. Common schemes include:
- Forged transfer documents
- Fraudulent subdivision of already-sold plots
- Impersonation of registered owners
- Corrupt alteration of land registry records

**Protection measures:** Conduct thorough due diligence before any land transaction. Verify titles at the land registry, confirm the seller's identity, and engage an advocate to conduct an official search.

### Boundary Disputes
These often arise from:
- Inaccurate survey maps
- Encroachment by neighbours
- Conflicting community boundaries
- Development near shared boundaries

The Survey Act and the Land Adjudication Act provide mechanisms for resolving boundary disputes through the office of the Director of Surveys.

### Adverse Possession
Under the Limitation of Actions Act, a person who occupies land continuously and without the owner's permission for 12 years may claim ownership through adverse possession. This is a real risk for absentee landowners.

**Key requirements:**
- Occupation must be actual, open, and continuous
- It must be without the owner's consent
- The occupier must treat the land as their own

### Succession-Related Land Disputes
Many land disputes arise from contested inheritance, particularly:
- Customary land held without formal registration
- Disputes among co-heirs
- Claims by dependants excluded from a will
- Community land succession under customary law

## The Environment and Land Court

All land disputes in Kenya are heard by the Environment and Land Court (ELC), established under Article 162(2)(b) of the Constitution. The ELC has jurisdiction over:
- Land disputes
- Environmental matters
- Title disputes
- Compulsory acquisition
- Land use planning disputes

Appeals from the ELC go to the Court of Appeal.

## Protecting Your Land

We advise all property owners to:
1. **Register your land** — unregistered interests are vulnerable
2. **Maintain original title documents** securely
3. **Conduct regular physical inspections** — especially for rural or undeveloped land
4. **Pay land rates and rent** consistently — non-payment can lead to forfeiture
5. **Place cautions or caveats** on your title if you suspect any threat
6. **Keep all transaction records** — sale agreements, receipts, and correspondence

## Our Land Law Practice

Rachel Mwendwa, our Managing Partner, has particular expertise in environmental and land law, including experience with international land governance frameworks. Whether you're facing a boundary dispute, investigating potential title fraud, or navigating a complex succession involving land, our team provides strategic, results-oriented legal representation.`
  }
];

export const blogCategories = ["All", "Kenyan Law Updates", "Legal Guides", "Commentary", "Case Analysis"];

export const newBlogPosts: BlogPost[] = [
  {
    slug: "data-protection-act-kenya-business-compliance-guide",
    title: "Data Protection Act 2019: A Practical Compliance Guide for Kenyan Businesses",
    excerpt: "If your business collects names, phone numbers or ID numbers, the Data Protection Act applies to you. Here is what registration, consent and breach reporting mean in practice.",
    category: "Legal Guides",
    date: "2026-09-24",
    readTime: "7 min read",
    metaDescription: "How Kenya's Data Protection Act 2019 applies to your business: ODPC registration, lawful processing, data subject rights, breach notification within 72 hours and penalties.",
    faqs: [
      { q: "Does my business need to register with the ODPC?", a: "Most businesses that collect and use personal data must register as data controllers or processors with the Office of the Data Protection Commissioner under the 2021 Registration Regulations. Some very small entities are exempt, but many sectors (health, education, finance, hospitality, property) must register regardless of size." },
      { q: "How quickly must a data breach be reported?", a: "Section 43 of the Data Protection Act requires a data controller to notify the Data Protection Commissioner within 72 hours of becoming aware of a breach that poses a real risk of harm, and to inform affected people where appropriate." },
      { q: "What are the penalties for breaching the Act?", a: "The Commissioner can issue enforcement notices and administrative fines of up to KES 5 million or 1% of the previous year's annual turnover, whichever is lower. Affected individuals may also claim compensation." },
    ],
    content: `Kenya's Data Protection Act, 2019 applies to almost every business that handles information about identifiable people — customers, employees, tenants or patients. Compliance is no longer a "nice to have": the Office of the Data Protection Commissioner (ODPC) actively investigates complaints and issues fines.

## Who the Act applies to

The Act applies to **data controllers** (who decide why and how personal data is used) and **data processors** (who handle data on a controller's behalf). If you keep a customer list, run payroll or use CCTV, you are processing personal data.

## Step 1: Register with the ODPC

The Data Protection (Registration of Data Controllers and Data Processors) Regulations, 2021 require most controllers and processors to register. Registration is renewable and the ODPC publishes a list of mandatory sectors.

## Step 2: Have a lawful basis

Under the Act, personal data must be processed lawfully, fairly and transparently, collected for a specific purpose, and kept no longer than necessary. Consent must be freely given and can be withdrawn. Other lawful bases include performance of a contract and legal obligations.

## Step 3: Respect data subject rights

Section 26 gives people the right to be informed, to access their data, to object, and to have false or misleading data corrected or deleted. Build a simple process to respond to these requests.

## Step 4: Plan for breaches

Notify the Commissioner within **72 hours** of becoming aware of a breach that risks harm (section 43). Keep an internal breach register and a response plan.

## Step 5: Contracts and cross-border transfers

Put written data processing terms in place with vendors, and check the safeguards required before transferring data outside Kenya.

## A quick compliance checklist

- ODPC registration certificate current
- Privacy notice on your website and forms
- Consent wording reviewed
- Data processing agreements with suppliers
- Breach response plan and register
- Staff trained on handling personal data

## How we can help

O. Mwendwa & Company Advocates reviews privacy notices, drafts data processing agreements and prepares businesses for ODPC registration and audits. **Book a consultation** to get a tailored compliance plan.`
  },
  {
    slug: "beneficial-ownership-kenya-companies-filing-guide",
    title: "Beneficial Ownership in Kenya: What Every Company Must File",
    excerpt: "Every Kenyan company must know — and disclose — the real people who own or control it. Here is who counts as a beneficial owner and how to stay compliant.",
    category: "Kenyan Law Updates",
    date: "2026-09-17",
    readTime: "5 min read",
    metaDescription: "Kenya beneficial ownership guide: who qualifies under the Companies Act 2015 and 2020 Regulations, what to file with the Business Registration Service, and the risks of non-compliance.",
    faqs: [
      { q: "Who is a beneficial owner of a Kenyan company?", a: "A natural person who ultimately owns or controls the company — for example by holding at least 10% of the shares or voting rights, having the right to appoint or remove a director, or exercising significant influence or control." },
      { q: "Where is beneficial ownership information filed?", a: "Companies keep a register of beneficial owners and lodge a copy with the Registrar of Companies through the Business Registration Service eCitizen portal, and must update it when details change." },
    ],
    content: `Section 93A of the Companies Act, 2015 and the Companies (Beneficial Ownership Information) Regulations, 2020 require every company to identify the real people behind it. Banks, KRA and procurement bodies increasingly check this information before dealing with you.

## Who counts as a beneficial owner?

A beneficial owner is a **natural person** (not a company) who, directly or indirectly:

- holds at least 10% of the issued shares,
- exercises at least 10% of the voting rights,
- holds a right to appoint or remove a director, or
- exercises significant influence or control over the company.

## What you must do

1. Identify every beneficial owner, looking through any corporate shareholders.
2. Keep a register of beneficial owners at the company's office.
3. Lodge a copy with the Registrar through the Business Registration Service portal.
4. File updates when ownership or control changes.

## Why it matters

Missing or inaccurate filings can block company searches, delay bank account openings and tender applications, and expose the company and its officers to penalties. Clean records also make due diligence faster when you raise capital or sell the business.

## How we can help

We trace ownership chains, prepare registers and handle filings on eCitizen. **Book a consultation** for a beneficial ownership health check.`
  },
  {
    slug: "buying-land-kenya-due-diligence-checklist",
    title: "Buying Land in Kenya: A Due Diligence Checklist Before You Pay",
    excerpt: "Most land fraud is preventable. These are the checks to run before you sign a sale agreement or hand over a deposit.",
    category: "Legal Guides",
    date: "2026-09-10",
    readTime: "7 min read",
    metaDescription: "Step-by-step due diligence for buying land in Kenya: official search, survey maps, Land Control Board consent, rates clearance, stamp duty and safe payment of the purchase price.",
    faqs: [
      { q: "How much is stamp duty on land in Kenya?", a: "Stamp duty on transfer of land is generally 4% of the value for property within a municipality and 2% for property outside one, based on the government valuation." },
      { q: "When is Land Control Board consent needed?", a: "Under the Land Control Act, consent of the local Land Control Board is required for sales, leases and subdivisions of agricultural land in controlled areas. A transaction without consent within the required period can become void." },
      { q: "Should I pay the full price before transfer?", a: "No. The safest practice is to pay a deposit on signing and hold the balance with the advocates, released only once the transfer is registered in your name." },
    ],
    content: `Land is the biggest purchase most Kenyans make — and the most common target for fraud. A careful due diligence process, led by an advocate, protects your money.

## 1. Official search

Run an official search at the land registry or on ArdhiSasa where available. Confirm the registered owner, the size of the land, and any charges, cautions or restrictions on the title.

## 2. Verify the seller

Match the seller's national ID and KRA PIN to the title. For companies, run a company search and confirm who can sign. For land held by a deceased person, insist on a confirmed grant of letters of administration.

## 3. Survey and site visit

Obtain the registry index map, engage a licensed surveyor to confirm beacons, and visit the land. Speak to neighbours and the local administration about any disputes or occupants.

## 4. Planning and rates

Check zoning and approved use with the county, and obtain a rates clearance certificate and land rent clearance (for leaseholds).

## 5. Consents

Agricultural land usually needs **Land Control Board consent** under the Land Control Act. Leaseholds may need the lessor's consent. Spousal consent may be required for matrimonial property under the Land Registration Act, 2012.

## 6. Sale agreement and payment

Use a written agreement that follows the Law Society Conditions of Sale. Pay a deposit, hold the balance with advocates, and release it only on registration of the transfer.

## 7. Stamp duty and registration

After valuation, pay stamp duty (4% in municipalities, 2% elsewhere) and lodge the transfer for registration. Collect the new title in your name.

## How we can help

Our conveyancing team handles searches, consents, agreements and registration end-to-end. **Book a consultation** before you pay any deposit.`
  },
  {
    slug: "debt-recovery-kenya-small-claims-court-guide",
    title: "Recovering Debts in Kenya: Demand Letters, Small Claims Court and Beyond",
    excerpt: "Unpaid invoices drain cash flow. Here is the fastest lawful route to getting paid, from a demand letter to the Small Claims Court and enforcement.",
    category: "Legal Guides",
    date: "2026-09-03",
    readTime: "6 min read",
    metaDescription: "How to recover debts in Kenya: demand letters, the Small Claims Court (claims up to KES 1 million), High Court suits, and enforcing judgments through attachment and garnishee orders.",
    faqs: [
      { q: "What is the limit of the Small Claims Court?", a: "The Small Claims Court handles civil claims of up to KES 1 million, including unpaid goods and services, contracts and money lent, and aims to determine matters within 60 days of filing." },
      { q: "How long do I have to sue for a debt?", a: "Under the Limitation of Actions Act, claims founded on contract generally must be filed within six years from when the debt fell due." },
    ],
    content: `Debt recovery works best when it is quick, documented and escalated in steps. Kenyan law gives creditors effective tools — if they are used correctly.

## Step 1: Gather your evidence

Collect the contract or LPO, invoices, delivery notes, statements and any message where the debtor acknowledges the debt.

## Step 2: Send a formal demand letter

An advocate's demand letter sets a clear deadline and warns of court action. Many debts are paid or settled at this stage, and the letter is useful evidence if you later claim costs.

## Step 3: Choose the right forum

- **Small Claims Court** — claims up to **KES 1 million** under the Small Claims Court Act, 2016. Procedure is simple and matters are meant to be decided within 60 days.
- **Magistrates' Courts and High Court** — larger or more complex claims, including those needing summary judgment.
- **Arbitration or mediation** — where your contract requires it.

## Step 4: Enforce the judgment

A judgment is only useful if enforced. Options include attachment and sale of movable property through auctioneers, garnishee orders against the debtor's bank account, and, for companies, insolvency proceedings under the Insolvency Act, 2015.

## Watch the time limit

Contract debts generally become time-barred six years after they fall due under the Limitation of Actions Act. Do not wait.

## How we can help

We send demand letters, file and argue claims, and drive enforcement — with litigation at the heart of our practice. **Book a consultation** to start recovering what you are owed.`
  },
  {
    slug: "employment-law-kenyan-workers-rights",
    title: "Employment Law: What Every Kenyan Worker Must Know",
    excerpt: "From unfair dismissal to unpaid overtime, Kenyan employment law provides strong protections for workers. Here's what you need to know to protect your rights.",
    category: "Legal Guides",
    date: "2026-04-12",
    readTime: "9 min read",
    metaDescription: "Complete guide to employment rights in Kenya. Understand unfair dismissal, overtime, leave entitlements, and how the Employment Act 2007 protects workers.",
    content: `Kenya's Employment Act 2007 is one of the most comprehensive pieces of labour legislation in East Africa. Yet many workers — and employers — remain unaware of its key provisions. This guide covers everything you need to know about your rights in the Kenyan workplace.

## Your Fundamental Employment Rights

Under Kenyan law, every employee is entitled to:
- **A written contract** specifying terms of employment (Section 9)
- **Minimum wage** as gazetted by the Minister (varies by sector and location)
- **A safe working environment** compliant with the Occupational Safety and Health Act 2007
- **Freedom from discrimination** based on race, sex, pregnancy, marital status, HIV status, disability, or religion (Section 5)

## Working Hours and Overtime

The Act sets clear limits on working hours:
- Maximum of **52 hours per week** for most employees
- Maximum of **60 hours per week** for night workers
- Overtime must be compensated at **1.5 times the normal hourly rate** on regular days and **2 times** on public holidays

Many employers violate these provisions. If you're regularly working beyond these limits without overtime pay, you have a valid claim.

## Leave Entitlements

Your statutory leave entitlements include:
- **Annual leave:** 21 working days per year after 12 consecutive months of service
- **Sick leave:** 7 days with full pay and 7 days with half pay per year
- **Maternity leave:** 3 months with full pay (for mothers)
- **Paternity leave:** 2 weeks with full pay (for fathers)
- **Public holidays:** All gazetted public holidays are paid days off

## Termination and Unfair Dismissal

This is where most disputes arise. Key protections include:

**Notice period:** Either party must give at least:
- 1 month for monthly-paid employees
- 2 weeks for fortnightly-paid employees
- End of day for daily-paid employees

**Fair procedure:** Before termination, an employer must:
- Notify the employee of the reason
- Give the employee an opportunity to respond (a "hearing")
- Consider the employee's response before making a decision

**Unfair termination:** Dismissal is unfair if it's based on pregnancy, union membership, filing a complaint, or if proper procedure wasn't followed. Remedies include reinstatement or compensation of up to 12 months' salary.

## How to Protect Yourself

1. **Keep copies** of your employment contract and all pay slips
2. **Document everything** — any disputes, verbal warnings, or workplace issues
3. **Know your NSSF, NHIF, and housing levy deductions** — verify your employer is remitting them
4. **Don't sign termination documents** without legal advice
5. **File complaints** with the Labour Officer if your rights are violated

## When to Seek Legal Help

Contact an employment lawyer if:
- You've been dismissed without a hearing
- Your employer owes you unpaid wages or overtime
- You're experiencing workplace discrimination or harassment
- You're being asked to sign a settlement agreement

At O. Mwendwa & Company, we represent both employees and employers in employment disputes. Our approach is always to seek efficient resolution, whether through negotiation, mediation, or litigation at the Employment and Labour Relations Court.`
  },
  {
    slug: "starting-business-kenya-legal-checklist-2026",
    title: "Starting a Business in Kenya: Legal Checklist for 2026",
    excerpt: "From company registration to tax compliance, here's every legal step you need to follow when starting a business in Kenya in 2026.",
    category: "Legal Guides",
    date: "2026-04-08",
    readTime: "11 min read",
    metaDescription: "Complete legal checklist for starting a business in Kenya in 2026. Company registration, licenses, tax compliance, employment law, and more.",
    content: `Starting a business in Kenya has never been more straightforward — but the regulatory requirements have also never been more complex. This checklist covers every legal step you need to take to launch a compliant, investor-ready business in 2026.

## Step 1: Choose Your Business Structure

Kenya offers several business structures:

**Sole Proprietorship**
- Simplest form, registered under the Registration of Business Names Act
- No separate legal entity — you're personally liable for all debts
- Best for: freelancers, small traders, and individual consultants

**Partnership**
- Two or more persons carrying on business together for profit
- Partners are jointly and severally liable
- Must have a partnership agreement (strongly recommended)

**Limited Liability Company**
- Separate legal entity from its owners
- Shareholder liability limited to their share capital
- Most common structure for growing businesses
- Governed by the Companies Act 2015

**Limited Liability Partnership (LLP)**
- Hybrid structure combining partnership flexibility with limited liability
- Popular with professional firms

## Step 2: Register Your Company

For a limited company:
1. **Reserve your company name** with the Registrar of Companies (eCitizen portal)
2. **Prepare constitutional documents** — Memorandum and Articles of Association
3. **File incorporation documents** with the Companies Registry
4. **Receive your Certificate of Incorporation** (takes 3-7 business days)

## Step 3: Tax Registration

Within 30 days of commencing business:
- **Register for a KRA PIN** (mandatory for all businesses)
- **Register for VAT** if annual turnover exceeds or is expected to exceed KES 5 million
- **Register for PAYE** if you employ staff
- **Register on iTax 3.0** (the new mandatory platform as of 2026)
- **Register for eTIMS** if you're VAT-registered (electronic invoicing is now mandatory)

## Step 4: Obtain Necessary Licenses and Permits

Depending on your business type:
- **Single Business Permit** from your county government
- **Sector-specific licenses** (e.g., CBK license for financial services, KEBS certification for manufacturing, Tourism Fund levy for hospitality)
- **Public health permits** for food and beverage businesses
- **NEMA license** for businesses with environmental impact
- **Fire safety certificate** from the county fire department

## Step 5: Employment Law Compliance

If hiring employees:
- Draft compliant employment contracts (Employment Act 2007)
- Register with NSSF, NHIF, and the Housing Fund
- Comply with the Occupational Safety and Health Act
- Display mandatory workplace notices
- Maintain proper employee records

## Step 6: Data Protection

The Data Protection Act 2019 requires all businesses that collect personal data to:
- Register with the Office of the Data Protection Commissioner
- Appoint a Data Protection Officer (if processing large volumes of personal data)
- Implement data protection policies and procedures
- Obtain informed consent before collecting personal data

## Step 7: Intellectual Property Protection

Protect your business assets:
- **Trademark** your business name, logo, and brand elements (Kenya Industrial Property Institute)
- **Register copyrights** for original creative works
- **Consider patents** if your business involves inventions

## Step 8: Ongoing Compliance

Annual obligations include:
- Filing annual returns with the Registrar of Companies
- Filing quarterly tax returns with KRA
- Conducting annual audits (if turnover exceeds KES 50 million)
- Holding Annual General Meetings
- Maintaining statutory registers (directors, shareholders, charges)

## Common Mistakes to Avoid

1. **Mixing personal and business finances** — opens you to personal liability
2. **Operating without proper licenses** — penalties and potential closure
3. **Ignoring tax obligations** — KRA penalties compound quickly
4. **Not having written contracts** with suppliers, clients, and employees
5. **Skipping data protection registration** — fines of up to KES 5 million

## How We Can Help

At O. Mwendwa & Company, we've helped dozens of entrepreneurs navigate the legal requirements of starting a business in Kenya. From incorporation to tax registration to governance setup, we provide practical, cost-effective legal support that lets you focus on growing your business.

**Starting a business? Let's make sure you start right.** Book a consultation today.`
  },
];

// Merge for export
blogPosts.push(...newBlogPosts);
