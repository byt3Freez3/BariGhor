import type { PropertyCategory } from "@/lib/data";
import {
  PLACEHOLDER_SERVICE_PACKAGES,
  PLACEHOLDER_ADD_ONS,
  type ServicePackage,
  type AddOn,
  type ComparisonMetrics,
} from "./services-placeholder";

export type { ServicePackage, AddOn, ComparisonMetrics };

export type ServiceType = "interiors" | "construction";
export type ServiceTier = "essential" | "comfort" | "premium";
export type PriceUnit = "fixed" | "per_sqft";

/**
 * MANDATORY LEGAL REQUIREMENT:
 * Every price displayed anywhere must carry or sit under this disclaimer line.
 */
export const INDICATIVE_PRICE_DISCLAIMER = "Indicative — final quote after site visit.";
export const INDICATIVE_PRICE_DISCLAIMER_BN = "ইন্ডিকেটিভ — সাইট পরিদর্শনের পর চূড়ান্ত কোটেশন।";

export const servicePackages: ServicePackage[] = PLACEHOLDER_SERVICE_PACKAGES;
export const addOns: AddOn[] = PLACEHOLDER_ADD_ONS;

export function getServicePackages(serviceType: ServiceType): ServicePackage[] {
  return servicePackages.filter((pkg) => pkg.serviceType === serviceType);
}

export function getAddOnsForService(
  serviceType: ServiceType,
  category?: PropertyCategory
): AddOn[] {
  return addOns.filter((addon) => {
    if (addon.serviceType !== serviceType) return false;
    if (category && !addon.appliesTo.includes(category)) return false;
    return true;
  });
}

export function getServiceTypeForCategory(category: PropertyCategory): ServiceType {
  switch (category) {
    case "plot":
      return "construction";
    case "apartment":
    case "villa":
    case "independent_house":
    case "commercial":
    default:
      return "interiors";
  }
}

export function calculateAddOnCost(addon: AddOn, areaSqft: number): number {
  if (addon.priceUnit === "fixed") {
    return addon.indicativePrice;
  }
  // For per_sqft add-ons, area applies
  return Math.round(addon.indicativePrice * areaSqft);
}

export function calculatePackageCost(pkg: ServicePackage, areaSqft: number): number {
  return Math.round(pkg.indicativePricePerSqft * areaSqft);
}
