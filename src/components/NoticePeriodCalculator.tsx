import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ScrollReveal from "@/components/ScrollReveal";

const NoticePeriodCalculator = () => {
  const [salary, setSalary] = useState("");
  const [yearsService, setYearsService] = useState("");
  const [payCycle, setPayCycle] = useState<"monthly" | "weekly" | "daily">("monthly");

  const monthly = Number(salary.replace(/[^0-9.]/g, "")) || 0;
  const years = Number(yearsService) || 0;

  const noticeLabel =
    payCycle === "monthly" ? "28 days" : payCycle === "weekly" ? "7 days" : "1 day";

  // Statutory severance under s.40(1)(g) Employment Act: 15 days pay per completed year of service (redundancy).
  const severance = (monthly / 30) * 15 * years;
  const noticePay = payCycle === "monthly" ? monthly : payCycle === "weekly" ? (monthly / 30) * 7 : monthly / 30;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

  return (
    <ScrollReveal>
      <div className="rounded-lg border border-border bg-secondary/30 p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Notice & Severance Estimator</h3>
            <p className="text-xs text-muted-foreground">Indicative figures under Kenya's Employment Act, 2007.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="np-salary" className="text-xs">Gross monthly salary (KES)</Label>
            <Input id="np-salary" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. 120,000" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="np-years" className="text-xs">Completed years of service</Label>
            <Input id="np-years" type="number" min="0" value={yearsService} onChange={(e) => setYearsService(e.target.value)} placeholder="e.g. 4" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Pay cycle</Label>
            <select
              value={payCycle}
              onChange={(e) => setPayCycle(e.target.value as typeof payCycle)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily / casual</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Statutory notice period</div>
            <div className="font-heading text-2xl font-bold text-primary">{noticeLabel}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Pay in lieu ≈ {fmt(noticePay)}</div>
          </div>
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Redundancy severance (s.40)</div>
            <div className="font-heading text-2xl font-bold text-primary">{fmt(severance)}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">15 days' pay × {years || 0} year(s) of service</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            Indicative. Contract terms, CBAs and the reason for termination can change the figures.
          </p>
          <Link to="/contact">
            <Button size="sm" variant="outline" className="border-primary/40 text-primary">
              Review my situation <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default NoticePeriodCalculator;
