import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "omca:newsletter";

const NewsletterSignup = ({ compact = false }: { compact?: boolean }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(() =>
    typeof window !== "undefined" ? !!localStorage.getItem(STORAGE_KEY) : false
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    localStorage.setItem(STORAGE_KEY, email);
    setDone(true);
    toast({
      title: "You're on the list",
      description: "We'll send a monthly digest of Kenyan legal developments. No spam.",
    });
  };

  return (
    <div
      className={`rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card ${
        compact ? "p-5" : "p-6 lg:p-8"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-foreground">
            The Legal Pulse — monthly digest
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Plain-language briefs on Kenyan law updates, KRA deadlines, and case-law takeaways. One email a month, unsubscribe anytime.
          </p>
          {done ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-kenya-green">
              <CheckCircle2 className="h-4 w-4" /> You're subscribed.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1"
              />
              <Button type="submit" className="bg-primary text-primary-foreground">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
