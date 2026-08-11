import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Scale, ArrowRight, Home, BookOpen, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const links = [
    { to: "/", icon: Home, label: "Home", desc: "Start at the beginning" },
    { to: "/practice-areas", icon: Briefcase, label: "Practice Areas", desc: "Six areas of expertise" },
    { to: "/insights", icon: BookOpen, label: "Insights", desc: "Kenyan law commentary" },
    { to: "/contact", icon: MessageCircle, label: "Contact", desc: "Talk to a partner" },
  ];

  return (
    <>
      <SEOHead title="Page not found — O. Mwendwa & Company Advocates" description="The page you're looking for doesn't exist. Here are some helpful destinations." />
      <section className="relative flex min-h-screen items-center bg-background pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div className="font-heading text-6xl font-bold text-gold-gradient md:text-8xl">404</div>
            <h1 className="mt-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Case dismissed — page not found
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              The link may be broken or the page may have moved. Here are a few places that might help.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group rounded-lg border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <Icon className="mb-3 h-5 w-5 text-primary" />
                    <div className="font-heading text-sm font-bold text-foreground">{l.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{l.desc}</div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Visit <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link to="/" className="mt-10 inline-block">
              <Button className="bg-primary text-primary-foreground">
                Return home <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
