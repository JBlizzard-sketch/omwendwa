export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface CaseStudy {
  title: string;
  category: string;
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
    rating: 5
  },
  {
    name: "Margaret W.",
    role: "Property Developer, Mombasa",
    content: "When a boundary dispute threatened to derail a major development project, Rachael Mwendwa and her team acted swiftly. They secured an injunction within 48 hours and ultimately resolved the matter through mediation, saving us months of litigation. Their knowledge of land law is exceptional.",
    rating: 5
  },
  {
    name: "David O.",
    role: "Family Client",
    content: "Going through a divorce is never easy, but having O. Mwendwa on my side made the process as bearable as it could be. They handled custody arrangements with sensitivity and ensured a fair property division. I felt heard and protected throughout.",
    rating: 5
  },
  {
    name: "Susan M.",
    role: "Director, NGO",
    content: "We engaged the firm to review our governance structures and ensure compliance with the PBO Act. Their recommendations were practical and proportionate to our size. They understood that we needed robust governance without unnecessary bureaucracy.",
    rating: 5
  },
  {
    name: "Peter N.",
    role: "Heir in Succession Dispute",
    content: "My family's succession matter had been in court for three years before we engaged O. Mwendwa & Company. Within eight months, they negotiated a settlement that was fair to all parties and finally brought closure to a painful chapter. Their patience and legal acumen were remarkable.",
    rating: 5
  },
  {
    name: "Amina H.",
    role: "Startup Founder, Nairobi",
    content: "As a first-time founder, I had no idea how to structure my company for investment. the firm's commercial partner walked me through everything — shareholders' agreements, IP protection, regulatory compliance. They made the complex feel simple. We closed our seed round three months later.",
    rating: 5
  }
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Multi-Million KES Tax Assessment Reversed",
    category: "Tax Law",
    challenge: "A mid-size manufacturing client received a KES 45 million tax assessment from the KRA based on alleged underreporting of income over a five-year period. The assessment threatened the company's viability.",
    approach: "We conducted a comprehensive audit of the client's financial records, identified errors in the KRA's methodology, and filed detailed objections supported by forensic accounting evidence. When the objection was partially rejected, we escalated to the Tax Appeals Tribunal.",
    outcome: "The Tribunal reduced the assessment by 78%, resulting in a final liability of KES 9.9 million — payable in instalments over 24 months. The client remained operational throughout.",
    lesson: "Most KRA assessments contain methodological errors. A rigorous objection — backed by forensic evidence — is almost always worth filing within the statutory 30-day window."
  },
  {
    title: "Complex Land Dispute Resolved Through Mediation",
    category: "Land Law",
    challenge: "Three siblings inherited a 50-acre parcel in Kiambu County. One sibling had been in occupation for 15 years and claimed adverse possession. The other two sought their share. Court proceedings had stalled for two years.",
    approach: "We proposed court-annexed mediation and worked with a retired judge as mediator. Our team prepared a detailed valuation and proposed a partition plan that accounted for improvements made by the occupying sibling.",
    outcome: "All parties agreed to a mediated settlement within three sessions. The land was subdivided equitably, with the occupying sibling receiving the improved portion and compensating the others from the proceeds of a partial sale.",
    lesson: "Family land disputes rarely benefit from litigation. Mediation preserves relationships and unlocks faster, more durable settlements."
  },
  {
    title: "Corporate Governance Restructuring for Investment Readiness",
    category: "Governance",
    challenge: "A family-owned agribusiness sought to raise KES 200 million from a private equity fund. Due diligence revealed significant governance gaps including absent board minutes, no shareholder agreement, and commingled personal and company finances.",
    approach: "We designed and implemented a comprehensive governance overhaul: drafted a shareholders' agreement, reconstituted the board with independent directors, established audit and compliance committees, and separated personal and company finances.",
    outcome: "The PE fund completed its investment six months after our engagement. The company has since doubled its revenue and credits its governance reforms as a key factor in its growth.",
    lesson: "Investors don't pay for potential — they pay for clean governance. Building it after term sheets land is twice as expensive as building it before."
  },
  {
    title: "Pro Bono: Community Land Rights Protection",
    category: "Pro Bono",
    challenge: "A rural community in Kajiado County faced displacement from ancestral grazing land after a private developer obtained title documents of questionable provenance. Over 200 families were affected.",
    approach: "Acting pro bono, our team investigated the title chain, filed a petition at the Environment and Land Court, and obtained an injunction preventing further development. We worked with the National Land Commission to investigate the irregular allocation.",
    outcome: "The court nullified the developer's title and ordered restoration of the community's land rights. The case became a precedent for community land protection under the Community Land Act 2016.",
    lesson: "A clean-looking title is not always a clean title. Community land deserves the same forensic title scrutiny as any commercial transaction."
  }
];


export const firmStats = {
  yearsExperience: 3,
  casesHandled: 150,
  successRate: 94,
  clientRetention: 92
};
