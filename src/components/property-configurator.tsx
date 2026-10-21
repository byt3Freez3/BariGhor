import { useEffect, useId, useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Info,
  Layers,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Property, PropertyCategory } from "@/lib/data";
import {
  getServicePackages,
  getAddOnsForService,
  getServiceTypeForCategory,
  calculatePackageCost,
  calculateAddOnCost,
  getConfiguratorCopy,
  CONFIGURATOR_COPY,
  INDICATIVE_PRICE_DISCLAIMER,
  INDICATIVE_PRICE_DISCLAIMER_BN,
  type ServicePackage,
  type AddOn,
  type ServiceTier,
} from "@/data/services";
import { postEnquiry } from "@/lib/enquiries";
import { useAppStore } from "@/lib/store";
import { TweenedPrice } from "@/components/tweened-price";
import { Button } from "@/components/ui/button";

interface PropertyConfiguratorProps {
  property: Property;
}

interface StoredConfig {
  tierId: string;
  selectedAddOnIds: string[];
  updatedAt: number;
}

export function PropertyConfigurator({ property }: PropertyConfiguratorProps) {
  const { language } = useAppStore();
  const isBn = language === "bn";
  const compId = useId();

  // Determine category and service type
  const category: PropertyCategory = property.propertyCategory || "apartment";
  const serviceType = getServiceTypeForCategory(category);
  const isConstruction = serviceType === "construction";

  // Available packages and add-ons filtered by category
  const packages = useMemo(() => getServicePackages(serviceType), [serviceType]);
  const availableAddOns = useMemo(
    () => getAddOnsForService(serviceType, category),
    [serviceType, category]
  );

  // Storage key for persistence
  const storageKey = `barighor_config_${property.id}`;

  // Read initial selection from localStorage (safe try/catch)
  const initialConfig = useMemo<StoredConfig | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  // State
  const defaultTier = packages.find((p) => p.tier === "comfort") || packages[0];
  const [selectedTierId, setSelectedTierId] = useState<string>(
    initialConfig?.tierId || defaultTier?.id || "interior-comfort"
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(
    initialConfig?.selectedAddOnIds || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current selected package
  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.id === selectedTierId) || packages[0];
  }, [packages, selectedTierId]);

  // Currently selected add-on objects
  const selectedAddOns = useMemo(() => {
    return availableAddOns.filter((addon) => selectedAddOnIds.includes(addon.id));
  }, [availableAddOns, selectedAddOnIds]);

  // Calculations
  const packageTotal = useMemo(() => {
    if (!selectedPackage) return 0;
    return calculatePackageCost(selectedPackage, property.sqft);
  }, [selectedPackage, property.sqft]);

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((sum, addon) => {
      return sum + calculateAddOnCost(addon, property.sqft);
    }, 0);
  }, [selectedAddOns, property.sqft]);

  const combinedServiceTotal = packageTotal + addOnsTotal;

  // Typed copy dictionaries from data layer (zero hardcoded strings)
  const copy = useMemo(() => getConfiguratorCopy(serviceType), [serviceType]);
  const commonCopy = CONFIGURATOR_COPY.common;

  // Persist configuration whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const config: StoredConfig = {
        tierId: selectedTierId,
        selectedAddOnIds,
        updatedAt: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(config));

      // Also persist to a master map for shortlist recall
      const masterRaw = localStorage.getItem("barighor_saved_configurations");
      const master = masterRaw ? JSON.parse(masterRaw) : {};
      master[property.id] = config;
      localStorage.setItem("barighor_saved_configurations", JSON.stringify(master));
    } catch {
      // Storage unavailable in locked down environments
    }
  }, [selectedTierId, selectedAddOnIds, storageKey, property.id]);

  // Toggle add-on checkbox
  const handleToggleAddOn = (addonId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // WhatsApp Primary CTA Handler
  const handlePrimaryEnquiry = () => {
    setIsSubmitting(true);

    const tierName = selectedPackage ? `${selectedPackage.nameEn} (₹${selectedPackage.indicativePricePerSqft}/sq ft)` : "";
    const addOnListText =
      selectedAddOns.length > 0
        ? selectedAddOns
            .map((a) => {
              const cost = calculateAddOnCost(a, property.sqft);
              return `  • ${a.title}: ₹${cost.toLocaleString("en-IN")} (${a.keySpec})`;
            })
            .join("\n")
        : "  None selected";

    const message = [
      `Hi BariGhor, I would like to enquire about:`,
      `*Property:* ${property.title} (${property.price})`,
      `*Reference:* ${property.id}`,
      `*Locality:* ${property.locality}`,
      `*Built-up Area:* ${property.sqft.toLocaleString("en-IN")} sq ft`,
      ``,
      `*Configured ${isConstruction ? "Construction" : "Interiors"} Selection:*`,
      `*Tier:* ${tierName}`,
      `*Add-ons:*`,
      addOnListText,
      ``,
      `*Estimated ${isConstruction ? "Construction" : "Interiors"} Cost:* ₹${combinedServiceTotal.toLocaleString("en-IN")} (Indicative)`,
      `*Property Base Price:* ${property.price} (Financed separately)`,
      ``,
      `_(${INDICATIVE_PRICE_DISCLAIMER})_`,
    ].join("\n");

    // POST telemetry to admin enquiries endpoint (fire-and-forget)
    postEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyPrice: property.price,
      serviceType,
      selectedTier: selectedPackage
        ? {
            id: selectedPackage.id,
            nameEn: selectedPackage.nameEn,
            ratePerSqft: selectedPackage.indicativePricePerSqft,
          }
        : undefined,
      selectedAddOns: selectedAddOns.map((a) => ({
        id: a.id,
        title: a.title,
        indicativePrice: calculateAddOnCost(a, property.sqft),
        priceUnit: a.priceUnit,
      })),
      indicativeEstimatedCost: combinedServiceTotal,
      enquiryType: "full_selection",
    });

    const waUrl = `https://wa.me/919073599355?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  // WhatsApp Secondary CTA (Property only)
  const secondaryWaUrl = `https://wa.me/919073599355?text=${encodeURIComponent(
    `Hi BariGhor, I am interested in ${property.title} (${property.price}) in ${property.locality}. Reference: ${property.id}`
  )}`;

  return (
    <section
      id="configurator"
      aria-labelledby={`${compId}-heading`}
      className="relative overflow-hidden bg-[#0A3632] text-[#F9F7F1] py-16 lg:py-24 border-y border-[#164B45] scroll-mt-20"
    >
      {/* Background architectural grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* a) HEADLINE + TRUST LINE */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#124B45] border border-[#236860] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#E5B869]">
            <Sparkles className="size-3.5 text-[#E5B869]" />
            <span>{copy.badge}</span>
          </div>

          <h2
            id={`${compId}-heading`}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {copy.headline}
            {isBn && (
              <span className="block mt-1 font-sans text-xl font-normal text-[#C2D1CF]" lang="bn">
                {copy.headlineBn}
              </span>
            )}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C2D1CF] sm:text-lg">
            {copy.subhead}
          </p>

          <p className="mt-3 text-xs italic font-mono text-[#D4A373]/90">
            {commonCopy.disclaimer}
            {isBn && <span className="ml-2 not-italic" lang="bn">({commonCopy.disclaimerBn})</span>}
          </p>
        </div>

        {/* MAIN CONFIGURATOR GRID: SELECTORS + STICKY SUMMARY */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_0.85fr] lg:gap-12 items-start">
          <div className="space-y-12">
            {/* b) PACKAGE TIER SELECTOR */}
            <div>
              <div className="flex items-baseline justify-between border-b border-[#1A544E] pb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {copy.tierStepTitle}
                  </h3>
                  <p className="text-xs text-[#C2D1CF] mt-0.5">
                    {copy.tierStepDesc}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#D4A373]">
                  {property.sqft.toLocaleString("en-IN")} sq ft built-up
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {packages.map((pkg) => {
                  const isSelected = selectedTierId === pkg.id;
                  const estimatedPkgCost = calculatePackageCost(pkg, property.sqft);

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTierId(pkg.id)}
                      aria-pressed={isSelected}
                      className={`relative flex flex-col text-left rounded-sm p-5 transition-all duration-fast ease-premium outline-none focus-visible:ring-2 focus-visible:ring-[#E5B869] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3632] ${
                        isSelected
                          ? "bg-[#0E4944] border-2 border-[#E5B869] shadow-lg shadow-black/20"
                          : "bg-[#082E2B]/80 border border-[#164D47] hover:border-[#236860] hover:bg-[#0C3B37]"
                      }`}
                    >
                      {/* Selected Indicator Pill */}
                      {isSelected && (
                        <div className="absolute -top-3 right-3 flex items-center gap-1 rounded-full bg-[#E5B869] px-2.5 py-0.5 text-[11px] font-bold text-[#0A3632] shadow-xs">
                          <Check className="size-3 stroke-[3]" />
                          <span>{commonCopy.activeTierBadge}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                          {pkg.tier}
                        </span>
                      </div>

                      <h4 className="mt-2 font-display text-lg font-bold text-white">
                        {pkg.nameEn}
                        {isBn && (
                          <span className="block text-xs font-normal text-[#C2D1CF]" lang="bn">
                            {pkg.nameBn}
                          </span>
                        )}
                      </h4>

                      <div className="mt-3">
                        <div className="font-display text-2xl font-bold text-[#E5B869]">
                          ₹{pkg.indicativePricePerSqft.toLocaleString("en-IN")}
                          <span className="text-xs font-normal text-[#C2D1CF]"> / sq ft</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#A9BEBC]">
                          ≈ ₹{(estimatedPkgCost / 100000).toFixed(2)} Lakhs (indicative)
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-[#C2D1CF] line-clamp-3">
                        {pkg.blurb}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#1B5650] flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#A9BEBC] mb-2">
                          {commonCopy.keyInclusionsTitle}
                        </p>
                        <ul className="space-y-1.5 text-xs text-[#C2D1CF]">
                          {pkg.included.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#25D366]" />
                              <span className="leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* c) COMPARISON TABLE */}
            <div>
              <div className="border-b border-[#1A544E] pb-3">
                <h3 className="font-display text-xl font-bold text-white">
                  {copy.comparisonStepTitle}
                </h3>
                <p className="text-xs text-[#C2D1CF] mt-0.5">
                  {copy.comparisonStepDesc}
                </p>
              </div>

              {/* Desktop Table View */}
              <div className="mt-6 hidden md:block overflow-hidden rounded-sm border border-[#164D47] bg-[#082E2B]/90">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#164D47] bg-[#062422]">
                      <th className="p-4 font-display font-semibold text-xs uppercase tracking-wider text-[#A9BEBC]">
                        Benchmark
                      </th>
                      {packages.map((pkg) => (
                        <th
                          key={pkg.id}
                          className={`p-4 font-display text-xs uppercase tracking-wider transition-colors ${
                            selectedTierId === pkg.id
                              ? "bg-[#0E4944] text-[#E5B869] font-bold"
                              : "text-white"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{pkg.nameEn}</span>
                            {selectedTierId === pkg.id && (
                              <span className="rounded-xs bg-[#E5B869] px-1.5 py-0.5 text-[9px] font-extrabold text-[#0A3632]">
                                Selected
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#144842]">
                    <tr>
                      <td className="p-4 text-xs font-semibold text-[#D4A373]">{copy.benchmarkLabels.price}</td>
                      {packages.map((pkg) => (
                        <td
                          key={pkg.id}
                          className={`p-4 text-xs ${
                            selectedTierId === pkg.id
                              ? "bg-[#0E4944]/60 font-semibold text-[#E5B869]"
                              : "text-[#C2D1CF]"
                          }`}
                        >
                          ₹{pkg.indicativePricePerSqft.toLocaleString("en-IN")}/sq ft · {pkg.comparison.price}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-xs font-semibold text-[#D4A373]">{copy.benchmarkLabels.comfort}</td>
                      {packages.map((pkg) => (
                        <td
                          key={pkg.id}
                          className={`p-4 text-xs ${
                            selectedTierId === pkg.id
                              ? "bg-[#0E4944]/60 text-white font-medium"
                              : "text-[#C2D1CF]"
                          }`}
                        >
                          {pkg.comparison.comfort}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-xs font-semibold text-[#D4A373]">{copy.benchmarkLabels.design}</td>
                      {packages.map((pkg) => (
                        <td
                          key={pkg.id}
                          className={`p-4 text-xs ${
                            selectedTierId === pkg.id
                              ? "bg-[#0E4944]/60 text-white font-medium"
                              : "text-[#C2D1CF]"
                          }`}
                        >
                          {pkg.comparison.design}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-xs font-semibold text-[#D4A373]">{copy.benchmarkLabels.materialQuality}</td>
                      {packages.map((pkg) => (
                        <td
                          key={pkg.id}
                          className={`p-4 text-xs ${
                            selectedTierId === pkg.id
                              ? "bg-[#0E4944]/60 text-white font-medium"
                              : "text-[#C2D1CF]"
                          }`}
                        >
                          {pkg.comparison.materialQuality}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Card View (Never a squashed table) */}
              <div className="mt-4 md:hidden space-y-4">
                {packages.map((pkg) => {
                  const isSelected = selectedTierId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      className={`rounded-sm p-4 border transition-all ${
                        isSelected
                          ? "border-[#E5B869] bg-[#0E4944]"
                          : "border-[#164D47] bg-[#082E2B]"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-[#1A544E] pb-2">
                        <span className="font-display font-bold text-white text-base">
                          {pkg.nameEn}
                        </span>
                        {isSelected ? (
                          <span className="rounded-xs bg-[#E5B869] px-2 py-0.5 text-[10px] font-bold text-[#0A3632]">
                            Active Selection
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedTierId(pkg.id)}
                            className="text-xs text-[#E5B869] underline underline-offset-4"
                          >
                            Switch to this
                          </button>
                        )}
                      </div>

                      <dl className="mt-3 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <dt className="text-[#A9BEBC]">Price Benchmark:</dt>
                          <dd className="font-semibold text-[#E5B869]">
                            ₹{pkg.indicativePricePerSqft}/sq ft ({pkg.comparison.price})
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-[#A9BEBC]">Comfort Level:</dt>
                          <dd className="text-right text-[#C2D1CF]">{pkg.comparison.comfort}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-[#A9BEBC]">Design Approach:</dt>
                          <dd className="text-right text-[#C2D1CF]">{pkg.comparison.design}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-[#A9BEBC]">Materials:</dt>
                          <dd className="text-right text-[#C2D1CF]">{pkg.comparison.materialQuality}</dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* d) ADD-ON SELECTOR */}
            <div>
              <div className="flex items-baseline justify-between border-b border-[#1A544E] pb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {copy.addOnStepTitle}
                  </h3>
                  <p className="text-xs text-[#C2D1CF] mt-0.5">
                    {copy.addOnStepDesc(category)}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#D4A373]">
                  {selectedAddOnIds.length} of {availableAddOns.length} selected
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {availableAddOns.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  const inputId = `${compId}-addon-${addon.id}`;
                  const specId = `${inputId}-spec`;
                  const addOnCost = calculateAddOnCost(addon, property.sqft);

                  return (
                    <label
                      key={addon.id}
                      htmlFor={inputId}
                      className={`group relative flex items-start gap-3.5 rounded-sm p-4 border transition-all duration-fast cursor-pointer outline-none focus-within:ring-2 focus-within:ring-[#E5B869] ${
                        isChecked
                          ? "bg-[#0E4944] border-[#E5B869] shadow-md shadow-black/20"
                          : "bg-[#082E2B]/80 border-[#164D47] hover:border-[#236860] hover:bg-[#0C3B37]"
                      }`}
                    >
                      {/* Accessible Checkbox with visible focus ring */}
                      <div className="pt-0.5">
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddOn(addon.id)}
                          aria-describedby={specId}
                          className="size-4 rounded-xs border-[#236860] bg-[#062422] text-[#0A3632] accent-[#E5B869] focus-visible:ring-2 focus-visible:ring-[#E5B869] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3632] cursor-pointer"
                        />
                      </div>

                      {/* Thumbnail with lazy loading and explicit dimensions */}
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xs border border-[#164D47] bg-[#062422]">
                        <img
                          src={addon.thumbnail}
                          alt={addon.title}
                          loading="lazy"
                          width={56}
                          height={56}
                          className="size-full object-cover transition-transform duration-base group-hover:scale-105"
                        />
                      </div>

                      {/* Text info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-display text-sm font-bold text-white group-hover:text-[#E5B869] transition-colors leading-snug">
                            {addon.title}
                          </p>
                        </div>

                        {isBn && (
                          <p className="text-[11px] text-[#C2D1CF]" lang="bn">
                            {addon.titleBn}
                          </p>
                        )}

                        <p id={specId} className="mt-1 text-xs text-[#A9BEBC] leading-relaxed line-clamp-2">
                          {addon.keySpec}
                        </p>

                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="font-display text-xs font-bold text-[#E5B869]">
                            {addon.priceUnit === "per_sqft" ? (
                              <>
                                ₹{addon.indicativePrice.toLocaleString("en-IN")}
                                <span className="text-[10px] font-normal text-[#C2D1CF]">/sq ft</span>
                                <span className="ml-1 text-[11px] font-normal text-[#A9BEBC]">
                                  (≈ ₹{(addOnCost / 1000).toFixed(0)}k)
                                </span>
                              </>
                            ) : (
                              <>₹{addon.indicativePrice.toLocaleString("en-IN")}</>
                            )}
                          </span>

                          <span className="text-[10px] font-mono text-[#D4A373]/80">
                            indicative
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* e) LIVE SUMMARY BOX (Sticky on desktop within the module) */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-sm border-2 border-[#E5B869]/70 bg-[#062623] p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#164D47] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5B869]">
                    {commonCopy.costMatrixTitle}
                  </span>
                  <h4 className="font-display text-xl font-bold text-white">
                    {commonCopy.liveConfigTitle}
                  </h4>
                </div>
                <span className="rounded-full bg-[#124B45] px-2.5 py-1 text-xs font-mono text-[#E5B869]">
                  {property.sqft} sq ft
                </span>
              </div>

              {/* Accessible Live Region for Screen Readers (Announces settled totals politely) */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                {copy.estimatedCostTitle}: ₹{combinedServiceTotal.toLocaleString("en-IN")}, {commonCopy.disclaimer}
              </div>

              {/* Line items with tweened figures */}
              <div className="mt-5 space-y-3.5 text-xs">
                {/* Selected Package */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      {selectedPackage?.nameEn}
                    </p>
                    <p className="text-[11px] text-[#A9BEBC]">
                      ₹{selectedPackage?.indicativePricePerSqft}/sq ft × {property.sqft} sq ft
                    </p>
                  </div>
                  <div className="text-right font-display text-sm font-bold text-[#F9F7F1]">
                    <TweenedPrice value={packageTotal} />
                    <span className="block text-[10px] font-normal font-mono text-[#A9BEBC]">
                      indicative
                    </span>
                  </div>
                </div>

                {/* Add-ons total */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      Selected Add-Ons ({selectedAddOns.length})
                    </p>
                    <p className="text-[11px] text-[#A9BEBC]">
                      {selectedAddOns.length === 0
                        ? commonCopy.noAddOnsSelected
                        : selectedAddOns.map((a) => a.title.split(" ")[0]).join(", ")}
                    </p>
                  </div>
                  <div className="text-right font-display text-sm font-bold text-[#F9F7F1]">
                    <TweenedPrice value={addOnsTotal} />
                    <span className="block text-[10px] font-normal font-mono text-[#A9BEBC]">
                      indicative
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#164D47] pt-4" />

                {/* Combined Estimated Services Cost */}
                <div
                  aria-hidden="true"
                  className="rounded-xs bg-[#0E4944] p-3.5 border border-[#236860]"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#E5B869]">
                    {copy.estimatedCostTitle}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                      <TweenedPrice value={combinedServiceTotal} />
                    </span>
                    <span className="text-[11px] font-mono text-[#E5B869]">
                      (indicative)
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] italic text-[#C2D1CF]">
                    {commonCopy.disclaimer}
                  </p>
                </div>

                {/* Property Price (shown SEPARATELY — NOT summed into one figure!) */}
                <div className="rounded-xs bg-[#061E1C] p-3.5 border border-[#164D47]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A9BEBC]">
                        {commonCopy.propertyPriceTitle}
                      </p>
                      <p className="text-xs font-bold text-white mt-0.5">
                        {property.price}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#C2D1CF]">
                      {commonCopy.separateFinancingBadge}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-[#A9BEBC] leading-tight">
                    {commonCopy.separateFinancingNote}
                  </p>
                </div>
              </div>

              {/* f) DUAL CTAs */}
              <div className="mt-6 space-y-3">
                {/* PRIMARY CTA */}
                <Button
                  type="button"
                  onClick={handlePrimaryEnquiry}
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3.5 px-4 rounded-xs text-sm shadow-md transition-all duration-fast flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageCircle className="size-4 shrink-0 fill-white" />
                  <span>{commonCopy.primaryCtaLabel}</span>
                </Button>

                {/* SECONDARY CTA (Outline) */}
                <a
                  href={secondaryWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xs border border-[#236860] bg-transparent hover:bg-[#0E4944] py-2.5 px-4 text-xs font-semibold text-[#F9F7F1] transition-colors focus-visible:ring-2 focus-visible:ring-[#E5B869]"
                >
                  <span>{commonCopy.secondaryCtaLabel}</span>
                </a>
              </div>

              {/* Trust badges footer */}
              <div className="mt-5 border-t border-[#164D47] pt-4 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#C2D1CF]">
                  <ShieldCheck className="size-3.5 text-[#25D366] shrink-0" />
                  <span>{commonCopy.warrantyBadge}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#C2D1CF]">
                  <Layers className="size-3.5 text-[#E5B869] shrink-0" />
                  <span>{commonCopy.autosaveBadge}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
