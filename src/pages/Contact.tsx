import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import ConsultationScheduler from "@/components/ConsultationScheduler";

const caseTypes = [
  "Tax Compliance & Advisory",
  "Commercial Law",
  "Family Law",
  "Succession & Estate Planning",
  "Corporate Governance",
  "Environmental & Land Law",
  "Debt Recovery & Enforcement",
  "Private Wealth & Family Office",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    urgency: "standard",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Submitted",
      description: "Thank you. We'll respond within 24 business hours.",
    });
    setFormData({ name: "", email: "", phone: "", caseType: "", urgency: "standard", message: "" });
  };

  return (
    <>
      <SEOHead
        title="Contact Us — Book a Legal Consultation in Nairobi"
        description="Contact O. Mwendwa & Company Advocates in Nairobi for a confidential legal consultation. Call +254 796 759 632 or fill out our inquiry form."
      />

      <section className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Get in Touch</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Contact <span className="text-gold-gradient">Us</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Every legal matter begins with a conversation. Reach out to schedule a confidential consultation with one of our advocates.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Consultation Scheduler */}
      <ConsultationScheduler />

      <section className="bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <ScrollReveal className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-secondary/30 p-8">
                <h2 className="font-heading text-xl font-bold text-foreground">Consultation Request</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="mt-1" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+254 7XX XXX XXX" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="caseType">Case Type *</Label>
                    <select
                      id="caseType"
                      required
                      value={formData.caseType}
                      onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select case type</option>
                      {caseTypes.map((ct) => (
                        <option key={ct} value={ct}>{ct}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <div className="mt-2 flex gap-4">
                    {[
                      { value: "standard", label: "Standard" },
                      { value: "urgent", label: "Urgent" },
                      { value: "immediate", label: "Immediate" },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="urgency"
                          value={opt.value}
                          checked={formData.urgency === opt.value}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                          className="h-4 w-4 accent-[hsl(42,52%,54%)]"
                        />
                        <span className="text-sm text-muted-foreground">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Brief Description *</Label>
                  <Textarea id="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Briefly describe your legal matter..." className="mt-1 min-h-[120px]" />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary font-semibold text-primary-foreground">
                  Submit Inquiry
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  All communications are confidential. We typically respond within 24 business hours.
                </p>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.15} className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a href="tel:+254796759632" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                      <Phone className="h-5 w-5 text-primary" /> +254 796 759 632
                    </a>
                    <a href="mailto:Ochielmwendwa@gmail.com" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground/70">General enquiries</span>
                        Ochielmwendwa@gmail.com
                      </span>
                    </a>
                    <a href="mailto:Ochielmwendwa@gmail.com" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground/70">Direct line</span>
                        Ochielmwendwa@gmail.com
                      </span>
                    </a>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <span>Uniafric House, Koinange Street,<br />Suite 334, Nairobi, Kenya</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary" /> Mon – Fri: 8:00 AM – 6:00 PM
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/254796759632?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 p-6 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat with us on WhatsApp
                </a>

                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">What to Expect</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      We acknowledge your inquiry within 4 hours during business days
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      Initial consultations can be conducted in person or virtually
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      All discussions are protected by attorney-client privilege
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      We provide a clear fee estimate before any engagement
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
