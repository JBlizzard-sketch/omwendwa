export interface ComplianceQuestion {
  id: string;
  question: string;
  /** Why it matters — shown under the question */
  why: string;
  /** Statute or regulator reference */
  authority: string;
  /** Action added to the tailored checklist when the answer is "No" */
  action: string;
  weight: number;
}

export interface ComplianceChecker {
  id: string;
  service: string;
  title: string;
  blurb: string;
  questions: ComplianceQuestion[];
}

export const complianceCheckers: ComplianceChecker[] = [
  {
    id: "tax",
    service: "Tax",
    title: "KRA Tax Compliance Check",
    blurb: "For companies and sole proprietors filing in Kenya.",
    questions: [
      {
        id: "pin",
        question: "Is your KRA PIN active with a valid Tax Compliance Certificate?",
        why: "A lapsed TCC blocks tenders, work permits, and most public contracts.",
        authority: "Tax Procedures Act 2015",
        action: "Apply for or renew your Tax Compliance Certificate on iTax and clear any blocking liabilities.",
        weight: 2,
      },
      {
        id: "etims",
        question: "Are all your sales invoices generated through eTIMS?",
        why: "Expenses not supported by an eTIMS invoice are disallowed for deduction.",
        authority: "Tax Procedures (Electronic Tax Invoice) Regulations",
        action: "Onboard onto eTIMS and reissue non-compliant invoices for the current year.",
        weight: 3,
      },
      {
        id: "vat",
        question: "Have your VAT returns been filed by the 20th of every month, including nil returns?",
        why: "Late VAT filing attracts penalties plus 1% monthly interest on unpaid tax.",
        authority: "VAT Act 2013",
        action: "File all outstanding VAT returns and apply for penalty waiver where the delay is justifiable.",
        weight: 2,
      },
      {
        id: "wht",
        question: "Do you deduct and remit withholding tax on professional and consultancy fees?",
        why: "The payer, not the payee, carries the liability for unremitted WHT.",
        authority: "Income Tax Act (Cap 470)",
        action: "Reconcile 12 months of supplier payments and remit any WHT shortfall by the 20th.",
        weight: 2,
      },
      {
        id: "objection",
        question: "If you have received an assessment, was a Notice of Objection filed within 30 days?",
        why: "Miss the 30-day window and the assessment becomes final and enforceable.",
        authority: "Tax Procedures Act 2015, s.51",
        action: "Instruct an advocate immediately to seek an extension of time and prepare the objection.",
        weight: 3,
      },
    ],
  },
  {
    id: "employment",
    service: "Employment",
    title: "Employment & HR Compliance Check",
    blurb: "For any employer with one or more staff in Kenya.",
    questions: [
      {
        id: "contracts",
        question: "Does every employee have a written contract signed by both parties?",
        why: "Where there is no written contract, the burden of proving its terms falls on the employer.",
        authority: "Employment Act 2007, s.10",
        action: "Issue written contracts to all staff, including casuals engaged for more than one month.",
        weight: 3,
      },
      {
        id: "statutory",
        question: "Are NSSF, SHIF and PAYE deductions remitted by the statutory deadline each month?",
        why: "Unremitted deductions are a criminal offence, not merely a debt.",
        authority: "NSSF Act 2013 · SHIF Act 2023 · Income Tax Act",
        action: "Reconcile and clear arrears on all statutory deductions, then automate monthly remittance.",
        weight: 3,
      },
      {
        id: "policies",
        question: "Do you have a written disciplinary and grievance procedure staff have seen?",
        why: "Unfair-procedure findings are the most common reason employers lose at the ELRC.",
        authority: "Employment Act 2007, s.41 & s.45",
        action: "Adopt a disciplinary policy and train supervisors on the s.41 hearing requirement.",
        weight: 2,
      },
      {
        id: "termination",
        question: "For any termination in the last year, was a s.41 hearing held with a written record?",
        why: "Substantive fairness is not enough — procedure must be documented.",
        authority: "Employment Act 2007, s.41",
        action: "Review past terminations for exposure and correct your process before the next one.",
        weight: 3,
      },
      {
        id: "leave",
        question: "Are leave records (annual, sick, maternity, paternity) kept for every employee?",
        why: "Employers must produce records; absent records the employee's version is preferred.",
        authority: "Employment Act 2007, s.74",
        action: "Set up a leave register capturing all statutory leave entitlements per employee.",
        weight: 1,
      },
    ],
  },
  {
    id: "conveyancing",
    service: "Conveyancing",
    title: "Property Purchase Readiness Check",
    blurb: "Before you release a single shilling on a land or apartment purchase.",
    questions: [
      {
        id: "search",
        question: "Have you conducted an official search at the relevant lands registry within the last 30 days?",
        why: "A search older than a month may miss a caveat or charge registered since.",
        authority: "Land Registration Act 2012",
        action: "Obtain a fresh official search and a certified copy of the title before payment.",
        weight: 3,
      },
      {
        id: "rates",
        question: "Have you confirmed land rates and land rent clearance certificates are current?",
        why: "Outstanding rates block registration of the transfer regardless of who incurred them.",
        authority: "Rating Act · Land Act 2012",
        action: "Request rates and rent clearance certificates from the seller as a condition precedent.",
        weight: 2,
      },
      {
        id: "consent",
        question: "Have you obtained land control board consent (agricultural land) or any required approvals?",
        why: "A transaction over agricultural land without LCB consent within six months becomes void.",
        authority: "Land Control Act (Cap 302)",
        action: "Apply for Land Control Board consent immediately and diarise the six-month deadline.",
        weight: 3,
      },
      {
        id: "spousal",
        question: "Is spousal consent documented where the property is matrimonial property?",
        why: "Transfers without spousal consent are routinely set aside by the Environment and Land Court.",
        authority: "Matrimonial Property Act 2013, s.12",
        action: "Obtain written, witnessed spousal consent before completion.",
        weight: 2,
      },
      {
        id: "escrow",
        question: "Is the balance of the purchase price held in an advocate's client account pending registration?",
        why: "Releasing funds against promises rather than registrable instruments is the single biggest loss risk.",
        authority: "Advocates Act · LSK Conditions of Sale",
        action: "Restructure payment so the balance is released only against a registered, clean transfer.",
        weight: 3,
      },
    ],
  },
  {
    id: "governance",
    service: "Corporate governance",
    title: "Company & Governance Compliance Check",
    blurb: "For private limited companies, NGOs and PBOs registered in Kenya.",
    questions: [
      {
        id: "beneficial",
        question: "Is your beneficial ownership register filed and updated with the Registrar?",
        why: "Non-filing attracts penalties and blocks most bank and tender processes.",
        authority: "Companies Act 2015 (Beneficial Ownership) Regulations 2020",
        action: "File or update the beneficial ownership register on eCitizen within 14 days of any change.",
        weight: 3,
      },
      {
        id: "returns",
        question: "Has your annual return been filed for the last financial year?",
        why: "Persistent non-filing exposes the company to being struck off the register.",
        authority: "Companies Act 2015, s.705",
        action: "File all outstanding annual returns and restore good standing before it affects contracts.",
        weight: 2,
      },
      {
        id: "minutes",
        question: "Are board and shareholder resolutions recorded in a maintained minute book?",
        why: "Decisions you cannot evidence are decisions you may have to re-litigate.",
        authority: "Companies Act 2015, s.679",
        action: "Reconstruct and maintain statutory registers and a minute book for all resolutions.",
        weight: 1,
      },
      {
        id: "shareholders",
        question: "Do you have a shareholders' agreement covering exit, deadlock and transfer of shares?",
        why: "Without one, a two-shareholder fallout usually ends in a winding-up petition.",
        authority: "Companies Act 2015 · common law",
        action: "Put a shareholders' agreement in place with deadlock and drag/tag provisions.",
        weight: 2,
      },
      {
        id: "dpa",
        question: "Are you registered as a data controller or processor where required?",
        why: "The ODPC has begun issuing enforcement notices and penalties.",
        authority: "Data Protection Act 2019",
        action: "Assess whether registration applies, register with the ODPC, and publish a privacy notice.",
        weight: 2,
      },
    ],
  },
  {
    id: "succession",
    service: "Succession",
    title: "Succession & Estate Readiness Check",
    blurb: "What your family will need if something happens tomorrow.",
    questions: [
      {
        id: "will",
        question: "Do you have a valid written will signed before two witnesses?",
        why: "Without a will, the Law of Succession Act — not your wishes — decides distribution.",
        authority: "Law of Succession Act (Cap 160), s.11",
        action: "Prepare and properly execute a will, and store the original where the executor can find it.",
        weight: 3,
      },
      {
        id: "inventory",
        question: "Is there a written inventory of assets, accounts, liabilities and titles?",
        why: "Most family delays are caused by nobody knowing what exists or where the documents are.",
        authority: "Practical requirement for grant application",
        action: "Build a confidential asset and liability schedule and tell your executor where it is kept.",
        weight: 2,
      },
      {
        id: "nominees",
        question: "Are pension, NSSF and insurance nominations up to date?",
        why: "Nominated benefits pass outside the estate — stale nominations override your will in practice.",
        authority: "Retirement Benefits Act · Insurance Act",
        action: "Review and refresh every nomination form with your current intentions.",
        weight: 2,
      },
      {
        id: "titles",
        question: "Are family land titles registered in the correct names, free of caveats?",
        why: "Unregistered or ancestral titles cause the longest succession disputes in Kenya.",
        authority: "Land Registration Act 2012",
        action: "Regularise titles now — transmission after death is slower and far more expensive.",
        weight: 3,
      },
      {
        id: "dependants",
        question: "Have you made reasonable provision for all dependants as defined by law?",
        why: "Dependants left out can challenge the will and unsettle the whole estate.",
        authority: "Law of Succession Act, s.26",
        action: "Review provision for all statutory dependants with an advocate to reduce challenge risk.",
        weight: 2,
      },
    ],
  },
];
