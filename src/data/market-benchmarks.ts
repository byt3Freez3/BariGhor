/**
 * Market Price Benchmarks Model (Admin-Entered Public Data)
 *
 * Sourced strictly from verified official public records:
 * - NHB RESIDEX (National Housing Bank quarterly housing price index)
 * - RBI House Price Index (Reserve Bank of India quarterly dataset)
 * - West Bengal Directorate of Registration and Stamp Revenue (sanctioned circle rates)
 * - West Bengal Real Estate Regulatory Authority (WBRERA project registry filings)
 *
 * NOTE: Competitor portals (99acres, MagicBricks, Housing.com) are strictly prohibited
 * due to terms of use restrictions, lack of public APIs, bot protection, and reliance on
 * asking rates rather than verified transaction values.
 */

import { Property } from "@/lib/data";

export interface LocalityBenchmark {
  localitySlug: string;
  avgPricePerSqft: number;
  priceBandLow: number;
  priceBandHigh: number;
  yoyChangePercent: number;
  circleRatePerSqft?: number; // WB Directorate of Registration
  sourceLabel: string; // e.g. "NHB RESIDEX Q2 FY27"
  sourceUrl?: string;
  asOfDate: string; // ISO date string YYYY-MM-DD
  enteredBy: "admin";
}

export const LOCALITY_BENCHMARKS: LocalityBenchmark[] = [
  {
    localitySlug: "salt-lake",
    avgPricePerSqft: 14700,
    priceBandLow: 11000,
    priceBandHigh: 18500,
    yoyChangePercent: 7.2,
    circleRatePerSqft: 9800,
    sourceLabel: "NHB RESIDEX Q2 FY27",
    sourceUrl: "https://residex.nhbonline.org.in",
    asOfDate: "2026-07-15",
    enteredBy: "admin",
  },
  {
    localitySlug: "alipore",
    avgPricePerSqft: 24500,
    priceBandLow: 19000,
    priceBandHigh: 34000,
    yoyChangePercent: 5.8,
    circleRatePerSqft: 16500,
    sourceLabel: "WB Directorate of Registration",
    sourceUrl: "https://wbregistration.gov.in",
    asOfDate: "2026-08-01",
    enteredBy: "admin",
  },
  {
    localitySlug: "ballygunge",
    avgPricePerSqft: 18200,
    priceBandLow: 14000,
    priceBandHigh: 25000,
    yoyChangePercent: 6.4,
    circleRatePerSqft: 12500,
    sourceLabel: "NHB RESIDEX Q2 FY27",
    sourceUrl: "https://residex.nhbonline.org.in",
    asOfDate: "2026-07-15",
    enteredBy: "admin",
  },
  {
    localitySlug: "new-town",
    avgPricePerSqft: 7900,
    priceBandLow: 5800,
    priceBandHigh: 11500,
    yoyChangePercent: 9.1,
    circleRatePerSqft: 5200,
    sourceLabel: "RBI House Price Index Q2 2026",
    sourceUrl: "https://dbie.rbi.org.in",
    asOfDate: "2026-07-30",
    enteredBy: "admin",
  },
  {
    localitySlug: "rajarhat",
    avgPricePerSqft: 6800,
    priceBandLow: 4900,
    priceBandHigh: 9200,
    yoyChangePercent: 8.4,
    circleRatePerSqft: 4500,
    sourceLabel: "WBRERA Registered Project Filings",
    sourceUrl: "https://rera.wb.gov.in",
    asOfDate: "2026-08-15",
    enteredBy: "admin",
  },
  {
    localitySlug: "tollygunge",
    avgPricePerSqft: 9800,
    priceBandLow: 7500,
    priceBandHigh: 13500,
    yoyChangePercent: 6.9,
    circleRatePerSqft: 6800,
    sourceLabel: "NHB RESIDEX Q2 FY27",
    sourceUrl: "https://residex.nhbonline.org.in",
    asOfDate: "2026-07-15",
    enteredBy: "admin",
  },
];

export function getBenchmarkForLocality(localitySlug?: string): LocalityBenchmark | undefined {
  if (!localitySlug) return undefined;
  const normalized = localitySlug.toLowerCase().trim();
  return LOCALITY_BENCHMARKS.find((b) => b.localitySlug === normalized);
}

/**
 * Staleness Guard: Checks if a benchmark is older than 180 days.
 * Emits a dev warning if stale.
 */
export function isBenchmarkStale(
  benchmark: LocalityBenchmark,
  referenceDate = new Date()
): boolean {
  if (!benchmark || !benchmark.asOfDate) return false;
  const asOf = new Date(benchmark.asOfDate);
  if (isNaN(asOf.getTime())) return false;

  const diffMs = referenceDate.getTime() - asOf.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const isStale = diffDays > 180;

  if (isStale && typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
    // Development warning
    console.warn(
      `[BariGhor Market Benchmark Guard] Benchmark for "${benchmark.localitySlug}" as of ${benchmark.asOfDate} is older than 180 days (${diffDays} days old) and may be out of date.`
    );
  }

  return isStale;
}

/**
 * Formats an ISO date into a localized "Mon YYYY" string (e.g. "Jul 2026")
 */
export function formatBenchmarkDate(asOfDate: string): string {
  if (!asOfDate) return "";
  try {
    const d = new Date(asOfDate);
    if (isNaN(d.getTime())) return asOfDate;
    return d.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return asOfDate;
  }
}

export interface BenchmarkComparisonResult {
  percentDelta: number;
  direction: "above" | "below" | "equal";
  benchmarkAvg: number;
  label: string;
  sourceLabel: string;
  sourceUrl?: string;
  asOfDate: string;
  formattedDate: string;
  isStale: boolean;
  localityName: string;
}

/**
 * Computes client-side percentage delta between property rate and locality benchmark.
 * Never hardcodes deltas. Returns undefined if benchmark is missing.
 */
export function computePriceBenchmarkComparison(
  pricePerSqft?: number,
  benchmark?: LocalityBenchmark,
  localityName?: string
): BenchmarkComparisonResult | undefined {
  if (!pricePerSqft || !benchmark || typeof benchmark.avgPricePerSqft !== "number") {
    return undefined;
  }

  const benchmarkAvg = benchmark.avgPricePerSqft;
  if (benchmarkAvg <= 0) return undefined;

  const delta = pricePerSqft - benchmarkAvg;
  const rawPercent = (Math.abs(delta) / benchmarkAvg) * 100;
  const percentDelta = Math.round(rawPercent);
  const locLabel = localityName || benchmark.localitySlug;
  const formattedBenchmarkAvg = `₹${benchmarkAvg.toLocaleString("en-IN")}`;
  const isStale = isBenchmarkStale(benchmark);
  const formattedDate = formatBenchmarkDate(benchmark.asOfDate);

  if (delta > 0) {
    return {
      percentDelta,
      direction: "above",
      benchmarkAvg,
      label: `${percentDelta}% above the ${locLabel} average (${formattedBenchmarkAvg})`,
      sourceLabel: benchmark.sourceLabel,
      sourceUrl: benchmark.sourceUrl,
      asOfDate: benchmark.asOfDate,
      formattedDate,
      isStale,
      localityName: locLabel,
    };
  }

  if (delta < 0) {
    return {
      percentDelta,
      direction: "below",
      benchmarkAvg,
      label: `${percentDelta}% below the ${locLabel} average (${formattedBenchmarkAvg})`,
      sourceLabel: benchmark.sourceLabel,
      sourceUrl: benchmark.sourceUrl,
      asOfDate: benchmark.asOfDate,
      formattedDate,
      isStale,
      localityName: locLabel,
    };
  }

  return {
    percentDelta: 0,
    direction: "equal",
    benchmarkAvg,
    label: `Matching the ${locLabel} average (${formattedBenchmarkAvg})`,
    sourceLabel: benchmark.sourceLabel,
    sourceUrl: benchmark.sourceUrl,
    asOfDate: benchmark.asOfDate,
    formattedDate,
    isStale,
    localityName: locLabel,
  };
}

export interface MarketAggregateSummary {
  count: number;
  countLabel: string;
  medianRate: number | null;
  benchmark?: LocalityBenchmark;
  formattedText: string;
}

/**
 * Recomputes aggregate market metric for visible properties set.
 * E.g., "12 homes · median ₹12,400/sq ft · Salt Lake average ₹14,700"
 */
export function computeMarketAggregate(
  visibleProperties: Property[],
  localityFilter?: string
): MarketAggregateSummary | null {
  if (!visibleProperties || visibleProperties.length === 0) {
    return null;
  }

  const count = visibleProperties.length;
  const countLabel = count === 1 ? "1 home" : `${count} homes`;

  const rates = visibleProperties
    .map((p) => p.pricePerSqFt)
    .filter((r): r is number => typeof r === "number" && r > 0)
    .sort((a, b) => a - b);

  let medianRate: number | null = null;
  if (rates.length > 0) {
    const mid = Math.floor(rates.length / 2);
    medianRate =
      rates.length % 2 !== 0
        ? rates[mid]
        : Math.round((rates[mid - 1] + rates[mid]) / 2);
  }

  // Determine target locality for average reference
  let targetLocalitySlug: string | undefined = undefined;
  let targetLocalityName: string | undefined = undefined;

  if (
    localityFilter &&
    localityFilter !== "all" &&
    localityFilter !== "All Localities" &&
    localityFilter !== "All Neighbourhoods"
  ) {
    targetLocalitySlug = localityFilter.toLowerCase().replace(/\s+/g, "-");
    const matchingProp = visibleProperties.find(
      (p) =>
        p.localitySlug === targetLocalitySlug ||
        p.locality.toLowerCase() === localityFilter.toLowerCase()
    );
    targetLocalityName = matchingProp?.locality || localityFilter;
  } else {
    // If all visible properties are in the same locality, use that locality
    const firstSlug = visibleProperties[0]?.localitySlug;
    if (firstSlug && visibleProperties.every((p) => p.localitySlug === firstSlug)) {
      targetLocalitySlug = firstSlug;
      targetLocalityName = visibleProperties[0]?.locality;
    }
  }

  const benchmark = targetLocalitySlug
    ? getBenchmarkForLocality(targetLocalitySlug)
    : undefined;

  let formattedText = countLabel;
  if (medianRate) {
    formattedText += ` · median ₹${medianRate.toLocaleString("en-IN")}/sq ft`;
  }
  if (benchmark) {
    const locName = targetLocalityName || benchmark.localitySlug;
    formattedText += ` · ${locName} average ₹${benchmark.avgPricePerSqft.toLocaleString("en-IN")}`;
  }

  return {
    count,
    countLabel,
    medianRate,
    benchmark,
    formattedText,
  };
}
