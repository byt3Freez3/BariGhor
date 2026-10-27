import { useMemo } from "react";
import { BarChart2 } from "lucide-react";
import { Property } from "@/lib/data";
import {
  computeMarketAggregate,
  formatBenchmarkDate,
  isBenchmarkStale,
} from "@/data/market-benchmarks";

interface MarketAggregateBarProps {
  properties: Property[];
  localityFilter?: string;
  className?: string;
}

export function MarketAggregateBar({
  properties,
  localityFilter,
  className = "",
}: MarketAggregateBarProps) {
  const aggregate = useMemo(() => {
    return computeMarketAggregate(properties, localityFilter);
  }, [properties, localityFilter]);

  if (!aggregate) return null;

  return (
    <div
      className={`mb-6 flex flex-wrap items-center justify-between gap-2.5 rounded-xs border border-border/80 bg-card px-4 py-3 shadow-xs ${className}`}
      data-testid="market-aggregate-bar"
    >
      <div className="flex items-center gap-2 text-xs font-semibold text-foreground sm:text-sm">
        <BarChart2 className="size-4 shrink-0 text-accent" />
        <span className="tracking-tight">{aggregate.formattedText}</span>
      </div>

      {aggregate.benchmark && (
        <div className="text-[11px] text-muted-foreground">
          <span>
            {aggregate.benchmark.sourceLabel} · as of {formatBenchmarkDate(aggregate.benchmark.asOfDate)}
          </span>
          {isBenchmarkStale(aggregate.benchmark) && (
            <span className="font-semibold text-amber-700 dark:text-amber-400"> (may be out of date)</span>
          )}
        </div>
      )}
    </div>
  );
}
