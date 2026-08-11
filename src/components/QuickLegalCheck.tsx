import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Home, FileText, Briefcase, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface DecisionTree {
  id: string;
  title: string;
  icon: typeof Home;
  description: string;
  questions: {
    text: string;
    yesNext: number | "pass" | "fail" | "maybe";
    noNext: number | "pass" | "fail" | "maybe";
  }[];
  results: {
    pass: { title: string; body: string };
    fail: { title: string; body: string };
    maybe: { title: string; body: string };
  };
}

const decisionTrees: DecisionTree[] = [
  {
    id: "lease",
    title: "Is Your Lease Valid?",
    icon: Home,
    description: "5 quick questions to check if your tenancy agreement is legally sound",
    questions: [
      { text: "Is your lease agreement in writing (not just verbal)?", yesNext: 1, noNext: "fail" },
      { text: "Does the lease specify the rent amount and payment terms?", yesNext: 2, noNext: "maybe" },
      { text: "Is the lease for a period exceeding 2 years, and if so, is it registered at the lands office?", yesNext: 3, noNext: "maybe" },
      { text: "Does the lease identify the property with a specific address or parcel number?", yesNext: 4, noNext: "maybe" },
      { text: "Was the lease signed by both the landlord (or their authorised agent) and you?", yesNext: "pass", noNext: "fail" },
    ],
    results: {
      pass: { title: "Your lease appears valid", body: "Based on your answers, your lease agreement meets the basic legal requirements under Kenyan law. However, we recommend a professional review to ensure all terms are enforceable." },
      fail: { title: "Your lease may have issues", body: "Your lease agreement may not be legally enforceable. Key elements appear to be missing. We strongly recommend having an advocate review your tenancy arrangement." },
      maybe: { title: "Your lease needs attention", body: "Some aspects of your lease may need strengthening. While not necessarily invalid, missing elements could create disputes. A professional review is advisable." },
    },
  },
  {
    id: "will",
    title: "Can You Contest a Will?",
    icon: FileText,
    description: "4 questions to assess if you have grounds to challenge a will",
    questions: [
      { text: "Are you a spouse, child, or dependant of the deceased?", yesNext: 1, noNext: "fail" },
      { text: "Do you believe the deceased lacked mental capacity when the will was made?", yesNext: "pass", noNext: 2 },
      { text: "Were you a dependant who was excluded from the will or given inadequate provision?", yesNext: "pass", noNext: 3 },
      { text: "Do you suspect the will was made under undue influence, fraud, or coercion?", yesNext: "pass", noNext: "maybe" },
    ],
    results: {
      pass: { title: "You may have grounds to contest", body: "Based on your answers, you may have valid grounds to challenge the will under Kenya's Law of Succession Act. Time limits apply — act quickly and consult an advocate." },
      fail: { title: "Limited grounds to contest", body: "Based on your answers, you may not have standing to contest the will. Only dependants and certain relatives have legal standing under the Act. Consult an advocate for a full assessment." },
      maybe: { title: "Further assessment needed", body: "Your situation requires a more detailed legal analysis. While you may not have obvious grounds, an experienced succession lawyer may identify other avenues." },
    },
  },
  {
    id: "employment",
    title: "Is Your Employment Contract Fair?",
    icon: Briefcase,
    description: "6 questions to check your contract meets Employment Act standards",
    questions: [
      { text: "Is your employment contract in writing?", yesNext: 1, noNext: "maybe" },
      { text: "Does the contract specify your job title, duties, and remuneration?", yesNext: 2, noNext: "maybe" },
      { text: "Does it provide for at least 21 days of annual leave?", yesNext: 3, noNext: "fail" },
      { text: "Does it include provisions for notice before termination (at least 1 month)?", yesNext: 4, noNext: "fail" },
      { text: "Are deductions from your salary itemised and agreed upon?", yesNext: 5, noNext: "maybe" },
      { text: "Does the contract comply with working hours limits (max 52 hours/week)?", yesNext: "pass", noNext: "fail" },
    ],
    results: {
      pass: { title: "Your contract appears compliant", body: "Your employment contract seems to meet the minimum standards under Kenya's Employment Act 2007. For complete assurance, have an employment lawyer review the full document." },
      fail: { title: "Your contract may violate the Employment Act", body: "Key provisions required by the Employment Act 2007 appear to be missing from your contract. You may have grounds for a complaint to the labour office or legal action." },
      maybe: { title: "Some terms need review", body: "Your contract has some gaps that could affect your rights. While not necessarily illegal, these omissions could create problems. A professional review is recommended." },
    },
  },
  {
    id: "tax-objection",
    title: "Should You File a Tax Objection?",
    icon: Scale,
    description: "4 questions to determine if you should challenge a KRA assessment",
    questions: [
      { text: "Have you received a tax assessment from KRA that you believe is incorrect?", yesNext: 1, noNext: "fail" },
      { text: "Is the assessment less than 30 days old (you must object within 30 days)?", yesNext: 2, noNext: "maybe" },
      { text: "Do you have documentation (receipts, records, statements) supporting your position?", yesNext: 3, noNext: "maybe" },
      { text: "Have you paid the tax in dispute, or can you pay at least 50% while objecting?", yesNext: "pass", noNext: "maybe" },
    ],
    results: {
      pass: { title: "You should file an objection", body: "You appear to have strong grounds and are within the timeline to file a valid tax objection. Remember: if KRA doesn't respond within 60 days, your objection is deemed allowed." },
      fail: { title: "An objection may not be the right step", body: "Based on your answers, a formal objection may not be appropriate right now. Consider consulting a tax advocate to explore other remedies." },
      maybe: { title: "Act quickly — time may be running out", body: "There may be complications with your objection, but time-sensitive options may still be available. Consult a tax advocate immediately to assess your position." },
    },
  },
];

const DecisionTreeComponent = ({ tree }: { tree: DecisionTree }) => {
  const [step, setStep] = useState(-1);
  const [result, setResult] = useState<"pass" | "fail" | "maybe" | null>(null);
  const Icon = tree.icon;

  const handleAnswer = (nextStep: number | "pass" | "fail" | "maybe") => {
    if (typeof nextStep === "number") {
      setStep(nextStep);
    } else {
      setResult(nextStep);
    }
  };

  const reset = () => {
    setStep(-1);
    setResult(null);
  };

  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">{tree.title}</h3>
          <p className="text-xs text-muted-foreground">{tree.description}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {step === -1 && !result && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                onClick={() => setStep(0)}
                className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step >= 0 && !result && (
            <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Question {step + 1} of {tree.questions.length}</span>
                </div>
                <div className="h-1 rounded-full bg-secondary mb-4">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / tree.questions.length) * 100}%` }} />
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{tree.questions[step].text}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAnswer(tree.questions[step].yesNext)} className="border-kenya-green/30 hover:bg-kenya-green/10 hover:text-foreground">
                  Yes
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAnswer(tree.questions[step].noNext)} className="border-kenya-red/30 hover:bg-kenya-red/10 hover:text-foreground">
                  No
                </Button>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {result === "pass" ? (
                    <CheckCircle2 className="h-5 w-5 text-kenya-green" />
                  ) : result === "fail" ? (
                    <XCircle className="h-5 w-5 text-kenya-red" />
                  ) : (
                    <Scale className="h-5 w-5 text-primary" />
                  )}
                  <h4 className="text-sm font-bold text-foreground">{tree.results[result].title}</h4>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{tree.results[result].body}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/contact" className="flex-1">
                  <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs">
                    Consult Us
                  </Button>
                </Link>
                <Button size="sm" variant="outline" onClick={reset} className="text-xs">
                  <RotateCcw className="h-3 w-3 mr-1" /> Retry
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuickLegalCheck = () => (
  <section className="bg-card py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Quick Legal <span className="text-gold-gradient">Check</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Interactive decision trees to help you understand your legal position in minutes. Free, confidential, no obligation.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        {decisionTrees.map((tree, i) => (
          <ScrollReveal key={tree.id} delay={i * 0.1}>
            <DecisionTreeComponent tree={tree} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default QuickLegalCheck;
