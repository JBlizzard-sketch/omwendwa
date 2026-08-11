import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const STORAGE_KEY = "omca:exit-intent-shown";

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    let triggered = false;
    const fire = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.6) fire();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <DialogTitle className="font-heading text-2xl">Before you go — do you have a case?</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Take our free 2-minute legal check. Answer four questions and get a clearer view of where you stand under Kenyan law. No login. No fee.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Link to="/legal-tools" className="flex-1" onClick={() => setOpen(false)}>
            <Button className="w-full bg-primary text-primary-foreground">
              Try the legal check <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => setOpen(false)} className="text-muted-foreground">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
