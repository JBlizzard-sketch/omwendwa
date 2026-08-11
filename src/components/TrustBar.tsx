import { Star, ShieldCheck } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const TrustBar = () => {
  const picks = testimonials.slice(0, 3);
  return (
    <section className="border-t border-border bg-card/40">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <div className="h-px w-8 bg-primary/60" />
          What clients say
          <div className="h-px w-8 bg-primary/60" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {picks.map((t) => (
            <div
              key={t.name}
              className="rounded-lg border border-border bg-background/40 p-5 transition-colors hover:border-primary/30"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-kenya-green">
                  <ShieldCheck className="h-3 w-3" /> Verified client
                </span>
              </div>
              <p className="line-clamp-3 text-xs leading-relaxed italic text-muted-foreground">
                "{t.content}"
              </p>
              <div className="mt-3 text-[11px] font-semibold text-foreground">
                {t.name} <span className="font-normal text-muted-foreground">— {t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
