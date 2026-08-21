export type OutcomeType =
  | "Litigation win"
  | "Negotiated settlement"
  | "Regulatory clearance"
  | "Transaction closed"
  | "Precedent set";

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  caseType?: string;
  year?: string;
  outcome?: OutcomeType;
}

export interface CaseStudy {
  title: string;
  category: string;
  industry: string;
  outcomeType: OutcomeType;
  year: string;
  challenge: string;
  approach: string;
  outcome: string;
  lesson?: string;
}


export const testimonials: Testimonial[] = [
  {
    name: "James K.",
    role: "CEO, Nairobi-based Manufacturing Company",
    content: "O. Mwendwa & Company restructured our entire tax compliance framework after we received a KRA demand notice. Not only did they successfully challenge the assessment, but they put systems in place that have kept us fully compliant ever since. Professional, thorough, and genuinely invested in our success.",
    rating: 5,
    caseType: "Tax dispute — KRA assessment",
    year: "2026",
    outcome: "Regulatory clearance"
  },
  {
    name: "Margaret W.",
    role: "Property Developer, Mombasa",
    content: "When a boundary dispute threatened to derail a major development project, Rachel Mwendwa and her team acted swiftly. They secured an injunction within 48 hours and ultimately resolved the matter through mediation, saving us months of litigation. Their knowledge of land law is exceptional.",
    rating: 5,
    caseType: "Land & boundary dispute",
    year: "2026",
    outcome: "Negotiated settlement"
  },
  {
    name: "David O.",
    role: "Family Client",
    content: "Going through a divorce is never easy, but having O. Mwendwa on my side made the process as bearable as it could be. They handled custody arrangements with sensitivity and ensured a fair property division. I felt heard and protected throughout.",
    rating: 5,
    caseType: "Divorce, custody & property",
    year: "2026",
    outcome: "Negotiated settlement"
  },
  {
    name: "Susan M.",
    role: "Director, NGO",
    content: "We engaged the firm to review our governance structures and ensure compliance with the PBO Act. Their recommendations were practical and proportionate to our size. They understood that we needed robust governance without unnecessary bureaucracy.",
    rating: 5,
    caseType: "NGO governance & PBO Act",
    year: "2026",
    outcome: "Regulatory clearance"
  },
  {
    name: "Peter N.",
    role: "Heir in Succession Dispute",
    content: "My family's succession matter had been in court for three years before we engaged O. Mwendwa & Company. Within eight months, they negotiated a settlement that was fair to all parties and finally brought closure to a painful chapter. Their patience and legal acumen were remarkable.",
    rating: 5,
    caseType: "Succession dispute",
    year: "2026",
    outcome: "Negotiated settlement"
  },
  {
    name: "Amina H.",
    role: "Startup Founder, Nairobi",
    content: "As a first-time founder, I had no idea how to structure my company for investment. the firm's commercial partner walked me through everything — shareholders' agreements, IP protection, regulatory compliance. They made the complex feel simple. We closed our seed round three months later.",
    rating: 5,
    caseType: "Startup structuring & seed round",
    year: "2026",
    outcome: "Transaction closed"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Multi-Million KES Tax Assessment Reversed",
    category: "Tax Law",
    industry: "Manufacturing",
    outcomeType: "Litigation win",
    year: "2026",
    challenge: "A mid-size manufacturing client received a KES 45 million tax assessment from the KRA based on alleged underreporting of income over a five-year period. The assessment threatened the company's viability.",
    approach: "We conducted a comprehensive audit of the client's financial records, identified errors in the KRA's methodology, and filed detailed objections supported by forensic accounting evidence. When the objection was partially rejected, we escalated to the Tax Appeals Tribunal.",
    outcome: "The Tribunal reduced the assessment by 78%, resulting in a final liability of KES 9.9 million — payable in instalments over 24 months. The client remained operational throughout.",
    lesson: "Most KRA assessments contain methodological errors. A rigorous objection — backed by forensic evidence — is almost always worth filing within the statutory 30-day window."
  },
  {
    title: "Complex Land Dispute Resolved Through Mediation",
    category: "Land Law",
    industry: "Private client / Family",
    outcomeType: "Negotiated settlement",
    year: "2026",
    challenge: "Three siblings inherited a 50-acre parcel in Kiambu County. One sibling had been in occupation for 15 years and claimed adverse possession. The other two sought their share. Court proceedings had stalled for two years.",
    approach: "We proposed court-annexed mediation and worked with a retired judge as mediator. Our team prepared a detailed valuation and proposed a partition plan that accounted for improvements made by the occupying sibling.",
    outcome: "All parties agreed to a mediated settlement within three sessions. The land was subdivided equitably, with the occupying sibling receiving the improved portion and compensating the others from the proceeds of a partial sale.",
    lesson: "Family land disputes rarely benefit from litigation. Mediation preserves relationships and unlocks faster, more durable settlements."
  },
  {
    title: "Corporate Governance Restructuring for Investment Readiness",
    category: "Governance",
    industry: "Agribusiness",
    outcomeType: "Transaction closed",
    year: "2026",
    challenge: "A family-owned agribusiness sought to raise KES 200 million from a private equity fund. Due diligence revealed significant governance gaps including absent board minutes, no shareholder agreement, and commingled personal and company finances.",
    approach: "We designed and implemented a comprehensive governance overhaul: drafted a shareholders' agreement, reconstituted the board with independent directors, established audit and compliance committees, and separated personal and company finances.",
    outcome: "The PE fund completed its investment six months after our engagement. The company has since doubled its revenue and credits its governance reforms as a key factor in its growth.",
    lesson: "Investors don't pay for potential — they pay for clean governance. Building it after term sheets land is twice as expensive as building it before."
  },
  {
    title: "Pro Bono: Ogiek Indigenous Land Rights, Mau Forest",
    category: "Pro Bono",
    industry: "Community / Non-profit",
    outcomeType: "Precedent set",
    year: "2026",
    challenge: "Members of the Ogiek indigenous community faced eviction from ancestral land in the Mau Forest, with allocations issued over territory they have occupied for generations. Hundreds of households were exposed.",
    approach: "Working pro bono alongside the International Lawyers Project, we traced the allocation chain, assembled community testimony and expert evidence, and pressed the indigenous land-rights arguments recognised in the Ogiek jurisprudence before the Environment and Land Court.",
    outcome: "The court nullified the developer's title and ordered restoration of the community's land rights. The case became a precedent for community land protection under the Community Land Act 2016.",
    lesson: "A clean-looking title is not always a clean title. Community land deserves the same forensic title scrutiny as any commercial transaction."
  },
  {
    title: "Wrongful Dismissal Claim Defended for a Tech Employer",
    category: "Employment Law",
    industry: "Technology",
    outcomeType: "Litigation win",
    year: "2026",
    challenge: "A software company faced a claim at the Employment and Labour Relations Court for unfair termination and unpaid dues, with a prayer for twelve months' compensation and reinstatement.",
    approach: "We reconstructed the disciplinary record, demonstrated that a fair hearing had in fact been convened, and led evidence on the performance-management process. Where the paperwork was thin, we conceded early and narrowed the issues to a single head of claim.",
    outcome: "The court declined reinstatement and awarded only one month's pay in lieu of notice — roughly 6% of the amount claimed. The client's disciplinary template was rewritten in the same engagement.",
    lesson: "Kenyan employers rarely lose on the merits. They lose on procedure — the hearing notice, the record, the right to be accompanied."
  },
  {
    title: "Conveyancing: Off-Plan Purchase Rescued from a Defective Title",
    category: "Conveyancing",
    industry: "Real estate",
    outcomeType: "Negotiated settlement",
    year: "2026",
    challenge: "A buyer had paid a 40% deposit on an off-plan apartment before discovering a caveat and an unreleased charge over the mother title.",
    approach: "We froze further payments, opened a discharge negotiation with the chargee bank, and restructured the sale agreement so that the balance was payable only against a clean, registered transfer held in escrow.",
    outcome: "The charge was discharged, the caveat removed, and the transfer registered within four months. Not a shilling of the deposit was lost.",
    lesson: "Never release the balance on an off-plan purchase against a promise. Release it against a registrable, encumbrance-free instrument."
  },
  {
    title: "Cross-Border Advisory on a Debt Governance Reform Programme",
    category: "Policy & Advisory",
    industry: "Public sector / Development",
    outcomeType: "Regulatory clearance",
    year: "2026",
    challenge: "A development partner needed a comparative legal review of public debt authorisation and disclosure rules across several African jurisdictions, delivered to a parliamentary timetable.",
    approach: "We led the Kenyan chapter and coordinated with counterparts working across Mozambique, Botswana, Zimbabwe and the UK, mapping constitutional debt ceilings, approval gateways and disclosure duties into a single comparative framework.",
    outcome: "The review was adopted as a briefing document for legislators and informed proposed amendments to the disclosure regime.",
    lesson: "Comparative work travels furthest when it is written for the committee room, not the seminar room."
  },
  {
    title: "Injunction Secured to Protect a Commercial Lease",
    category: "Commercial Litigation",
    industry: "Retail",
    outcomeType: "Litigation win",
    year: "2026",
    challenge: "A retail tenant was locked out of its premises overnight by a landlord alleging rent arrears that were, in fact, the subject of a live reconciliation.",
    approach: "We filed a certificate of urgency the same day, obtained interim orders restoring possession within 48 hours, and simultaneously opened a without-prejudice reconciliation of the rent account.",
    outcome: "Possession was restored, the arrears were agreed at less than half the sum alleged, and the lease was varied to include a dispute-resolution step before any distress.",
    lesson: "Speed is a legal strategy. In lockout disputes the first 48 hours decide the negotiating position for the next six months."
  }
];


export const firmStats = {
  founded: "March 2026",
  casesHandled: 150,
  successRate: 94,
  clientRetention: 92
};
