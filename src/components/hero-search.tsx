import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Check, Filter, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppStore } from "@/lib/store";
import { cities } from "@/lib/regions";
import { ListingType, PropertyType } from "@/lib/data";

const LISTING_TABS: { id: ListingType; labelEn: string; labelBn: string }[] = [
  { id: "buy", labelEn: "Buy", labelBn: "ক্রয়" },
  { id: "rent", labelEn: "Rent", labelBn: "ভাড়া" },
  { id: "new_launch", labelEn: "New Launch", labelBn: "নতুন লঞ্চ" },
];

const PROPERTY_TYPES: { value: string; labelEn: string; labelBn: string }[] = [
  { value: "all", labelEn: "All Types", labelBn: "সব ধরণের" },
  { value: "Apartment", labelEn: "Apartment", labelBn: "অ্যাপার্টমেন্ট" },
  { value: "Independent House", labelEn: "Independent House", labelBn: "স্বতন্ত্র বাড়ি" },
  { value: "Villa", labelEn: "Villa", labelBn: "ভিলা" },
  { value: "Plot", labelEn: "Plot", labelBn: "জমি / প্লট" },
  { value: "Commercial", labelEn: "Commercial", labelBn: "বাণিজ্যিক" },
];

const BUDGET_OPTIONS = [
  { value: "all", label: "Any Price Band", bn: "যে কোন বাজেট" },
  { value: "under-25l", label: "Under ₹25L", bn: "₹২৫ লাখের নিচে" },
  { value: "25l-50l", label: "₹25 – 50L", bn: "₹২৫ – ৫০ লাখ" },
  { value: "50l-1cr", label: "₹50L – 1.0 Cr", bn: "₹৫০ লাখ – ১ কোটি" },
  { value: "1cr-3cr", label: "₹1.0 – 3.0 Cr", bn: "₹১ – ৩ কোটি" },
  { value: "3cr-plus", label: "₹3.0 Cr & Above", bn: "₹৩ কোটি+" },
];

const BHK_OPTIONS = [
  { value: "all", label: "All Layouts", bn: "সব মাপের" },
  { value: "1 BHK", label: "1 BHK", bn: "১ বিএইচকে" },
  { value: "2 BHK", label: "2 BHK", bn: "২ বিএইচকে" },
  { value: "3 BHK", label: "3 BHK", bn: "৩ বিএইচকে" },
  { value: "4 BHK+", label: "4 BHK+ / Villa", bn: "৪ বিএইচকে+" },
];

export function HeroSearch({
  onExplore,
  onSearchAction,
}: {
  onExplore?: () => void;
  onSearchAction?: () => void;
}) {
  const router = useRouter();
  const {
    locality,
    budget,
    bhk,
    listingType,
    propertyType,
    setLocality,
    setBudget,
    setBhk,
    setListingType,
    setPropertyType,
    language,
    selectedCity,
  } = useAppStore();

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setBottomSheetOpen(false);
    const callback = onSearchAction || onExplore;
    if (callback) {
      callback();
    } else {
      router.navigate({
        to: "/$citySlug/properties",
        params: { citySlug: selectedCity },
        search: {
          listing: listingType !== "buy" ? listingType : undefined,
          type: propertyType !== "all" ? propertyType : undefined,
          locality: locality !== "all" ? locality : undefined,
          budget: budget !== "all" ? budget : undefined,
          bhk: bhk !== "all" ? bhk : undefined,
        },
      });
    }
  };

  const currentCityObj = cities.find((c) => c.slug === selectedCity) || cities[0];
  const localitiesOptions = [
    { value: "all", label: language === "en" ? "All Neighbourhoods" : "সব এলাকা" },
    ...(currentCityObj?.localities.map((l) => ({ value: l.slug, label: l.name })) || []),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Listing Type Tabs (Buy / Rent / New Launch) */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <div className="inline-flex rounded-full border border-hero-foreground/20 bg-black/40 p-1 backdrop-blur-md">
          {LISTING_TABS.map((tab) => {
            const active = listingType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setListingType(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  active
                    ? "bg-accent text-primary shadow-md"
                    : "text-hero-foreground/80 hover:text-hero-foreground hover:bg-white/10"
                }`}
              >
                {tab.id === "new_launch" && <Sparkles className="size-3 text-current" />}
                <span>{language === "en" ? tab.labelEn : tab.labelBn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE TRIGGER: Opens Bottom-Sheet (Hidden on Desktop) */}
      <div className="block md:hidden">
        <Sheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="glass-panel flex w-full items-center justify-between rounded-xs border border-hero-foreground/30 bg-background/95 p-4 text-left shadow-xl backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary text-primary-foreground">
                  <SlidersHorizontal className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {LISTING_TABS.find((t) => t.id === listingType)?.labelEn || "Buy"} Residences
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {currentCityObj.nameEn} ·{" "}
                    {propertyType !== "all" ? propertyType : "All Types"} ·{" "}
                    {budget !== "all" ? budget : "Any Budget"}
                  </p>
                </div>
              </div>
              <div className="rounded-xs bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                Filter
              </div>
            </button>
          </SheetTrigger>

          {/* Bottom Sheet Drawer for Mobile */}
          <SheetContent
            side="bottom"
            className="max-h-[88vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 text-foreground shadow-2xl"
          >
            <SheetHeader className="text-left pb-4 border-b border-border">
              <SheetTitle className="font-display text-2xl font-bold">
                {language === "en" ? `Filter ${currentCityObj.nameEn} Homes` : "বাড়ি ফিল্টার করুন"}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Refine by transaction type, property type, budget, and BHK layout.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Listing Type Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  01 / Transaction Type
                </label>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {LISTING_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setListingType(tab.id)}
                      className={`flex items-center justify-center rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        listingType === tab.id
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{language === "en" ? tab.labelEn : tab.labelBn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  02 / Property Type
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => setPropertyType(pt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        propertyType === pt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{language === "en" ? pt.labelEn : pt.labelBn}</span>
                      {propertyType === pt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locality Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  03 / Neighbourhood
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {localitiesOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLocality(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        locality === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {locality === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  04 / Budget Band
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBudget(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        budget === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{language === "en" ? opt.label : opt.bn}</span>
                      {budget === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* BHK Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  05 / Layout (BHK)
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {BHK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBhk(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        bhk === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{language === "en" ? opt.label : opt.bn}</span>
                      {bhk === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Bottom Thumb Zone Action */}
            <div className="sticky bottom-0 mt-8 border-t border-border bg-background pt-4 pb-2">
              <Button
                type="button"
                size="lg"
                onClick={() => handleSubmit()}
                className="w-full bg-primary font-semibold text-primary-foreground hover:bg-accent"
              >
                <Search className="mr-2 size-4" />
                {language === "en" ? "Show Curated Homes" : "বাছাই করা বাড়ি দেখুন"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SEARCH BAR (Hidden on Mobile) */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel hidden overflow-hidden rounded-xs border border-hero-foreground/25 md:grid md:grid-cols-[1.1fr_1.1fr_1.1fr_1.1fr_auto] shadow-2xl backdrop-blur-md"
        aria-label="Filter residences"
      >
        {/* 01 / Property Type */}
        <label className="bg-background/90 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "01 / Property Type" : "০১ / ধরণ"}
          </span>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-sm font-semibold text-foreground outline-none"
          >
            {PROPERTY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {language === "en" ? opt.labelEn : opt.labelBn}
              </option>
            ))}
          </select>
        </label>

        {/* 02 / Locality */}
        <label className="bg-background/90 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background border-l border-border/40">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "02 / Neighbourhood" : "০২ / এলাকা"}
          </span>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-sm font-semibold text-foreground outline-none"
          >
            {localitiesOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* 03 / Budget */}
        <label className="bg-background/90 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background border-l border-border/40">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "03 / Budget" : "০৩ / বাজেট"}
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-sm font-semibold text-foreground outline-none"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {language === "en" ? opt.label : opt.bn}
              </option>
            ))}
          </select>
        </label>

        {/* 04 / Configuration */}
        <label className="bg-background/90 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background border-l border-border/40">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "04 / Layout (BHK)" : "০৪ / বিএইচকে"}
          </span>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-sm font-semibold text-foreground outline-none"
          >
            {BHK_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {language === "en" ? opt.label : opt.bn}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="h-full min-h-[58px] rounded-none bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
        >
          <Search className="mr-2 size-4" />
          {language === "en" ? "Explore" : "খুঁজুন"}
        </Button>
      </form>
    </div>
  );
}
