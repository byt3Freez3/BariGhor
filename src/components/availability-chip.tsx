import { CheckCircle2, Clock, Check, Slash } from "lucide-react";
import { Property, PropertyAvailability } from "@/lib/data";

export function getBudgetBandLabel(priceNumericLakhs: number): string {
  if (priceNumericLakhs < 25) return "Under ₹25 Lakh";
  if (priceNumericLakhs <= 50) return "₹25 – 50 Lakh";
  if (priceNumericLakhs <= 100) return "₹50 Lakh – 1.0 Cr";
  if (priceNumericLakhs <= 300) return "₹1.0 – 3.0 Cr";
  return "₹3.0 Cr & Above";
}

export function formatAvailabilityDate(isoDate: string): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

export function getSoldNotificationMessage(property: Property): string {
  const budgetBand = getBudgetBandLabel(property.priceNumericLakhs);
  return `Hi BariGhor, I noticed that "${property.title}" in ${property.locality} is marked as sold. Please notify me about similar homes in ${property.locality} in the ${budgetBand} band (${property.price}).`;
}

interface AvailabilityChipProps {
  availability: PropertyAvailability;
  unitsTotal?: number;
  unitsRemaining?: number;
  size?: "sm" | "md";
  className?: string;
}

export function AvailabilityChip({
  availability,
  unitsTotal,
  unitsRemaining,
  size = "sm",
  className = "",
}: AvailabilityChipProps) {
  const hasRemainingUnits =
    typeof unitsRemaining === "number" && typeof unitsTotal === "number" && unitsTotal > 0;

  const isSmall = size === "sm";

  // Lightness + hue + distinct typography + distinct icons for 100% greyscale accessibility
  switch (availability) {
    case "under_offer":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-xs border border-amber-400/80 bg-amber-50 text-amber-900 shadow-xs dark:border-amber-600 dark:bg-amber-950/60 dark:text-amber-200 ${
            isSmall ? "px-2 py-0.5 text-[11px] font-medium" : "px-3 py-1 text-xs font-semibold"
          } ${className}`}
        >
          <Clock className={isSmall ? "size-3 text-amber-700 dark:text-amber-400" : "size-3.5 text-amber-700"} />
          <span>Under offer</span>
          {hasRemainingUnits && (
            <span className="font-semibold text-amber-950 dark:text-amber-200">
              · {unitsRemaining} of {unitsTotal} units remaining
            </span>
          )}
        </span>
      );

    case "token_received":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-xs border-2 border-amber-600 bg-amber-200 text-amber-950 shadow-xs dark:border-amber-500 dark:bg-amber-900/80 dark:text-amber-100 ${
            isSmall ? "px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide" : "px-3.5 py-1 text-xs font-extrabold tracking-wide"
          } ${className}`}
        >
          <CheckCircle2 className={isSmall ? "size-3 text-amber-900 dark:text-amber-200" : "size-3.5"} />
          <span className="uppercase text-[10px] tracking-wider">Token received</span>
        </span>
      );

    case "sold":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-xs border border-zinc-400 bg-zinc-200/90 text-zinc-700 shadow-xs dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 ${
            isSmall ? "px-2 py-0.5 text-[11px] font-medium" : "px-3 py-1 text-xs font-medium"
          } ${className}`}
        >
          <Slash className={isSmall ? "size-3 text-zinc-600 dark:text-zinc-400" : "size-3.5"} />
          <span>Sold</span>
        </span>
      );

    case "available":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-xs border border-teal-300 bg-teal-50 text-teal-800 shadow-xs dark:border-teal-700 dark:bg-teal-950/50 dark:text-teal-300 ${
            isSmall ? "px-2 py-0.5 text-[11px] font-normal" : "px-3 py-1 text-xs font-normal"
          } ${className}`}
        >
          <Check className={isSmall ? "size-3 text-teal-600 dark:text-teal-400" : "size-3.5 text-teal-600"} />
          <span>Available</span>
          {hasRemainingUnits && (
            <span className="font-semibold text-teal-900 dark:text-teal-200">
              · {unitsRemaining} of {unitsTotal} units remaining
            </span>
          )}
        </span>
      );
  }
}
