import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink, Clock, ShieldCheck } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";


const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="kenya-stripe w-full" />
    
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="block">
            <span className="font-heading text-lg font-bold text-primary">O. Mwendwa</span>
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              & Company Advocates
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A modern Kenyan law firm delivering clarity, integrity, and results. We bring fresh perspective to legal practice — reflecting today's realities, not yesterday's dogma.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex h-5 items-center gap-[2px]">
              <div className="h-4 w-1 rounded-sm bg-kenya-red" />
              <div className="h-4 w-1 rounded-sm bg-foreground" />
              <div className="h-4 w-1 rounded-sm bg-kenya-green" />
            </div>
            Member, Law Society of Kenya
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {[
              { to: "/about", label: "About the Firm" },
              { to: "/practice-areas", label: "Practice Areas" },
              { to: "/results", label: "Results & Testimonials" },
              { to: "/insights", label: "Legal Insights" },
              { to: "/legal-tools", label: "Legal Tools" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Practice Areas */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Practice Areas</h4>
          <nav className="flex flex-col gap-2">
            {[
              { to: "/practice-areas/tax", label: "Tax Compliance & Advisory" },
              { to: "/practice-areas/commercial", label: "Commercial Law" },
              { to: "/practice-areas/family", label: "Family Law" },
              { to: "/practice-areas/succession", label: "Succession & Estate Planning" },
              { to: "/practice-areas/governance", label: "Corporate Governance" },
              { to: "/practice-areas/environment-land", label: "Environmental & Land Law" },
              { to: "/practice-areas/debt-recovery", label: "Debt Recovery" },
              { to: "/practice-areas/private-wealth", label: "Private Wealth" },
            ].map((area) => (
              <Link
                key={area.to}
                to={area.to}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {area.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold text-foreground">Get in Touch</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+254796759632" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              +254 796 759 632
            </a>
            <a href="mailto:Ochielmwendwa@gmail.com" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground/70">Email</span>
                Ochielmwendwa@gmail.com
              </span>
            </a>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Uniafric House, Koinange Street,<br />Suite 334, Nairobi, Kenya
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Mon – Fri · 8:00 AM – 6:00 PM EAT
            </div>
          </div>

          <h4 className="mt-6 mb-3 font-heading text-sm font-bold text-foreground">From the Blog</h4>
          <nav className="flex flex-col gap-2">
            {blogPosts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="line-clamp-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {p.title}
              </Link>
            ))}
          </nav>


          {/* Professional Badges */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                <span className="text-[8px] font-bold text-primary">LSK</span>
              </div>
              Law Society of Kenya
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                <span className="text-[8px] font-bold text-primary">ICC</span>
              </div>
              ICC Young Arbitrators Forum
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 flex flex-col items-center gap-3 text-xs text-muted-foreground">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link to="/privacy-notice" className="transition-colors hover:text-primary">Privacy Notice</Link>
          <span className="text-border">·</span>
          <Link to="/terms-of-use" className="transition-colors hover:text-primary">Terms of Use</Link>
          <span className="text-border">·</span>
          <Link to="/contact" className="transition-colors hover:text-primary">Contact</Link>
        </nav>
        <div className="flex max-w-2xl items-start gap-2 rounded-md border border-border bg-secondary/30 px-3 py-2 text-center text-[11px] leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span>
            We process personal data in compliance with the Data Protection Act, 2019 (Kenya). Information shared with the firm is protected by advocate–client privilege. See our{" "}
            <Link to="/privacy-notice" className="font-medium text-primary hover:underline">Privacy Notice</Link>.
          </span>
        </div>
        <div>© {new Date().getFullYear()} O. Mwendwa & Company Advocates. All rights reserved.</div>
        <a
          href="https://munuvetech.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-muted-foreground/60 transition-colors hover:text-primary"
        >
          Built by Munuve Technologies <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
