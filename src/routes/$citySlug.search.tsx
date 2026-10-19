import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Filter, MapPin, RotateCcw, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
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

const searchSchema = z.object({
  q: z.string().optional(),
  listing: z.string().optional(),
  type: z.string().optional(),
  locality: z.string().optional(),
  budget: z.string().optional(),
  bhk: z.string().optional(),
  possession: z.string().optional(),
  sortBy: z.enum(["featured", "price-asc", "price-desc", "sqft-desc"]).optional(),
  note: z.string().optional(),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/$citySlug/search")({
  validateSearch: (search): SearchParams => searchSchema.parse(search),
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = `Search Verified Homes in ${city?.nameEn || "City"} — BariGhor`;
    const desc = `Search and filter verified luxury apartments and villas across ${city?.nameEn}, West Bengal.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}/search`;

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
  component: CitySearchPage,
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

function CitySearchPage() {
  const router = useRouter();
  const { city } = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const { language } = useAppStore();

  const [textQuery, setTextQuery] = useState(searchParams.q || "");
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchParams>(searchParams);

  const activeListing = searchParams.listing || "all";
  const activeType = searchParams.type || "all";
  const activeLocality = searchParams.locality || "all";
  const activeBudget = searchParams.budget || "all";
  const activeBhk = searchParams.bhk || "all";
  const activePossession = searchParams.possession || "all";
  const sortBy = searchParams.sortBy || "featured";

  const updateSearch = (updates: Partial<SearchParams>) => {
    router.navigate({
      search: (prev) => {
        const next: SearchParams = { ...prev, ...updates };
        Object.keys(next).forEach((k) => {
          const key = k as keyof SearchParams;
          if (next[key] === "all" || next[key] === "" || next[key] === undefined) {
            delete next[key];
          }
        });
        return next;
      },
    });
  };

  const results = useMemo(() => {
    let list = filterProperties({
      citySlug: city.slug,
      locality: activeLocality,
      budget: activeBudget,
      bhk: activeBhk,
      listingType: activeListing,
      propertyType: activeType,
      possession: activePossession,
    });

    if (textQuery.trim()) {
      const qLower = textQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(qLower) ||
          p.locality.toLowerCase().includes(qLower) ||
          p.locationDetails.toLowerCase().includes(qLower),
      );
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.priceNumericLakhs - b.priceNumericLakhs);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.priceNumericLakhs - a.priceNumericLakhs);
    } else if (sortBy === "sqft-desc") {
      list = [...list].sort((a, b) => b.sqft - a.sqft);
    }

    return list;
  }, [
    city.slug,
    activeLocality,
    activeBudget,
    activeBhk,
    activeListing,
    activeType,
    activePossession,
    textQuery,
    sortBy,
  ]);

  const cityLocalities = city.localities || [];

  const handleMobileApply = () => {
    setMobileSheetOpen(false);
    updateSearch(localFilters);
  };

  const handleResetFilters = () => {
    setTextQuery("");
    setLocalFilters({});
    router.navigate({ search: {} });
  };

  const hasActiveFilters =
    activeListing !== "all" ||
    activeType !== "all" ||
    activeLocality !== "all" ||
    activeBudget !== "all" ||
    activeBhk !== "all" ||
    activePossession !== "all" ||
    Boolean(textQuery.trim());

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Hero Search Header */}
      <section className="border-b border-border bg-card/60 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {searchParams.note && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <MapPin className="size-3.5" />
              {searchParams.note}
            </div>
          )}
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {city.nameEn} Inventory Search
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Search Homes in {city.nameEn}
          </h1>

          <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-xs border border-border bg-background px-4 py-2 shadow-xs focus-within:ring-2 focus-within:ring-accent">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={textQuery}
              onChange={(e) => {
                setTextQuery(e.target.value);
                updateSearch({ q: e.target.value });
              }}
              placeholder={`Search by project, locality or street in ${city.nameEn}...`}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {textQuery && (
              <button
                type="button"
                onClick={() => {
                  setTextQuery("");
                  updateSearch({ q: undefined });
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md py-3 shadow-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 lg:px-8">
          {/* Mobile Filter Trigger */}
          <div className="flex items-center gap-2 md:hidden w-full">
            <Sheet
              open={mobileSheetOpen}
              onOpenChange={(open) => {
                setMobileSheetOpen(open);
                if (open) setLocalFilters(searchParams);
              }}
            >
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-between rounded-xs border border-border bg-card px-4 py-2 text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-accent" />
                    Filters {hasActiveFilters && "· Active"}
                  </span>
                  <span className="font-mono text-accent">{results.length} matches</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6"
              >
                <SheetHeader className="text-left pb-4 border-b border-border">
                  <SheetTitle className="font-display text-2xl font-bold">Filter Results</SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    Refine property type, budget, and BHK.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">Type</label>
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
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-accent">Budget</label>
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
                </div>
                <div className="sticky bottom-0 mt-8 border-t border-border bg-background pt-4 pb-2 flex gap-3">
                  <Button variant="outline" onClick={handleResetFilters} className="flex-1">
                    Reset
                  </Button>
                  <Button onClick={handleMobileApply} className="flex-[2]">
                    Apply ({results.length} homes)
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filter Bar */}
          <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 text-xs">
            <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-accent">
              <Filter className="size-3.5 text-accent" /> Filter:
            </span>

            {/* Type */}
            <select
              value={activeType}
              onChange={(e) => updateSearch({ type: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
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
                onChange={(e) => updateSearch({ locality: e.target.value })}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All Localities</option>
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
              onChange={(e) => updateSearch({ budget: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
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
              onChange={(e) => updateSearch({ bhk: e.target.value })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
            >
              {BHK_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline ml-2"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-semibold text-accent font-mono">{results.length} homes match</span>
            <select
              value={sortBy}
              onChange={(e) => updateSearch({ sortBy: e.target.value as any })}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sqft-desc">Area: Largest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {results.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property, idx) => (
              <PropertyCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl font-bold">No residences found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your query or filter parameters.
            </p>
            <Button onClick={handleResetFilters} className="mt-6" variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="search" />
    </main>
  );
}
