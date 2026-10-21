import { describe, expect, it } from "vitest";
import {
  filterProperties,
  getDerivedPossessionStatus,
  properties,
  Property,
} from "@/lib/data";
import { cities, getCityBySlug, getCitiesByTier, getLiveCities } from "@/lib/regions";
import { formatINR } from "@/lib/utils";

describe("formatINR Currency Formatter", () => {
  it("formats values under 100 Lakhs as Lakhs with ₹ prefix", () => {
    expect(formatINR(22)).toBe("₹22 Lakh");
    expect(formatINR(45)).toBe("₹45 Lakh");
    expect(formatINR(85)).toBe("₹85 Lakh");
  });

  it("formats values of 100 Lakhs and above as Crores with trailing zero trimming", () => {
    expect(formatINR(100)).toBe("₹1 Cr");
    expect(formatINR(105)).toBe("₹1.05 Cr");
    expect(formatINR(185)).toBe("₹1.85 Cr");
    expect(formatINR(650)).toBe("₹6.50 Cr");
  });
});

describe("getDerivedPossessionStatus Possession Derivation", () => {
  it("derives Ready to move for past or current year dates (<= 2026) and explicit keywords", () => {
    expect(getDerivedPossessionStatus("Ready to move")).toBe("Ready to move");
    expect(getDerivedPossessionStatus("Immediate Possession")).toBe("Ready to move");
    expect(getDerivedPossessionStatus("June 2026")).toBe("Ready to move");
    expect(getDerivedPossessionStatus("December 2025")).toBe("Ready to move");
  });

  it("derives Possession 2027 strictly for 2027 dates", () => {
    expect(getDerivedPossessionStatus("Mid 2027")).toBe("Possession 2027");
    expect(getDerivedPossessionStatus("December 2027")).toBe("Possession 2027");
  });

  it("derives Possession 2028+ for dates in 2028 and beyond", () => {
    expect(getDerivedPossessionStatus("March 2028")).toBe("Possession 2028+");
    expect(getDerivedPossessionStatus("Late 2029")).toBe("Possession 2028+");
  });
});

describe("West Bengal Regions & Tier Hierarchy Model", () => {
  it("contains exactly 11 active cities across West Bengal", () => {
    expect(cities.length).toBe(11);
    expect(getLiveCities().length).toBe(11);
  });

  it("has exactly 3 Tier-1 metropolises (Kolkata, Howrah, New Town)", () => {
    const tier1 = getCitiesByTier(1);
    expect(tier1.length).toBe(3);
    const slugs = tier1.map((c) => c.slug);
    expect(slugs).toContain("kolkata");
    expect(slugs).toContain("howrah");
    expect(slugs).toContain("new-town");
  });

  it("has exactly 8 Tier-2 growth corridor cities", () => {
    const tier2 = getCitiesByTier(2);
    expect(tier2.length).toBe(8);
    const slugs = tier2.map((c) => c.slug);
    expect(slugs).toContain("asansol");
    expect(slugs).toContain("durgapur");
    expect(slugs).toContain("siliguri");
    expect(slugs).toContain("bardhaman");
    expect(slugs).toContain("malda");
    expect(slugs).toContain("baharampur");
    expect(slugs).toContain("habra");
    expect(slugs).toContain("kharagpur");
  });

  it("resolves cities correctly by slug", () => {
    const kolkata = getCityBySlug("kolkata");
    expect(kolkata).toBeDefined();
    expect(kolkata?.nameEn).toBe("Kolkata");
    expect(kolkata?.nameBn).toBe("কলকাতা");
    expect(kolkata?.avgPricePerSqft).toBeGreaterThan(0);

    const siliguri = getCityBySlug("siliguri");
    expect(siliguri).toBeDefined();
    expect(siliguri?.district).toBe("Darjeeling & Jalpaiguri");
  });

  it("attaches populated localities to primary cities", () => {
    const kolkata = getCityBySlug("kolkata");
    expect(kolkata?.localities.length).toBeGreaterThan(0);
    expect(kolkata?.localities.some((l) => l.slug === "alipore")).toBe(true);

    const newTown = getCityBySlug("new-town");
    expect(newTown?.localities.length).toBeGreaterThan(0);
  });
});

describe("filterProperties Filtering Engine", () => {
  it("filters properties by city slug accurately", () => {
    const kolkataProps = filterProperties({ citySlug: "kolkata" });
    expect(kolkataProps.length).toBeGreaterThan(0);
    kolkataProps.forEach((p) => {
      const city = p.citySlug || (p.localitySlug === "new-town" ? "new-town" : "kolkata");
      expect(city).toBe("kolkata");
    });

    const newTownProps = filterProperties({ citySlug: "new-town" });
    expect(newTownProps.length).toBeGreaterThan(0);
    newTownProps.forEach((p) => {
      expect(p.citySlug).toBe("new-town");
    });
  });

  it("filters properties by verifiedOnly flag", () => {
    const verifiedOnlyProps = filterProperties({ verifiedOnly: true });
    expect(verifiedOnlyProps.length).toBeGreaterThan(0);
    verifiedOnlyProps.forEach((p) => {
      expect(p.verified).toBe(true);
    });
  });

  it("filters properties by budget bands correctly", () => {
    const under25l = filterProperties({ budget: "under-25l" });
    under25l.forEach((p) => {
      expect(p.priceNumericLakhs).toBeLessThanOrEqual(25);
    });

    const band25to50 = filterProperties({ budget: "25l-50l" });
    band25to50.forEach((p) => {
      expect(p.priceNumericLakhs).toBeGreaterThanOrEqual(25);
      expect(p.priceNumericLakhs).toBeLessThanOrEqual(50);
    });

    const band50to1cr = filterProperties({ budget: "50l-1cr" });
    band50to1cr.forEach((p) => {
      expect(p.priceNumericLakhs).toBeGreaterThanOrEqual(50);
      expect(p.priceNumericLakhs).toBeLessThanOrEqual(100);
    });

    const band1to3cr = filterProperties({ budget: "1cr-3cr" });
    band1to3cr.forEach((p) => {
      expect(p.priceNumericLakhs).toBeGreaterThanOrEqual(100);
      expect(p.priceNumericLakhs).toBeLessThanOrEqual(300);
    });

    const band3crPlus = filterProperties({ budget: "3cr-plus" });
    band3crPlus.forEach((p) => {
      expect(p.priceNumericLakhs).toBeGreaterThanOrEqual(300);
    });
  });

  it("filters properties by BHK count correctly", () => {
    const oneBhk = filterProperties({ bhk: "1 BHK" });
    oneBhk.forEach((p) => {
      expect(p.bhkCount).toBe(1);
    });

    const twoBhk = filterProperties({ bhk: "2 BHK" });
    twoBhk.forEach((p) => {
      expect(p.bhkCount).toBe(2);
    });

    const threeBhk = filterProperties({ bhk: "3 BHK" });
    threeBhk.forEach((p) => {
      expect(p.bhkCount).toBe(3);
    });

    const fourBhkPlus = filterProperties({ bhk: "4 BHK+" });
    fourBhkPlus.forEach((p) => {
      expect(p.bhkCount).toBeGreaterThanOrEqual(4);
    });
  });

  it("filters properties by propertyType", () => {
    const plots = filterProperties({ propertyType: "Plot" });
    plots.forEach((p) => {
      expect(p.propertyType).toBe("Plot");
    });

    const commercial = filterProperties({ propertyType: "Commercial" });
    commercial.forEach((p) => {
      expect(p.propertyType).toBe("Commercial");
    });
  });
});

describe("Property Inventory Data Invariants", () => {
  it("every property has required fields, valid price, and WBRERA registration format", () => {
    properties.forEach((p: Property) => {
      expect(p.id).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.bengaliTitle).toBeTruthy();
      expect(p.locality).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.priceNumericLakhs).toBeGreaterThan(0);
      expect(p.sqft).toBeGreaterThan(0);
      expect(p.possessionDate).toBeTruthy();
      expect(p.image_url).toBeTruthy();
      expect(p.reraProjectNo).toMatch(/WBRERA/);
    });
  });
});

import fs from "node:fs";
import path from "node:path";
import { MOTION_DURATIONS, MOTION_DURATIONS_MS, MOTION_EASINGS } from "@/lib/motion";
import { PropertyCardSkeleton } from "@/components/property-card";
import { AnimatedPropertyGrid } from "@/components/animated-property-grid";
import { CountUp } from "@/components/count-up";
import { BlurImage } from "@/components/blur-image";
import { Reveal } from "@/components/reveal";

describe("Motion Token System Invariants (Step 0 - Step 9)", () => {
  it("defines strictly allowed durations with none exceeding 600ms", () => {
    expect(MOTION_DURATIONS_MS.fast).toBe(150);
    expect(MOTION_DURATIONS_MS.base).toBe(250);
    expect(MOTION_DURATIONS_MS.slow).toBe(400);
    expect(MOTION_DURATIONS_MS.page).toBe(500);

    expect(MOTION_DURATIONS.fast).toBe(0.15);
    expect(MOTION_DURATIONS.base).toBe(0.25);
    expect(MOTION_DURATIONS.slow).toBe(0.4);
    expect(MOTION_DURATIONS.page).toBe(0.5);

    Object.values(MOTION_DURATIONS_MS).forEach((duration) => {
      expect(duration).toBeLessThanOrEqual(600);
      expect(duration).toBeGreaterThanOrEqual(100);
    });
  });

  it("defines strict cubic-bezier deceleration curves without spring or overshoot", () => {
    expect(MOTION_EASINGS.premium).toEqual([0.22, 1, 0.36, 1]);
    expect(MOTION_EASINGS.out).toEqual([0.16, 1, 0.3, 1]);
    expect(MOTION_EASINGS.in).toEqual([0.7, 0, 0.84, 0]);
  });

  it("ensures styles.css custom properties match exact token definitions", () => {
    const cssPath = path.resolve(process.cwd(), "src/styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain("--duration-fast: 150ms");
    expect(cssContent).toContain("--duration-base: 250ms");
    expect(cssContent).toContain("--duration-slow: 400ms");
    expect(cssContent).toContain("--duration-page: 500ms");

    expect(cssContent).toContain("--ease-premium: cubic-bezier(0.22, 1, 0.36, 1)");
    expect(cssContent).toContain("--ease-out: cubic-bezier(0.16, 1, 0.3, 1)");
    expect(cssContent).toContain("--ease-in: cubic-bezier(0.7, 0, 0.84, 0)");
  });

  it("ensures prefers-reduced-motion media query disables transforms and animations in styles.css", () => {
    const cssPath = path.resolve(process.cwd(), "src/styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssContent).toContain("animation-duration: 0.01ms !important");
    expect(cssContent).toContain("transition-duration: 0.01ms !important");
  });

  it("exports all motion-aware components cleanly", () => {
    expect(typeof PropertyCardSkeleton).toBe("function");
    expect(typeof AnimatedPropertyGrid).toBe("function");
    expect(typeof CountUp).toBe("function");
    expect(typeof BlurImage).toBe("function");
    expect(typeof Reveal).toBe("function");
  });
});

describe("BariGhor Architectural Services Data Model & Calculation Suite (Step 1-6)", () => {
  it("maps property categories to correct service types", async () => {
    const { getServiceTypeForCategory } = await import("@/data/services");
    expect(getServiceTypeForCategory("plot")).toBe("construction");
    expect(getServiceTypeForCategory("apartment")).toBe("interiors");
    expect(getServiceTypeForCategory("villa")).toBe("interiors");
    expect(getServiceTypeForCategory("independent_house")).toBe("interiors");
    expect(getServiceTypeForCategory("commercial")).toBe("interiors");
  });

  it("retrieves distinct interior vs construction package tiers", async () => {
    const { getServicePackages } = await import("@/data/services");
    const interiorPkgs = getServicePackages("interiors");
    expect(interiorPkgs.length).toBe(3);
    const interiorTiers = interiorPkgs.map((p) => p.tier);
    expect(interiorTiers).toEqual(["essential", "comfort", "premium"]);

    const constructionPkgs = getServicePackages("construction");
    expect(constructionPkgs.length).toBe(3);
    const constructionTiers = constructionPkgs.map((p) => p.tier);
    expect(constructionTiers).toEqual(["essential", "comfort", "premium"]);
  });

  it("filters add-ons accurately by serviceType and propertyCategory", async () => {
    const { getAddOnsForService } = await import("@/data/services");
    const apartmentAddOns = getAddOnsForService("interiors", "apartment");
    const apartmentIds = apartmentAddOns.map((a) => a.id);
    expect(apartmentIds).toContain("addon-modular-kitchen");
    expect(apartmentIds).toContain("addon-custom-wardrobes");
    // Empty plot boundary wall must NOT appear in apartment add-ons
    expect(apartmentIds).not.toContain("addon-boundary-wall");

    const plotAddOns = getAddOnsForService("construction", "plot");
    const plotIds = plotAddOns.map((a) => a.id);
    expect(plotIds).toContain("addon-boundary-wall");
    expect(plotIds).toContain("addon-landscaping");
    // Modular kitchen must NOT appear in plot add-ons
    expect(plotIds).not.toContain("addon-modular-kitchen");
  });

  it("computes package and add-on costs accurately", async () => {
    const { calculatePackageCost, calculateAddOnCost, getServicePackages, getAddOnsForService } =
      await import("@/data/services");
    const interiorPkg = getServicePackages("interiors")[0]; // essential (1250/sqft)
    expect(calculatePackageCost(interiorPkg, 1000)).toBe(1250000);

    // Fixed price add-on
    const fixedAddOn = getAddOnsForService("interiors", "apartment").find(
      (a) => a.priceUnit === "fixed"
    );
    if (fixedAddOn) {
      expect(calculateAddOnCost(fixedAddOn, 1500)).toBe(fixedAddOn.indicativePrice);
    }

    // Per sqft add-on
    const sqftAddOn = getAddOnsForService("interiors", "apartment").find(
      (a) => a.priceUnit === "per_sqft"
    );
    if (sqftAddOn) {
      expect(calculateAddOnCost(sqftAddOn, 1000)).toBe(sqftAddOn.indicativePrice * 1000);
    }
  });

  it("strictly enforces mandatory indicative price disclaimers and typed copy", async () => {
    const {
      INDICATIVE_PRICE_DISCLAIMER,
      INDICATIVE_PRICE_DISCLAIMER_BN,
      getConfiguratorCopy,
      getDiscoveryCopy,
    } = await import("@/data/services");

    expect(INDICATIVE_PRICE_DISCLAIMER).toBe("Indicative — final quote after site visit.");
    expect(INDICATIVE_PRICE_DISCLAIMER_BN).toContain("ইন্ডিকেটিভ");

    const interiorCopy = getConfiguratorCopy("interiors");
    expect(interiorCopy.headline).toBe("Interiors by the team that built it.");
    expect(interiorCopy.badge).toBe("Unified Interior Architecture");

    const constructionCopy = getConfiguratorCopy("construction");
    expect(constructionCopy.headline).toBe("Built by the team that planned it.");
    expect(constructionCopy.badge).toBe("Unified Construction Suite");

    const interiorDiscovery = getDiscoveryCopy("interiors");
    expect(interiorDiscovery.teaserHeadline).toContain("Built by us");

    const constructionDiscovery = getDiscoveryCopy("construction");
    expect(constructionDiscovery.teaserHeadline).toContain("Demarcated plot");
  });
});

describe("BariGhor Search & Fuzzy Matching Intelligence (Step 5)", () => {
  it("fuzzy matches queries with typos ('newtwon' -> 'New Town')", async () => {
    const { executeFuzzySearch } = await import("@/lib/search");
    const { results } = executeFuzzySearch("newtwon");
    expect(results.length).toBeGreaterThan(0);
    const hasNewTown = results.some(
      (r) =>
        r.item.title.toLowerCase().includes("new town") ||
        (r.item.locality && r.item.locality.toLowerCase().includes("new town"))
    );
    expect(hasNewTown).toBe(true);
  });

  it("ranks localities higher than descriptions due to field weights", async () => {
    const { executeFuzzySearch } = await import("@/lib/search");
    const { results } = executeFuzzySearch("Alipore");
    expect(results.length).toBeGreaterThan(0);
    // Top result should be the locality or property directly in Alipore
    const topResult = results[0];
    expect(topResult.item.type).toBe("locality");
    expect(topResult.item.title).toBe("Alipore");
  });

  it("handles empty or whitespace queries safely by returning empty list", async () => {
    const { executeFuzzySearch } = await import("@/lib/search");
    expect(executeFuzzySearch("").results).toEqual([]);
    expect(executeFuzzySearch("   ").results).toEqual([]);
  });

  it("manages recent searches safely without crashing when storage is unavailable", async () => {
    const { getRecentSearches, saveRecentSearch, clearRecentSearches } = await import(
      "@/lib/search"
    );
    expect(() => getRecentSearches()).not.toThrow();
    expect(() => saveRecentSearch("Salt Lake", "loc-salt-lake")).not.toThrow();
    expect(() => clearRecentSearches()).not.toThrow();
  });
});

describe("VideoBackdrop & WCAG 2.2 AA Contrast Mathematical Integrity", () => {
  // WCAG 2.2 Relative Luminance and Contrast Ratio formula
  function srgbToLin(c: number): number {
    const norm = c / 255.0;
    return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance(rgb: [number, number, number]): number {
    return 0.2126 * srgbToLin(rgb[0]) + 0.7152 * srgbToLin(rgb[1]) + 0.0722 * srgbToLin(rgb[2]);
  }

  function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
    const l1 = relativeLuminance(rgb1);
    const l2 = relativeLuminance(rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  const deepTeal: [number, number, number] = [10, 54, 50]; // #0A3632

  // Simulate worst-case brightest video frame highlight (pure white [255, 255, 255] and glowing mint [120, 255, 220])
  const testHighlights: [number, number, number][] = [
    [255, 255, 255], // Pure white specular highlight
    [120, 255, 220], // Bright mint caustic highlight
  ];

  it("passes WCAG AA contrast (>= 4.5:1) for all typography against the brightest possible video highlight", () => {
    testHighlights.forEach((highlight) => {
      // Layer 1: Flat wash 0.72
      const c1: [number, number, number] = [
        0.72 * deepTeal[0] + 0.28 * highlight[0],
        0.72 * deepTeal[1] + 0.28 * highlight[1],
        0.72 * deepTeal[2] + 0.28 * highlight[2],
      ];

      // Layer 2: Directional gradient in left text column (0.92 opacity)
      const cLeft: [number, number, number] = [
        0.92 * deepTeal[0] + 0.08 * c1[0],
        0.92 * deepTeal[1] + 0.08 * c1[1],
        0.92 * deepTeal[2] + 0.08 * c1[2],
      ];

      const whiteHeadline: [number, number, number] = [255, 255, 255]; // #FFFFFF
      const goldSubHeadline: [number, number, number] = [229, 184, 105]; // #E5B869
      const bodyCopy: [number, number, number] = [194, 209, 207]; // #C2D1CF
      const italicDisclaimer: [number, number, number] = [212, 163, 115]; // #D4A373

      const whiteContrast = getContrastRatio(whiteHeadline, cLeft);
      const goldContrast = getContrastRatio(goldSubHeadline, cLeft);
      const bodyContrast = getContrastRatio(bodyCopy, cLeft);
      const disclaimerContrast = getContrastRatio(italicDisclaimer, cLeft);

      // White headline passes AAA (>= 7:1)
      expect(whiteContrast).toBeGreaterThanOrEqual(12.0);

      // Gold sub-headline passes AA (>= 4.5:1)
      expect(goldContrast).toBeGreaterThanOrEqual(6.5);

      // Body copy passes AAA (>= 7:1)
      expect(bodyContrast).toBeGreaterThanOrEqual(7.5);

      // Small italic disclaimer passes AA (>= 4.5:1)
      expect(disclaimerContrast).toBeGreaterThanOrEqual(5.0);
    });
  });

  it("verifies public video assets are served from /video/ with exact filenames", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const videoDir = path.resolve(process.cwd(), "public/video");

    expect(fs.existsSync(path.join(videoDir, "hero-loop.mp4"))).toBe(true);
    expect(fs.existsSync(path.join(videoDir, "hero-loop.webm"))).toBe(true);
    expect(fs.existsSync(path.join(videoDir, "hero-poster.jpg"))).toBe(true);

    const mp4Size = fs.statSync(path.join(videoDir, "hero-loop.mp4")).size;
    const webmSize = fs.statSync(path.join(videoDir, "hero-loop.webm")).size;
    const posterSize = fs.statSync(path.join(videoDir, "hero-poster.jpg")).size;

    // Verify optimized target bounds
    expect(mp4Size).toBeLessThan(1_000_000); // < 1MB
    expect(webmSize).toBeLessThan(1_000_000); // < 1MB
    expect(posterSize).toBeLessThan(50_000); // < 50KB
  });
});



