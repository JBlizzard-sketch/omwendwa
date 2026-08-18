import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Search, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { groupedPracticeAreas } from "@/data/practiceGroups";
import { useSiteSearch } from "@/hooks/use-site-search";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas", mega: true },
  { href: "/results", label: "Results" },
  { href: "/insights", label: "Insights" },
  { href: "/legal-tools", label: "Legal Tools" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openSearch } = useSiteSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-[0_8px_28px_-24px_hsl(336_38%_16%/0.5)]"
          : "border-b border-transparent bg-background/60 backdrop-blur-md",
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 lg:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="O. Mwendwa & Company Advocates — home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--brass))] font-heading text-lg font-bold text-primary-foreground shadow-sm">
            O
          </span>
          <span className="flex flex-col">
            <span className="font-heading text-base font-semibold leading-tight tracking-tight text-plum lg:text-lg">
              O. Mwendwa
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground lg:text-[11px]">
              & Company Advocates
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              onMouseEnter={() => setMegaOpen(Boolean(link.mega))}
              className="relative"
            >
              <Link
                to={link.href}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-primary",
                  location.pathname.startsWith(link.href) ? "text-primary" : "text-plum-light",
                )}
                aria-expanded={link.mega ? megaOpen : undefined}
              >
                {link.label}
                {link.mega && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaOpen && "rotate-180")} />}
              </Link>
              {location.pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--brass))]"
                />
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            aria-label="Search the site"
            className="hidden items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground lg:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
          </button>

          <a
            href="tel:+254796759632"
            className="hidden items-center gap-2 rounded-full px-2 text-sm font-medium text-plum-light transition-colors hover:text-primary xl:flex"
          >
            <Phone className="h-4 w-4" />
            +254 796 759 632
          </a>

          <Link to="/contact" className="hidden lg:block">
            <Button className="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-primary/90">
              Book Consultation
            </Button>
          </Link>

          <button
            onClick={openSearch}
            aria-label="Search the site"
            className="rounded-lg p-2 text-plum transition-colors hover:bg-muted lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-plum transition-colors hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden border-t border-border bg-background/98 backdrop-blur-xl shadow-[0_28px_48px_-32px_hsl(336_38%_16%/0.4)] lg:block"
          >
            <div className="container mx-auto grid grid-cols-4 gap-8 px-4 py-8">
              {groupedPracticeAreas.map(({ group, areas }) => (
                <div key={group.label}>
                  <p className="eyebrow">{group.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{group.blurb}</p>
                  <ul className="mt-3 space-y-1">
                    {areas.map((area) => {
                      const Icon = area.icon;
                      return (
                        <li key={area.id}>
                          <Link
                            to={`/practice-areas/${area.id}`}
                            className="group flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-secondary"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm font-medium text-foreground group-hover:text-primary">
                              {area.shortTitle}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-border bg-secondary/60">
              <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  17 practice areas. One partner-led team. Answers within one business day.
                </p>
                <Link to="/practice-areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  View all practice areas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="container mx-auto flex max-h-[75vh] flex-col gap-1 overflow-y-auto px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      location.pathname === link.href
                        ? "bg-secondary text-primary"
                        : "text-plum hover:bg-muted",
                    )}
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 rounded-xl bg-secondary p-4">
                <p className="eyebrow">Popular areas</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {groupedPracticeAreas.flatMap(({ areas }) => areas).slice(0, 6).map((area) => (
                    <Link
                      key={area.id}
                      to={`/practice-areas/${area.id}`}
                      className="rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground"
                    >
                      {area.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/contact">
                <Button className="mt-3 min-h-[48px] w-full rounded-full bg-primary text-base font-semibold text-primary-foreground">
                  Book Consultation
                </Button>
              </Link>
              <a
                href="tel:+254796759632"
                className="mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border text-base font-semibold text-plum"
              >
                <Phone className="h-4 w-4" /> +254 796 759 632
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
