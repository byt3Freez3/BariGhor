import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Check, Filter, MapPin, RotateCcw, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { filterProperties, properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

const propertiesSearchSchema = z.object({
  note: z.string().optional(),
  listing: z.string().optional(),
  type: z.string().optional(),
  locality: z.string().optional(),
  budget: z.string().optional(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  bhk: z.string().optional(),
  possession: z.string().optional(),
  verifiedOnly: z.boolean().optional(),
});

type PropertiesSearchParams = z.infer<typeof propertiesSearchSchema>;

export const Route = createFileRoute("/$citySlug/properties/")({
  validateSearch: (search): PropertiesSearchParams => propertiesSearchSchema.parse(search),
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = `Handpicked Homes in ${city?.nameEn || "City"} — BariGhor`;
    const desc = `Explore curated, verified residential apartments, villas, and penthouses across ${city?.nameEn}, West Bengal.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}/properties`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: CityPropertiesIndexPage,
});

const PROPERTY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "Apartment", label: "Apartment" },
  { value: "Independent House", label: "Independent House" },
  { value: "Villa", label: "Villa" },
  { value: "Plot", label: "Plot" },
  { value: "Commercial", label: "Commercial" },
];

const BUDGET_OPTIONS = [
  { value: "all", label: "All Budgets" },
  { value: "under-25l", label: "Under ₹25L" },
  { value: "25l-50l", label: "₹25 – 50L" },
  { value: "50l-1cr", label: "₹50L – 1.0 Cr" },
  { value: "1cr-3cr", label: "₹1.0 – 3.0 Cr" },
  { value: "3cr-plus", label: "₹3.0 Cr & Above" },
];

const BHK_OPTIONS = [
  { value: "all", label: "All Layouts" },
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
  { value: "4 BHK+", label: "4 BHK+ / Villa" },
];

const POSSESSION_OPTIONS = [
  { value: "all", label: "All Timelines" },
  { value: "ready", label: "Ready to Move" },
  { value: "2027", label: "Possession 2027" },
  { value: "2028+", label: "Possession 2028+" },
];

function CityPropertiesIndexPage() {
  const router = useRouter();
  const { city } = Route.useLoaderData();
  const search = Route.useSearch();
  const { language } = useAppStore();

  // Mobile local state for bottom sheet before explicit apply
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<PropertiesSearchParams>(search);

  const activeListing = search.listing || "all";
  const activeType = search.type || "all";
  const activeLocality = search.locality || "all";
  const activeBudget = search.budget || "all";
  const activeBhk = search.bhk || "all";
  const activePossession = search.possession || "all";

  // Desktop live filter updater: navigates URL directly without Apply button
  const handleDesktopFilterChange = (updates: Partial<PropertiesSearchParams>) => {
    router.navigate({
      search: (prev) => {
        const next: PropertiesSearchParams = { ...prev, ...updates };
        // Clean undefined or "all"
        Object.keys(next).forEach((k) => {
          const key = k as keyof PropertiesSearchParams;
          if (next[key] === "all" || next[key] === "" || next[key] === undefined) {
            delete next[key];
          }
        });
        return next;
      },
    });
  };

  // Mobile apply filter handler: updates URL upon explicit user tap
  const handleMobileApply = () => {
    setMobileSheetOpen(false);
    router.navigate({
      search: () => {
        const next: PropertiesSearchParams = { ...localFilters };
        Object.keys(next).forEach((k) => {
          const key = k as keyof PropertiesSearchParams;
          if (next[key] === "all" || next[key] === "" || next[key] === undefined) {
            delete next[key];
          }
        });
        return next;
      },
    });
  };

  const handleResetFilters = () => {
    setLocalFilters({});
    router.navigate({
      search: {},
    });
  };

  const cityLocalities = city.localities || [];
  const cityProperties = useMemo(() => {
    return properties.filter((p) => {
      if (city.slug === "kolkata") {
        return p.citySlug === "kolkata" || !p.citySlug;
      }
      return p.citySlug === city.slug;
    });
  }, [city.slug]);

  const filteredProperties = useMemo(() => {
    return filterProperties({
      citySlug: city.slug,
      locality: activeLocality,
      budget: activeBudget,
      bhk: activeBhk,
      listingType: activeListing,
      propertyType: activeType,
      possession: activePossession,
    });
  }, [city.slug, activeLocality, activeBudget, activeBhk, activeListing, activeType, activePossession]);

  const hasActiveFilters =
    activeListing !== "all" ||
    activeType !== "all" ||
    activeLocality !== "all" ||
    activeBudget !== "all" ||
    activeBhk !== "all" ||
    activePossession !== "all";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Page Header */}
      <section className="border-b border-border bg-card/60 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {search.note && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <MapPin className="size-3.5" />
              {search.note}
            </div>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {city.nameEn} Curated Portfolio
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">
                {language === "en"
                  ? `Handpicked ${city.nameEn} Homes`
                  : `বাছাই করা ${city.nameBn}-এর বাড়ি`}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Every residence has undergone physical site audits, 30-year DRO title verification, and WBRERA
                escrow cross-checks in {city.nameEn}.
              </p>
            </div>

            {/* Live Result Count Pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-4 py-2 text-xs font-bold shadow-xs sm:self-auto">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground">
                {filteredProperties.length} homes match
              </span>
              <span className="text-muted-foreground">({cityProperties.length} total in {city.nameEn})</span>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY FILTER BAR: Docks under header on scroll */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md py-3 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          {/* Mobile Filter Trigger (Opens Bottom Sheet with Explicit Apply) */}
          <div className="flex items-center gap-2 md:hidden w-full">
            <Sheet
              open={mobileSheetOpen}
              onOpenChange={(open) => {
                setMobileSheetOpen(open);
                if (open) setLocalFilters(search);
              }}
            >
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-between rounded-xs border border-border bg-card px-4 py-2.5 text-xs font-semibold shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-accent" />
                    Filters {hasActiveFilters && "· Active"}
                  </span>
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[11px] font-bold text-accent">
                    {filteredProperties.length} homes match
                  </span>
                </button>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 text-foreground shadow-2xl"
              >
                <SheetHeader className="text-left pb-4 border-b border-border">
                  <SheetTitle className="font-display text-2xl font-bold">
                    Filter {city.nameEn} Homes
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    Select your parameters and tap Apply to update the listings.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-5">
                  {/* Property Type */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">
                      Property Type
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {PROPERTY_TYPES.map((pt) => (
                        <button
                          key={pt.value}
                          type="button"
                          onClick={() => setLocalFilters((prev) => ({ ...prev, type: pt.value }))}
                          className={`rounded-xs border px-3 py-2 text-xs font-medium text-left ${
                            (localFilters.type || "all") === pt.value
                              ? "border-primary bg-primary text-primary-foreground font-semibold"
                              : "border-border bg-card"
                          }`}
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">
                      Budget Band
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setLocalFilters((prev) => ({ ...prev, budget: b.value }))}
                          className={`rounded-xs border px-3 py-2 text-xs font-medium text-left ${
                            (localFilters.budget || "all") === b.value
                              ? "border-primary bg-primary text-primary-foreground font-semibold"
                              : "border-border bg-card"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BHK */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">
                      Layout (BHK)
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {BHK_OPTIONS.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setLocalFilters((prev) => ({ ...prev, bhk: b.value }))}
                          className={`rounded-xs border px-3 py-2 text-xs font-medium text-left ${
                            (localFilters.bhk || "all") === b.value
                              ? "border-primary bg-primary text-primary-foreground font-semibold"
                              : "border-border bg-card"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Possession */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">
                      Possession Timeline
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {POSSESSION_OPTIONS.map((pos) => (
                        <button
                          key={pos.value}
                          type="button"
                          onClick={() => setLocalFilters((prev) => ({ ...prev, possession: pos.value }))}
                          className={`rounded-xs border px-3 py-2 text-xs font-medium text-left ${
                            (localFilters.possession || "all") === pos.value
                              ? "border-primary bg-primary text-primary-foreground font-semibold"
                              : "border-border bg-card"
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 mt-8 border-t border-border bg-background pt-4 pb-2 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetFilters}
                    className="flex-1 font-semibold"
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={handleMobileApply}
                    className="flex-[2] bg-primary font-semibold text-primary-foreground hover:bg-accent"
                  >
                    Apply Filters ({filteredProperties.length} Homes)
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="grid size-9 place-items-center rounded-xs border border-border bg-card text-muted-foreground hover:text-foreground"
                title="Reset filters"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* DESKTOP LIVE FILTERS: Instant updates without Apply button */}
          <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-accent mr-1">
              <Filter className="size-3.5" /> Filters:
            </span>

            {/* Type */}
            <select
              value={activeType}
              onChange={(e) => handleDesktopFilterChange({ type: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none hover:border-accent focus:ring-1 focus:ring-accent"
            >
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>

            {/* Locality */}
            {cityLocalities.length > 0 && (
              <select
                value={activeLocality}
                onChange={(e) => handleDesktopFilterChange({ locality: e.target.value })}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none hover:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="all">All {city.nameEn} Localities</option>
                {cityLocalities.map((loc) => (
                  <option key={loc.slug} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            )}

            {/* Budget */}
            <select
              value={activeBudget}
              onChange={(e) => handleDesktopFilterChange({ budget: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none hover:border-accent focus:ring-1 focus:ring-accent"
            >
              {BUDGET_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {/* BHK */}
            <select
              value={activeBhk}
              onChange={(e) => handleDesktopFilterChange({ bhk: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none hover:border-accent focus:ring-1 focus:ring-accent"
            >
              {BHK_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {/* Possession */}
            <select
              value={activePossession}
              onChange={(e) => handleDesktopFilterChange({ possession: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none hover:border-accent focus:ring-1 focus:ring-accent"
            >
              {POSSESSION_OPTIONS.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline ml-2"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            )}
          </div>

          <div className="hidden md:block font-mono text-xs font-semibold text-muted-foreground">
            {filteredProperties.length} of {cityProperties.length} homes match
          </div>
        </div>
      </section>

      {/* Property Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {filteredProperties.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-20 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-muted-foreground">
              <Filter className="size-8" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No residences match your criteria</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We update our inventory following physical site audits. Reset your filters or message our advisory desk on WhatsApp.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={handleResetFilters} variant="outline" className="font-semibold">
                Reset Filters
              </Button>
              <WhatsAppAction context="general" variant="primary" label="Enquire on WhatsApp" />
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
