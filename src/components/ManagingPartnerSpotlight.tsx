import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import rachelImg from "@/assets/rachel-mwendwa.jpg";

const credentials = [
  { icon: Scale, label: "Advocate of the High Court", sub: "Commissioner for Oaths · Notary Public" },
  { icon: Globe, label: "International practice", sub: "International Lawyers Project · AFRODAD" },
  { icon: Award, label: "Moot court distinction", sub: "Africa HRMC Grand Finalist · Jessup" },
];

const ManagingPartnerSpotlight = () => (
  <section className="relative overflow-hidden bg-background py-20 lg:py-28">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
    <div className="container relative mx-auto px-4">
      <div className="grid items-center gap-10 lg:grid-cols-5">
        <ScrollReveal direction="left">
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border"
            >
              <img
                src={rachelImg}
                alt="Rachel Mwendwa — Managing Partner, O. Mwendwa & Company Advocates"
                className="h-full w-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Managing Partner</div>
                <div className="font-heading text-xl font-bold text-foreground">Rachel Mwendwa</div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-3">
          <ScrollReveal>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Led By</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Rachel Mwendwa, <span className="text-gold-gradient">Managing Partner</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Rachel leads every client relationship at the firm — from first consultation to final outcome. Her practice spans environmental and land law, complex succession, and high-stakes advisory, shaped by international work with the International Lawyers Project and AFRODAD, and by a conviction that Kenyan law must answer to today's economy.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              She is supported by a partner whose practice covers litigation, commercial law, tax and corporate governance, and by a network of counsel across Kenya's courts and tribunals.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="hover-lift surface-elevated rounded-xl border border-border p-4">
                    <Icon className="mb-2 h-5 w-5 text-primary" />
                    <div className="text-sm font-semibold text-foreground">{c.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about">
                <Button size="lg" className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                  Meet the firm <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Speak with Rachel
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

export default ManagingPartnerSpotlight;
