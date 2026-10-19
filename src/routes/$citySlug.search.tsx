import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Filter, MapPin, RotateCcw, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { filterProperties, properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

const searchSchema = z.object({
  locality: z.string().optional(),
  budget: z.string().optional(),
  bhk: z.string().optional(),
  q: z.string().optional(),
  type: z.string().optional(),
  note: z.string().optional(),
});

export const Route = createFileRoute("/$citySlug/search")({
  validateSearch: (search) => searchSchema.parse(search),
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

function CitySearchPage() {
  const { city } = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const { locality, budget, bhk, setLocality, setBudget, setBhk, resetFilters } = useAppStore();

  const [textQuery, setTextQuery] = useState(searchParams.q || "");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "sqft-desc">(
    "featured",
  );

  const activeLocality = locality !== "all" ? locality : searchParams.locality || "all";
  const activeBudget = budget !== "all" ? budget : searchParams.budget || "all";
  const activeBhk = bhk !== "all" ? bhk : searchParams.bhk || "all";

  const results = useMemo(() => {
    let list = filterProperties({
      citySlug: city.slug,
      locality: activeLocality,
      budget: activeBudget,
      bhk: activeBhk,
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
  }, [city.slug, activeLocality, activeBudget, activeBhk, textQuery, sortBy]);

  const cityLocalities = city.localities || [];

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
              onChange={(e) => setTextQuery(e.target.value)}
              placeholder={`Search by project, locality or street in ${city.nameEn}...`}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {textQuery && (
              <button
                type="button"
                onClick={() => setTextQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Filter className="size-3.5 text-accent" /> Filter:
            </span>

            {cityLocalities.length > 0 && (
              <select
                value={activeLocality}
                onChange={(e) => setLocality(e.target.value)}
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

            <select
              value={activeBhk}
              onChange={(e) => setBhk(e.target.value)}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All BHKs</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK / Villa</option>
            </select>

            <select
              value={activeBudget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Budgets</option>
              <option value="under-1cr">Under ₹1 Cr</option>
              <option value="1cr-2cr">₹1.0 – 2.0 Cr</option>
              <option value="2cr-4cr">₹2.0 – 4.0 Cr</option>
              <option value="4cr-plus">₹4.0 Cr+</option>
            </select>

            {(activeLocality !== "all" || activeBudget !== "all" || activeBhk !== "all" || textQuery) && (
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setTextQuery("");
                }}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-semibold text-accent">{results.length} homes match</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
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
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl font-bold">No residences found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your query or filter parameters.
            </p>
            <Button
              onClick={() => {
                resetFilters();
                setTextQuery("");
              }}
              className="mt-6"
              variant="outline"
            >
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
