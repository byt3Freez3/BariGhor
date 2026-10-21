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

export interface ConfiguratorCopyText {
  badge: string;
  headline: string;
  headlineBn: string;
  subhead: string;
  tierStepTitle: string;
  tierStepDesc: string;
  comparisonStepTitle: string;
  comparisonStepDesc: string;
  addOnStepTitle: string;
  addOnStepDesc: (category: string) => string;
  estimatedCostTitle: string;
  benchmarkLabels: {
    price: string;
    comfort: string;
    design: string;
    materialQuality: string;
  };
}

export interface ConfiguratorCommonCopy {
  disclaimer: string;
  disclaimerBn: string;
  costMatrixTitle: string;
  liveConfigTitle: string;
  propertyPriceTitle: string;
  separateFinancingBadge: string;
  separateFinancingNote: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  warrantyBadge: string;
  autosaveBadge: string;
  noAddOnsSelected: string;
  activeTierBadge: string;
  keyInclusionsTitle: string;
}

export const CONFIGURATOR_COPY: {
  interiors: ConfiguratorCopyText;
  construction: ConfiguratorCopyText;
  common: ConfiguratorCommonCopy;
} = {
  interiors: {
    badge: "Unified Interior Architecture",
    headline: "Interiors by the team that built it.",
    headlineBn: "যে টিম বাড়িটি বানিয়েছে, তাদেরই ইন্টেরিয়র।",
    subhead:
      "One accountable team, one integrated warranty, and zero coordination friction between separate vendors. We deliver finished keys, crafted to the exact structural tolerances of your home.",
    tierStepTitle: "1. Select Service Package Tier",
    tierStepDesc: "Choose an architectural tier suited to your lifestyle and finishes",
    comparisonStepTitle: "2. Tier Specification Comparison",
    comparisonStepDesc:
      "Comparing BariGhor's internal craftsmanship tiers across four engineering benchmarks",
    addOnStepTitle: "3. Custom Add-Ons & Enhancements",
    addOnStepDesc: (category: string) =>
      `Handpicked upgrades matched specifically to this ${category.replace("_", " ")}`,
    estimatedCostTitle: "Estimated Interiors Cost",
    benchmarkLabels: {
      price: "Indicative Price",
      comfort: "Comfort & Acoustic",
      design: "Architectural Design",
      materialQuality: "Material Grade",
    },
  },
  construction: {
    badge: "Unified Construction Suite",
    headline: "Built by the team that planned it.",
    headlineBn: "আপনার প্লটে আর্কিটেকচারাল নির্মাণ — বাড়িঘরের বিশ্বস্ততায়।",
    subhead:
      "One accountable engineering team, one master structural warranty, and zero vendor coordination friction. From soil testing to finished turnkey handover, your plot is engineered to Seismic Zone IV standards.",
    tierStepTitle: "1. Select Construction Package Tier",
    tierStepDesc: "Choose a structural and civil engineering tier suited to your plot",
    comparisonStepTitle: "2. Tier Specification Comparison",
    comparisonStepDesc:
      "Comparing BariGhor's internal construction tiers across four engineering benchmarks",
    addOnStepTitle: "3. Turnkey Civil & Site Add-Ons",
    addOnStepDesc: (category: string) =>
      `Turnkey civil and site infrastructure for this ${category.replace("_", " ")}`,
    estimatedCostTitle: "Estimated Construction Cost",
    benchmarkLabels: {
      price: "Indicative Price",
      comfort: "Structural & Thermal",
      design: "Civil & Elevation",
      materialQuality: "Cement & Steel Grade",
    },
  },
  common: {
    disclaimer: INDICATIVE_PRICE_DISCLAIMER,
    disclaimerBn: INDICATIVE_PRICE_DISCLAIMER_BN,
    costMatrixTitle: "Cost Estimation Matrix",
    liveConfigTitle: "Live Configuration",
    propertyPriceTitle: "Property Base Price",
    separateFinancingBadge: "Separate Financing",
    separateFinancingNote:
      "Shown separately — buyers finance property acquisition and execution packages through distinct bank loan / capital tranches.",
    primaryCtaLabel: "Enquire with my selection",
    secondaryCtaLabel: "Enquire about the property only",
    warrantyBadge: "One integrated warranty backed by BariGhor",
    autosaveBadge: "Selection saved automatically to your browser",
    noAddOnsSelected: "No optional add-ons selected",
    activeTierBadge: "Active Tier",
    keyInclusionsTitle: "Key Inclusions:",
  },
};

export const DISCOVERY_COPY = {
  interiors: {
    teaserHeadline: "Built by us. Furnish it with us too →",
    teaserHeadlineBn: "আমাদেরই নির্মাণ। ইন্টেরিয়রও হোক আমাদের বিশ্বস্ত কারিগরদের সাথে →",
    teaserCta: "Explore Integrated Interiors",
    nudgeLabel: "Scroll down to configure custom interiors ▾",
    stickyHeadline: (rate: number) => `Furnish this home from ₹${rate.toLocaleString("en-IN")}/sq ft →`,
  },
  construction: {
    teaserHeadline: "Demarcated plot. Build your architectural home with us too →",
    teaserHeadlineBn: "প্লট নির্বাচন সম্পন্ন? আর্কিটেকচারাল বাড়ি নির্মাণও হোক আমাদের সাথেই →",
    teaserCta: "Configure Construction Package",
    nudgeLabel: "Scroll to explore turnkey plot construction ▾",
    stickyHeadline: (rate: number) => `Build on this plot from ₹${rate.toLocaleString("en-IN")}/sq ft →`,
  },
};

export function getConfiguratorCopy(serviceType: ServiceType): ConfiguratorCopyText {
  return CONFIGURATOR_COPY[serviceType];
}

export function getDiscoveryCopy(serviceType: ServiceType) {
  return DISCOVERY_COPY[serviceType];
}

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
