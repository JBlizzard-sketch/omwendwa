import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Printer, X, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

const templates: Template[] = [
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    description: "Standard mutual NDA for business discussions",
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] by and between:

PARTY A: [FULL NAME], of [ADDRESS] ("Disclosing Party")
PARTY B: [FULL NAME], of [ADDRESS] ("Receiving Party")

WHEREAS the parties wish to explore a potential business relationship and in the course thereof may disclose confidential information to each other;

NOW THEREFORE, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any information disclosed by either party to the other, whether orally, in writing, or by inspection, that is designated as confidential or that reasonably should be understood to be confidential.

2. OBLIGATIONS OF THE RECEIVING PARTY
The Receiving Party shall:
(a) Hold all Confidential Information in strict confidence;
(b) Not disclose Confidential Information to any third party without prior written consent;
(c) Use Confidential Information solely for the purpose of evaluating the potential business relationship;
(d) Take reasonable measures to protect the confidentiality of the information.

3. EXCLUSIONS
This Agreement does not apply to information that:
(a) Is or becomes publicly available through no fault of the Receiving Party;
(b) Was already known to the Receiving Party prior to disclosure;
(c) Is independently developed without use of the Confidential Information;
(d) Is required to be disclosed by law or court order.

4. TERM
This Agreement shall remain in effect for a period of [2] years from the date of execution.

5. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the Laws of Kenya.

6. DISPUTE RESOLUTION
Any disputes arising from this Agreement shall be resolved through mediation, and if unsuccessful, through arbitration in Nairobi under the Arbitration Act 1995.

SIGNED:

_________________________          _________________________
[Party A Name]                     [Party B Name]
Date: _______________              Date: _______________

Witness: _______________           Witness: _______________`
  },
  {
    id: "service-agreement",
    title: "Simple Service Agreement",
    description: "Basic contract for service provision",
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is made on [DATE] between:

SERVICE PROVIDER: [NAME/COMPANY], of [ADDRESS] ("Provider")
CLIENT: [NAME/COMPANY], of [ADDRESS] ("Client")

1. SERVICES
The Provider agrees to provide the following services:
[DESCRIBE SERVICES IN DETAIL]

2. TERM
This Agreement shall commence on [START DATE] and continue until [END DATE], unless terminated earlier in accordance with this Agreement.

3. COMPENSATION
The Client shall pay the Provider:
- Total Fee: KES [AMOUNT]
- Payment Schedule: [e.g., 50% upon signing, 50% upon completion]
- Payment Method: [Bank transfer / M-Pesa / Cheque]

4. OBLIGATIONS OF THE PROVIDER
The Provider shall:
(a) Perform the services with due care, skill, and diligence;
(b) Comply with all applicable laws and regulations;
(c) Provide regular progress updates as agreed.

5. OBLIGATIONS OF THE CLIENT
The Client shall:
(a) Provide all necessary information and access required for service delivery;
(b) Make timely payments as agreed;
(c) Provide feedback within [5] business days of each deliverable.

6. TERMINATION
Either party may terminate this Agreement with [30] days' written notice. In the event of termination, the Client shall pay for all services rendered up to the date of termination.

7. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of all proprietary information exchanged during the course of this engagement.

8. LIMITATION OF LIABILITY
The Provider's total liability under this Agreement shall not exceed the total fees paid or payable under this Agreement.

9. GOVERNING LAW
This Agreement is governed by the Laws of Kenya.

SIGNED:

_________________________          _________________________
Provider                           Client
Date: _______________              Date: _______________`
  },
  {
    id: "demand-letter",
    title: "Demand Letter Template",
    description: "Formal demand for payment or performance",
    content: `[YOUR LETTERHEAD / ADDRESS]
[DATE]

SENT VIA [REGISTERED POST / EMAIL]

[RECIPIENT NAME]
[RECIPIENT ADDRESS]

RE: DEMAND FOR PAYMENT OF KES [AMOUNT]

Dear [Mr./Ms. SURNAME],

We act for and on behalf of [CLIENT NAME] ("our Client") in relation to the above matter.

BACKGROUND
Our Client [describe the relationship/transaction, e.g., "entered into a contract with you on [DATE] for the supply of [GOODS/SERVICES] at an agreed price of KES [AMOUNT]"].

OUTSTANDING OBLIGATION
Despite [repeated requests/the terms of the agreement/the due date of [DATE]], the sum of KES [AMOUNT] remains outstanding as at the date of this letter.

DEMAND
We hereby demand that you pay the full outstanding amount of KES [AMOUNT] within FOURTEEN (14) DAYS of receipt of this letter.

Payment should be made to:
Bank: [BANK NAME]
Account Name: [ACCOUNT NAME]
Account Number: [ACCOUNT NUMBER]

CONSEQUENCES OF NON-COMPLIANCE
Please be advised that should you fail to comply with this demand within the stipulated period, our Client has instructed us to institute legal proceedings against you without further notice. In such event, you shall be liable for:
(a) The principal sum of KES [AMOUNT];
(b) Interest at the court rate;
(c) Legal costs on an advocate-client basis.

This letter is written without prejudice to our Client's rights and remedies, all of which are expressly reserved.

Yours faithfully,

_________________________
[ADVOCATE NAME]
O. Mwendwa & Company Advocates
[PRACTISING CERTIFICATE NUMBER]`
  },
  {
    id: "power-of-attorney",
    title: "Power of Attorney",
    description: "General power of attorney template",
    content: `GENERAL POWER OF ATTORNEY

KNOW ALL PERSONS BY THESE PRESENTS:

I, [FULL NAME], holder of National ID No. [ID NUMBER], of P.O. Box [ADDRESS], [CITY], Kenya ("the Donor"), do hereby appoint:

[FULL NAME OF ATTORNEY], holder of National ID No. [ID NUMBER], of P.O. Box [ADDRESS], [CITY], Kenya ("the Attorney")

as my true and lawful attorney to act on my behalf in the following matters:

1. POWERS GRANTED
The Attorney is authorised to:
(a) Execute, sign, and deliver documents, contracts, and agreements on my behalf;
(b) Operate my bank accounts at [BANK NAME], Account No. [NUMBER];
(c) Receive payments, issue receipts, and handle financial transactions;
(d) Deal with and manage my property at [PROPERTY DESCRIPTION / LR NUMBER];
(e) Represent me before government authorities, including KRA, land registries, and county offices;
(f) [ADD/REMOVE SPECIFIC POWERS AS NEEDED]

2. LIMITATIONS
This Power of Attorney does NOT authorise the Attorney to:
(a) Sell, transfer, or dispose of any immovable property without my express written consent;
(b) Borrow money or create any financial obligations on my behalf;
(c) [ADD SPECIFIC LIMITATIONS]

3. DURATION
This Power of Attorney shall remain in force from [START DATE] until [END DATE / revoked in writing].

4. REVOCATION
I reserve the right to revoke this Power of Attorney at any time by written notice to the Attorney.

5. GOVERNING LAW
This Power of Attorney is governed by the Laws of Kenya, specifically the Powers of Attorney Act (Cap 15).

IN WITNESS WHEREOF, I have executed this Power of Attorney on this [DAY] day of [MONTH], [YEAR].

_________________________
DONOR: [FULL NAME]

WITNESSES:
1. Name: _______________  Signature: _______________  ID: _______________
2. Name: _______________  Signature: _______________  ID: _______________

ATTESTED BY:
_________________________
[ADVOCATE NAME]
Commissioner for Oaths / Notary Public
O. Mwendwa & Company Advocates`
  },
  {
    id: "employment-contract",
    title: "Basic Employment Contract",
    description: "Employment agreement compliant with the Employment Act 2007",
    content: `CONTRACT OF EMPLOYMENT

This Contract of Employment is made on [DATE] between:

EMPLOYER: [COMPANY NAME], of [REGISTERED ADDRESS] ("the Employer")
EMPLOYEE: [FULL NAME], National ID No. [ID NUMBER], of [ADDRESS] ("the Employee")

1. POSITION AND DUTIES
The Employee is employed as [JOB TITLE] and shall perform the following duties:
[LIST KEY DUTIES AND RESPONSIBILITIES]

2. COMMENCEMENT AND PROBATION
(a) Employment commences on [START DATE]
(b) The first [3] months shall be a probationary period
(c) During probation, either party may terminate with [7] days' notice

3. REMUNERATION
(a) Basic Salary: KES [AMOUNT] per month, payable on the [DATE] of each month
(b) The Employer shall make statutory deductions including NSSF, NHIF, PAYE, and Housing Levy
(c) [Additional allowances, if any]

4. WORKING HOURS
(a) Normal working hours: [8:00 AM to 5:00 PM], Monday to Friday
(b) The Employee shall not be required to work more than 52 hours per week
(c) Overtime shall be compensated at 1.5x the normal hourly rate

5. LEAVE ENTITLEMENTS
(a) Annual Leave: 21 working days per year (Employment Act 2007, Section 28)
(b) Sick Leave: As per Section 30 of the Employment Act
(c) Maternity/Paternity Leave: As per the Employment Act

6. TERMINATION
(a) After probation, either party may terminate with [1 month] written notice
(b) The Employer may terminate summarily only for gross misconduct as defined in Section 44 of the Employment Act
(c) The Employee is entitled to a fair hearing before any disciplinary action

7. CONFIDENTIALITY
The Employee shall maintain the confidentiality of all proprietary business information during and after employment.

8. GOVERNING LAW
This Contract is governed by the Employment Act 2007 and the Laws of Kenya.

SIGNED:

_________________________          _________________________
Employer                           Employee
Date: _______________              Date: _______________

Witness: _______________`
  },
  {
    id: "tenancy-agreement",
    title: "Tenancy Agreement",
    description: "Residential tenancy agreement for Kenyan properties",
    content: `TENANCY AGREEMENT

This Agreement is made on [DATE] between:

LANDLORD: [FULL NAME], National ID No. [ID NUMBER], of [ADDRESS] ("the Landlord")
TENANT: [FULL NAME], National ID No. [ID NUMBER], of [ADDRESS] ("the Tenant")

PROPERTY: [FULL ADDRESS AND DESCRIPTION OF THE PROPERTY]

1. TERM
(a) The tenancy commences on [START DATE] for a period of [12] months
(b) The tenancy may be renewed by mutual written agreement

2. RENT
(a) Monthly Rent: KES [AMOUNT], payable on or before the [5th] day of each month
(b) Payment Method: [M-Pesa / Bank Transfer to Account No. ___]
(c) A late payment penalty of [5%] shall apply to rent not paid within [7] days of the due date

3. SECURITY DEPOSIT
(a) The Tenant shall pay a security deposit of KES [AMOUNT] (equivalent to [1] month's rent)
(b) The deposit shall be refunded within [30] days of vacating, less any deductions for damages

4. LANDLORD'S OBLIGATIONS
The Landlord shall:
(a) Deliver the property in a habitable condition
(b) Carry out structural repairs and maintenance
(c) Ensure the property complies with applicable building and health regulations
(d) Not interfere with the Tenant's quiet enjoyment of the property

5. TENANT'S OBLIGATIONS
The Tenant shall:
(a) Pay rent punctually
(b) Keep the property clean and in good condition
(c) Not make structural alterations without written consent
(d) Not sublet without the Landlord's written permission
(e) Use the property solely for residential purposes

6. TERMINATION
(a) Either party may terminate with [1 month] written notice
(b) The Landlord may terminate immediately for non-payment of rent exceeding [2] months
(c) The Tenant shall vacate and return the property in its original condition (fair wear excepted)

7. GOVERNING LAW
This Agreement is governed by the Landlord and Tenant (Shops, Hotels and Catering Establishments) Act and the Laws of Kenya.

SIGNED:

_________________________          _________________________
Landlord                           Tenant
Date: _______________              Date: _______________

Witness: _______________           Witness: _______________`
  },
  {
    id: "simple-will",
    title: "Simple Will Template",
    description: "Basic last will and testament under Kenyan law",
    content: `LAST WILL AND TESTAMENT

I, [FULL NAME], National ID No. [ID NUMBER], of [ADDRESS], being of sound mind, memory, and understanding, do hereby declare this to be my Last Will and Testament, revoking all previous wills and codicils.

1. EXECUTOR
I appoint [FULL NAME], National ID No. [ID NUMBER], of [ADDRESS] as the Executor of this Will. If they are unable or unwilling to act, I appoint [ALTERNATE NAME] as alternate Executor.

2. FUNERAL ARRANGEMENTS
I direct that my body be [buried/cremated] at [LOCATION/as my family sees fit].

3. DISTRIBUTION OF ESTATE

3.1 SPECIFIC BEQUESTS
(a) To [NAME], I bequeath [SPECIFIC PROPERTY/ASSET/AMOUNT]
(b) To [NAME], I bequeath [SPECIFIC PROPERTY/ASSET/AMOUNT]
(c) [Add more as needed]

3.2 RESIDUARY ESTATE
All remaining property, assets, and interests not specifically disposed of above shall be distributed as follows:
(a) [PERCENTAGE]% to [NAME]
(b) [PERCENTAGE]% to [NAME]
(c) [Add more as needed]

4. GUARDIANSHIP OF MINOR CHILDREN
If I have minor children at the time of my death, I appoint [FULL NAME] as their guardian.

5. DEBTS AND EXPENSES
I direct my Executor to pay all my just debts, funeral expenses, and expenses of administering my estate from the general assets of my estate.

6. GENERAL PROVISIONS
(a) If any beneficiary dies before me, their share shall [lapse/pass to their children]
(b) My Executor shall have full power to sell, lease, or dispose of any property to give effect to this Will

IN WITNESS WHEREOF, I have signed this Will on this [DAY] day of [MONTH], [YEAR] at [CITY], Kenya.

_________________________
TESTATOR: [FULL NAME]

WITNESSES (Neither witness may be a beneficiary under this Will):

1. Name: _______________
   ID No: _______________
   Address: _______________
   Signature: _______________

2. Name: _______________
   ID No: _______________
   Address: _______________
   Signature: _______________

NOTE: This template is provided for general guidance only. Under the Law of Succession Act (Cap 160), dependants may challenge a will that does not adequately provide for them. We strongly recommend consulting an advocate before executing a will.`
  },
  {
    id: "board-resolution",
    title: "Board Resolution Template",
    description: "Corporate board resolution for key decisions",
    content: `BOARD RESOLUTION

[COMPANY NAME]
(Registration No. [COMPANY REG NUMBER])

MINUTES OF A MEETING OF THE BOARD OF DIRECTORS

Date: [DATE]
Time: [TIME]
Venue: [LOCATION / Virtual via [PLATFORM]]

PRESENT:
1. [NAME] — Director (Chairperson)
2. [NAME] — Director
3. [NAME] — Director
[Add more as needed]

IN ATTENDANCE:
[NAME] — Company Secretary

QUORUM
A quorum being present, the Chairperson called the meeting to order.

RESOLUTION [NUMBER]:
[TITLE OF RESOLUTION — e.g., "APPROVAL OF BANK ACCOUNT OPENING"]

WHEREAS:
(a) [State the background and reasons for the resolution]
(b) [Additional context if needed]

IT IS HEREBY RESOLVED THAT:
(a) [State the specific decision, e.g., "The Company shall open a current account with [BANK NAME]"]
(b) [State any authorisations, e.g., "The Directors [NAME] and [NAME] are hereby authorised as signatories"]
(c) [Any additional terms]

VOTING:
The resolution was proposed by [NAME] and seconded by [NAME].
In Favour: [NUMBER]
Against: [NUMBER]
Abstentions: [NUMBER]

The resolution was CARRIED [unanimously / by majority].

CLOSURE
There being no further business, the meeting was adjourned at [TIME].

CONFIRMED:

_________________________          _________________________
Chairperson                        Company Secretary
Date: _______________              Date: _______________

NOTE: Under the Companies Act 2015, certain resolutions require special majority (75%). Ensure compliance with your Articles of Association and the Act.`
  },
];

const TemplateModal = ({ template, onClose }: { template: Template; onClose: () => void }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${template.title}</title>
            <style>
              body { font-family: 'Georgia', serif; padding: 40px; line-height: 1.8; color: #1a1a1a; max-width: 800px; margin: 0 auto; }
              h1 { font-size: 18px; text-align: center; margin-bottom: 30px; }
              pre { white-space: pre-wrap; font-family: 'Georgia', serif; font-size: 13px; }
              .disclaimer { margin-top: 40px; padding: 15px; border: 1px solid #ccc; font-size: 11px; color: #666; }
            </style>
          </head>
          <body>
            <pre>${template.content}</pre>
            <div class="disclaimer">
              <strong>DISCLAIMER:</strong> This template is provided by O. Mwendwa & Company Advocates for general reference only. It should not be used without professional legal review. Every situation is unique — engage an advocate before executing any legal document. Contact us at info@ochielmwendwa.co.ke or +254 796 759 632.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">{template.title}</h3>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handlePrint} className="text-xs">
              <Printer className="h-3 w-3 mr-1" /> Print
            </Button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-body">
            {template.content}
          </pre>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 shrink-0">
          <div className="rounded-md bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Disclaimer:</strong> This template is for general reference only and should not be used without professional legal review.{" "}
              <Link to="/contact" className="text-primary hover:underline font-semibold">
                Need this customised? Talk to us →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DocumentTemplates = () => {
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);

  return (
    <>
      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
                Document <span className="text-gold-gradient">Templates</span>
              </h2>
              <p className="mb-8 text-sm text-muted-foreground">
                Free, viewable, and printable legal templates for common Kenyan legal needs. Every situation is unique — engage an advocate before executing any legal document.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map((doc, i) => (
                <ScrollReveal key={doc.id} delay={i * 0.06}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTemplate(doc)}
                    className="flex w-full items-start gap-4 rounded-lg border border-border bg-secondary/30 p-5 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{doc.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{doc.description}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        View template <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeTemplate && (
          <TemplateModal template={activeTemplate} onClose={() => setActiveTemplate(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default DocumentTemplates;
