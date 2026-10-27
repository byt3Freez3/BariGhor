import { useMemo } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import {
  computePriceBenchmarkComparison,
  getBenchmarkForLocality,
} from "@/data/market-benchmarks";

interface MarketPriceBenchmarkProps {
  pricePerSqFt?: number;
  localitySlug?: string;
  localityName?: string;
  className?: string;
  variant?: "card" | "detail";
}

export function BenchmarkDeltaIndicator({
  direction,
  className = "size-3.5",
}: {
  direction: "above" | "below" | "equal";
  className?: string;
}) {
  switch (direction) {
    case "below":
      return <TrendingDown className={`${className} shrink-0 text-emerald-600 dark:text-emerald-400`} aria-label="Below average" />;
    case "above":
      return <TrendingUp className={`${className} shrink-0 text-amber-600 dark:text-amber-400`} aria-label="Above average" />;
    case "equal":
    default:
      return <Minus className={`${className} shrink-0 text-zinc-500 dark:text-zinc-400`} aria-label="Equal to average" />;
  }
}

export function MarketPriceBenchmark({
  pricePerSqFt,
  localitySlug,
  localityName,
  className = "",
  variant = "card",
}: MarketPriceBenchmarkProps) {
  const benchmark = useMemo(() => {
    return getBenchmarkForLocality(localitySlug);
  }, [localitySlug]);

  const comparison = useMemo(() => {
    if (!pricePerSqFt || !benchmark) return undefined;
    return computePriceBenchmarkComparison(pricePerSqFt, benchmark, localityName);
  }, [pricePerSqFt, benchmark, localityName]);

  if (!pricePerSqFt) return null;

  const isCard = variant === "card";

  // If no benchmark exists, render rate alone without comparison block and without empty space
  if (!comparison) {
    return (
      <span className={`font-medium text-muted-foreground ${isCard ? "text-xs" : "text-sm"} ${className}`}>
        ₹{pricePerSqFt.toLocaleString("en-IN")}/sq ft
      </span>
    );
  }

  const directionColorClass =
    comparison.direction === "below"
      ? "text-emerald-700 dark:text-emerald-400"
      : comparison.direction === "above"
      ? "text-amber-700 dark:text-amber-400"
      : "text-muted-foreground";

  if (isCard) {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="text-xs font-semibold text-muted-foreground">
          ₹{pricePerSqFt.toLocaleString("en-IN")}/sq ft
        </span>
        <div className="flex flex-col gap-0.5 rounded-xs border border-border/60 bg-muted/30 px-2 py-1.5 text-[11px] leading-tight">
          <div className={`flex items-center gap-1 font-semibold ${directionColorClass}`}>
            <BenchmarkDeltaIndicator direction={comparison.direction} className="size-3.5" />
            <span className="break-words">{comparison.label}</span>
          </div>
          <div className="text-[10px] text-muted-foreground break-words">
            {comparison.sourceLabel} · as of {comparison.formattedDate}
            {comparison.isStale && (
              <span className="font-semibold text-amber-700 dark:text-amber-400"> (may be out of date)</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detail page presentation
  return (
    <div className={`mt-2 flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-muted-foreground">
        ₹{pricePerSqFt.toLocaleString("en-IN")}/sq ft built-up
      </span>
      <div className="flex flex-col gap-1 rounded-xs border border-border/80 bg-card p-3 text-xs shadow-xs sm:max-w-md">
        <div className={`flex items-center gap-1.5 font-bold ${directionColorClass}`}>
          <BenchmarkDeltaIndicator direction={comparison.direction} className="size-4" />
          <span>{comparison.label}</span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          {comparison.sourceLabel} · as of {comparison.formattedDate}
          {comparison.isStale && (
            <span className="font-semibold text-amber-700 dark:text-amber-400"> (may be out of date)</span>
          )}
        </div>
      </div>
    </div>
  );
}
