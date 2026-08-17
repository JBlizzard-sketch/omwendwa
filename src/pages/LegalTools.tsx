import { useState } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import QuickLegalCheck from "@/components/QuickLegalCheck";
import LegalGlossary from "@/components/LegalGlossary";
import KenyanLawFAQ from "@/components/KenyanLawFAQ";
import StampDutyCalculator from "@/components/StampDutyCalculator";
import NoticePeriodCalculator from "@/components/NoticePeriodCalculator";
import TalkToPartnerCTA from "@/components/TalkToPartnerCTA";


const quizQuestions = [
  {
    question: "What type of legal matter are you dealing with?",
    options: ["Business/Commercial Dispute", "Family Matter (Divorce, Custody)", "Land or Property Issue", "Tax Issue with KRA", "Succession/Inheritance", "Employment Dispute", "Criminal Matter", "I'm Not Sure"],
  },
  {
    question: "How long ago did this issue arise?",
    options: ["Less than 1 month", "1-6 months ago", "6-12 months ago", "Over a year ago"],
  },
  {
    question: "Have you received any formal legal notice or court papers?",
    options: ["Yes, I have court papers", "Yes, I received a legal notice", "No, but I expect one soon", "No"],
  },
  {
    question: "Have you attempted to resolve this matter previously?",
    options: ["Yes, through negotiation", "Yes, through a lawyer", "Yes, but informally", "No, this is my first step"],
  },
];

const LegalTools = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizComplete(false);
  };

  return (
    <>
      <SEOHead
        title="Legal Tools — Case Quiz, Decision Trees, Templates & FAQ"
        description="Free legal tools: case eligibility quiz, interactive legal checks, printable document templates, law glossary, and FAQ about Kenyan law."
      />

      <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Resources</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Legal <span className="text-gold-gradient">Tools</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Free resources to help you understand your legal position and take the right first steps. No login required — just practical legal value.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Quiz */}
      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="rounded-lg border border-border bg-secondary/30 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Do You Have a Case?</h2>
                </div>

                {!quizComplete ? (
                  <>
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                        <span>{Math.round(((quizStep) / quizQuestions.length) * 100)}% complete</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      {quizQuestions[quizStep].question}
                    </h3>

                    <div className="space-y-2">
                      {quizQuestions[quizStep].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuizAnswer(opt)}
                          className="w-full rounded-md border border-border bg-background px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Assessment Complete</h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Based on your responses, it appears you may benefit from professional legal advice. Every matter is unique, and an advocate can provide a proper assessment of your specific situation.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Link to="/contact">
                        <Button className="bg-primary text-primary-foreground">
                          Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={resetQuiz}>
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quick Legal Check Decision Trees */}
      <QuickLegalCheck />


      {/* Quick Calculators */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <div className="h-px w-8 bg-primary/60" /> Quick calculators <div className="h-px w-8 bg-primary/60" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Numbers, <span className="text-gold-gradient">In Plain Sight</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Indicative estimates for two of the questions we field most often.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <StampDutyCalculator />
            <NoticePeriodCalculator />
          </div>
        </div>
      </section>

      {/* Legal Glossary */}
      <LegalGlossary />

      {/* Kenyan Law FAQ — categorised, with next-step CTAs */}
      <KenyanLawFAQ />

      <TalkToPartnerCTA />
    </>
  );
};

export default LegalTools;

