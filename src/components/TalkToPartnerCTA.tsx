import { Link } from "react-router-dom";
import { Phone, MessageCircle, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  heading?: string;
  subheading?: string;
}

const TalkToPartnerCTA = ({
  heading = "Talk to a partner within 24 hours",
  subheading = "Confidential. No obligation. Just a clear-headed legal opinion from people who answer their own phones.",
}: Props) => (
  <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-background py-14">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl rounded-xl border border-primary/20 bg-card p-6 shadow-lg shadow-primary/5 lg:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                {heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subheading}</p>
            </div>
            <div className="grid gap-2 lg:col-span-2">
              <Link to="/contact">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <CalendarClock className="h-4 w-4" /> Schedule consultation <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/254796759632" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us now
                </Button>
              </a>
              <a href="tel:+254796759632">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4" /> +254 796 759 632
                </Button>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TalkToPartnerCTA;
