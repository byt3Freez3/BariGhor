import { useState, useId, useEffect } from "react";
import { IndianRupee, Landmark, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

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
  const prefersReduced = useReducedMotion();
  const [loanLakhs, setLoanLakhs] = useState(initialLoanLakhs);
  const [years, setYears] = useState(initialYears);

  const rawEmi = calculateEmi(loanLakhs * 100000, 8.5, years);
  const [displayEmi, setDisplayEmi] = useState(rawEmi);

  const totalPayment = rawEmi * years * 12;
  const totalInterest = Math.max(0, totalPayment - loanLakhs * 100000);

  const loanSliderId = useId();
  const tenureSliderId = useId();
  const prevEmiRef = useState({ current: rawEmi })[0];

  // Smooth number transition (200ms)
  useEffect(() => {
    if (prefersReduced) {
      setDisplayEmi(rawEmi);
      prevEmiRef.current = rawEmi;
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = prevEmiRef.current || rawEmi;
    const endValue = rawEmi;
    const duration = 200;

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
  }, [rawEmi, prevEmiRef, prefersReduced]);

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

      {/* Compare Current Home-Loan Rates Panel */}
      {!compact && (
        <div className="col-span-full mt-4 rounded-xs border border-border bg-card p-6 shadow-xs lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                <Landmark className="size-3.5" />
                West Bengal Lending Benchmarks
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                Compare Current Home Loan Rates
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Indicative floating rates as of October 2026 for properties with approved municipal blueprints.
              </p>
            </div>

            <a
              href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20guidance%20on%20home%20loan%20rates%20and%20bank%20pre-approvals%20for%20a%20loan%20of%20approx%20INR%20${loanLakhs}%20Lakhs.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#128C7E] transition-colors shrink-0"
            >
              Loan Advisory on WhatsApp
            </a>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[550px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 pr-4 font-semibold uppercase tracking-wider">Lending Institution</th>
                  <th className="px-4 py-2.5 font-semibold uppercase tracking-wider">Interest Rate (p.a.)</th>
                  <th className="px-4 py-2.5 font-semibold uppercase tracking-wider">Max Tenure</th>
                  <th className="px-4 py-2.5 font-semibold uppercase tracking-wider">Processing Fee</th>
                  <th className="px-4 py-2.5 font-semibold uppercase tracking-wider">Special Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-foreground">State Bank of India (SBI)</td>
                  <td className="px-4 py-3 font-mono font-bold text-primary">8.50% – 9.15%</td>
                  <td className="px-4 py-3 text-muted-foreground">30 Years</td>
                  <td className="px-4 py-3 text-muted-foreground">0.15% (Min ₹2,000)</td>
                  <td className="px-4 py-3 text-accent font-medium">Lowest benchmark rate for CIBIL &gt; 750</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-foreground">HDFC Bank</td>
                  <td className="px-4 py-3 font-mono font-bold text-primary">8.70% – 9.40%</td>
                  <td className="px-4 py-3 text-muted-foreground">30 Years</td>
                  <td className="px-4 py-3 text-muted-foreground">Up to 0.50%</td>
                  <td className="px-4 py-3 text-muted-foreground">Speedy in-branch digital disbursement</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-foreground">ICICI Bank</td>
                  <td className="px-4 py-3 font-mono font-bold text-primary">8.75% – 9.45%</td>
                  <td className="px-4 py-3 text-muted-foreground">30 Years</td>
                  <td className="px-4 py-3 text-muted-foreground">0.50% – 1.00%</td>
                  <td className="px-4 py-3 text-muted-foreground">Pre-approved project files across Kolkata & New Town</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-foreground">Bank of Baroda</td>
                  <td className="px-4 py-3 font-mono font-bold text-primary">8.40% – 9.10%</td>
                  <td className="px-4 py-3 text-muted-foreground">30 Years</td>
                  <td className="px-4 py-3 text-muted-foreground">Nil during festive runs</td>
                  <td className="px-4 py-3 text-accent font-medium">0.05% concession for female primary applicants</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-foreground">Axis Bank</td>
                  <td className="px-4 py-3 font-mono font-bold text-primary">8.75% – 9.35%</td>
                  <td className="px-4 py-3 text-muted-foreground">30 Years</td>
                  <td className="px-4 py-3 text-muted-foreground">Up to 1.00%</td>
                  <td className="px-4 py-3 text-muted-foreground">12 EMI waivers on Shubh Aarambh schemes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground/80 leading-normal">
            * Disclaimer: Floating rates linked to RBI Repo rate. Actual sanctioned rate varies based on individual credit profile, debt-to-income ratio, and property legal title clearance. BariGhor provides complimentary document packaging without lender commissions.
          </p>
        </div>
      )}
    </div>
  );
}
