import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ScrollReveal from "@/components/ScrollReveal";

const RATES = {
  "urban-land": { label: "Urban land / property", rate: 0.04 },
  "rural-land": { label: "Agricultural / rural land", rate: 0.02 },
  shares: { label: "Share transfer", rate: 0.01 },
};

const StampDutyCalculator = () => {
  const [type, setType] = useState<keyof typeof RATES>("urban-land");
  const [value, setValue] = useState("");

  const num = Number(value.replace(/[^0-9.]/g, "")) || 0;
  const duty = num * RATES[type].rate;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

  return (
    <ScrollReveal>
      <div className="rounded-lg border border-border bg-secondary/30 p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Stamp Duty Calculator</h3>
            <p className="text-xs text-muted-foreground">Estimate Kenyan stamp duty on land and share transfers.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Transaction type</Label>
            <div className="mt-1 flex flex-col gap-1">
              {(Object.keys(RATES) as Array<keyof typeof RATES>).map((k) => (
                <label key={k} className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm hover:border-primary/40">
                  <input
                    type="radio"
                    name="stamp-type"
                    checked={type === k}
                    onChange={() => setType(k)}
                    className="h-3.5 w-3.5 accent-[hsl(42,52%,54%)]"
                  />
                  <span className="flex-1 text-foreground">{RATES[k].label}</span>
                  <span className="text-xs text-muted-foreground">{(RATES[k].rate * 100).toFixed(0)}%</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="sd-val" className="text-xs">Value (KES)</Label>
            <Input
              id="sd-val"
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 8,500,000"
              className="mt-1"
            />
            <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Estimated stamp duty</div>
              <div className="font-heading text-2xl font-bold text-primary">{fmt(duty)}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">Excludes legal fees, valuation & registration.</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            Indicative only. Statutory valuation by a government valuer may differ.
          </p>
          <Link to="/contact">
            <Button size="sm" variant="outline" className="border-primary/40 text-primary">
              Get formal valuation <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default StampDutyCalculator;
