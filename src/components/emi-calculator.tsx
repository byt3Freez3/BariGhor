import { useState, useId, useEffect } from "react";
import { IndianRupee, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/utils";

function calculateEmi(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}



export function EmiCalculator({
  initialLoanLakhs = 105,
  initialYears = 20,
  compact = false,
}: {
  initialLoanLakhs?: number;
  initialYears?: number;
  compact?: boolean;
}) {
  const [loanLakhs, setLoanLakhs] = useState(initialLoanLakhs);
  const [years, setYears] = useState(initialYears);

  const rawEmi = calculateEmi(loanLakhs * 100000, 8.5, years);
  const [displayEmi, setDisplayEmi] = useState(rawEmi);

  const totalPayment = rawEmi * years * 12;
  const totalInterest = Math.max(0, totalPayment - loanLakhs * 100000);

  const loanSliderId = useId();
  const tenureSliderId = useId();
  const prevEmiRef = useState({ current: rawEmi })[0];

  // Smooth number transition
  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = prevEmiRef.current || rawEmi;
    const endValue = rawEmi;
    const duration = 250;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      setDisplayEmi(current);
      prevEmiRef.current = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [rawEmi, prevEmiRef]);

  return (
    <div className={compact ? "w-full" : "grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center"}>
      {!compact && (
        <div className="reveal-up">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Know the monthly number
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
            Estimate your EMI.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            A transparent starting estimate calibrated to Kolkata home loans—without phone numbers,
            sales calls, or hidden assumptions.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-sage/20 text-primary">
                <Sparkles className="size-4 text-primary" />
              </span>
              <div>
                <p className="font-semibold text-foreground">8.50% Fixed Benchmark</p>
                <p className="text-xs text-muted-foreground">Standard tier-1 bank rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent">
                <TrendingUp className="size-4 text-accent" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Principal Transparency</p>
                <p className="text-xs text-muted-foreground">Zero prepayment penalty</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden border border-black/5 bg-card p-6 shadow-sm transition-all md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated Monthly EMI
            </p>
            <p className="mt-2 flex items-center font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              <IndianRupee className="size-8 md:size-10 stroke-[2.5]" />
              {displayEmi.toLocaleString("en-IN")}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5 text-accent" />
            8.50% p.a.
          </span>
        </div>

        <div className="mt-8 space-y-7">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor={loanSliderId} className="font-semibold text-foreground">
                Loan Amount
              </label>
              <span className="font-mono text-base font-bold text-accent">
                {formatINR(loanLakhs)}
              </span>
            </div>
            <input
              id={loanSliderId}
              type="range"
              min={20}
              max={500}
              step={5}
              value={loanLakhs}
              onChange={(e) => setLoanLakhs(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-accent focus:outline-none"
              aria-label="Loan Amount in Lakhs"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>₹20 Lakh</span>
              <span>₹2.5 Cr</span>
              <span>₹5.0 Cr</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor={tenureSliderId} className="font-semibold text-foreground">
                Loan Tenure
              </label>
              <span className="font-mono text-base font-bold text-accent">
                {years} Years ({years * 12} months)
              </span>
            </div>
            <input
              id={tenureSliderId}
              type="range"
              min={5}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-accent focus:outline-none"
              aria-label="Loan Tenure in Years"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-background/50 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Principal Amount
              </p>
              <p className="mt-1 font-semibold text-foreground">{formatINR(loanLakhs)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Total Interest Payable
              </p>
              <p className="mt-1 font-semibold text-accent">
                {formatINR(Math.round(totalInterest / 100000))}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-border/60 pt-4 text-xs leading-5 text-muted-foreground">
          Calculated using standard reducing balance method `[P x R x (1+R)^N]/[(1+R)^N-1]`. Final
          sanctions depend on credit score and lender criteria.
        </p>
      </div>
    </div>
  );
}
