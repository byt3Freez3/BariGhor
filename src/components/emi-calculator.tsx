import { useMemo, useState } from "react";
import { IndianRupee } from "lucide-react";

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const rate = annualRate / 1200;
  const months = years * 12;
  return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
}

export function EmiCalculator({ compact = false }: { compact?: boolean }) {
  const [loanLakhs, setLoanLakhs] = useState(105);
  const [years, setYears] = useState(20);
  const emi = useMemo(() => Math.round(monthlyPayment(loanLakhs * 100000, 8.5, years)), [loanLakhs, years]);

  return (
    <div className={compact ? "" : "grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center"}>
      {!compact ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-copper">Price transparency</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight md:text-6xl">Know the monthly number before the visit.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">A clear starting estimate—no forms, phone numbers, or hidden conditions.</p>
        </div>
      ) : null}
      <div className="border border-border bg-card p-6 lift-shadow md:p-9">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Estimated monthly EMI</p><p className="mt-2 flex items-center font-display text-4xl text-primary md:text-5xl"><IndianRupee className="size-7 md:size-8" />{emi.toLocaleString("en-IN")}</p></div>
          <span className="bg-sage px-3 py-1.5 text-xs font-semibold text-sage-foreground">at 8.5% p.a.</span>
        </div>
        <label className="mt-7 block text-sm font-semibold" htmlFor={`loan-${compact}`}>Loan amount <span className="float-right text-copper">₹{loanLakhs} lakh</span></label>
        <input id={`loan-${compact}`} className="mt-3 w-full accent-copper" type="range" min="25" max="200" step="5" value={loanLakhs} onChange={(event) => setLoanLakhs(Number(event.target.value))} />
        <label className="mt-7 block text-sm font-semibold" htmlFor={`term-${compact}`}>Loan tenure <span className="float-right text-copper">{years} years</span></label>
        <input id={`term-${compact}`} className="mt-3 w-full accent-copper" type="range" min="5" max="30" step="1" value={years} onChange={(event) => setYears(Number(event.target.value))} />
        <p className="mt-6 text-xs leading-5 text-muted-foreground">Indicative estimate only. Final rates and eligibility depend on your lender.</p>
      </div>
    </div>
  );
}
