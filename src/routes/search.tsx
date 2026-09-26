import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, RotateCcw, Search as SearchIcon, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { filterProperties, properties, Property } from "@/lib/data";
import { useAppStore } from "@/lib/store";

const searchSchema = z.object({
  locality: z.string().optional(),
  budget: z.string().optional(),
  bhk: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Search Curated Homes in Kolkata — BariGhor" },
      {
        name: "description",
        content:
          "Search and filter verified luxury apartments and villas in New Town, Salt Lake, and Alipore.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const searchParams = Route.useSearch();
  const { locality, budget, bhk, setLocality, setBudget, setBhk, resetFilters } = useAppStore();

  const [textQuery, setTextQuery] = useState(searchParams.q || "");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "sqft-desc">(
    "featured",
  );

  // If query params are provided in URL on first mount, use them if local store is default
  const activeLocality = locality !== "all" ? locality : searchParams.locality || "all";
  const activeBudget = budget !== "all" ? budget : searchParams.budget || "all";
  const activeBhk = bhk !== "all" ? bhk : searchParams.bhk || "all";

  const results = useMemo(() => {
    let list = filterProperties({
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
          p.description.toLowerCase().includes(qLower) ||
          p.developer.toLowerCase().includes(qLower),
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.priceNumericLakhs - b.priceNumericLakhs);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.priceNumericLakhs - a.priceNumericLakhs);
    } else if (sortBy === "sqft-desc") {
      list.sort((a, b) => b.sqft - a.sqft);
    }

    return list;
  }, [activeLocality, activeBudget, activeBhk, textQuery, sortBy]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Search Header Banner */}
      <section className="border-b border-border bg-card/60 py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Curated Search Engine
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Find Your Kolkata Address
          </h1>

          {/* Search keyword input */}
          <div className="mt-6 flex max-w-2xl items-center rounded-xs border border-border bg-background px-4 py-2 shadow-xs focus-within:border-primary">
            <SearchIcon className="mr-3 size-5 text-muted-foreground" />
            <input
              type="text"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
              placeholder="Search by project name, developer, or landmark (e.g. Eco Park, Verandah, Villa)..."
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
            {textQuery && (
              <button
                type="button"
                onClick={() => setTextQuery("")}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Filters Bar */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <SlidersHorizontal className="size-3.5 text-accent" /> Filters:
              </span>

              {/* Locality dropdown */}
              <select
                value={activeLocality}
                onChange={(e) => setLocality(e.target.value)}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All Localities</option>
                <option value="New Town">New Town</option>
                <option value="Salt Lake">Salt Lake</option>
                <option value="Alipore">Alipore</option>
              </select>

              {/* BHK dropdown */}
              <select
                value={activeBhk}
                onChange={(e) => setBhk(e.target.value)}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All BHKs</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK / Penthouse</option>
              </select>

              {/* Budget dropdown */}
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

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "sqft-desc")
                }
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="featured">Sort: Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sqft-desc">Area: Largest First</option>
              </select>

              {(activeLocality !== "all" ||
                activeBudget !== "all" ||
                activeBhk !== "all" ||
                textQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    setTextQuery("");
                  }}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold"
                >
                  <RotateCcw className="size-3" /> Reset Filters
                </button>
              )}
            </div>

            <p className="text-xs font-semibold text-muted-foreground">
              {results.length} {results.length === 1 ? "residence" : "residences"} matching criteria
            </p>
          </div>
        </div>
      </section>

      {/* Results Listing */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {results.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl font-bold">
              No residences match your current filters
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try removing some constraints or clearing search keywords.
            </p>
            <Button
              onClick={() => {
                resetFilters();
                setTextQuery("");
              }}
              className="mt-6"
              variant="outline"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="search" />
    </main>
  );
}
