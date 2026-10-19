import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Filter, MapPin, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { filterProperties, properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

const propertiesSearchSchema = z.object({
  note: z.string().optional(),
  type: z.string().optional(),
  bhk: z.string().optional(),
  budgetMax: z.string().optional(),
});

export const Route = createFileRoute("/$citySlug/properties/")({
  validateSearch: (search) => propertiesSearchSchema.parse(search),
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

function CityPropertiesIndexPage() {
  const { city } = Route.useLoaderData();
  const search = Route.useSearch();
  const { locality, budget, bhk, setLocality, setBudget, setBhk, resetFilters, language } =
    useAppStore();

  const cityLocalities = city.localities || [];
  const cityProperties = properties.filter((p) => {
    if (city.slug === "kolkata") {
      return p.citySlug === "kolkata" || !p.citySlug;
    }
    return p.citySlug === city.slug;
  });

  const filteredProperties = filterProperties({
    citySlug: city.slug,
    locality,
    budget,
    bhk,
  });

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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {city.nameEn} Curated Portfolio
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en"
              ? `Handpicked ${city.nameEn} Homes`
              : `বাছাই করা ${city.nameBn}-এর বাড়ি`}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every home in our portfolio has undergone WBRERA registration validation, physical
            structural reviews, and municipal land-title verification in {city.nameEn}.
          </p>
        </div>
      </section>

      {/* Interactive Filter Bar */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Filter className="size-3.5 text-accent" /> Filter:
              </span>

              {/* Locality Filter */}
              {cityLocalities.length > 0 && (
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="all">All {city.nameEn} Localities</option>
                  {cityLocalities.map((loc) => (
                    <option key={loc.slug} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              )}

              {/* BHK Filter */}
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All BHKs</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK / Villa</option>
              </select>

              {/* Budget Filter */}
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All Budgets</option>
                <option value="under-1cr">Under ₹1 Cr</option>
                <option value="1cr-2cr">₹1.0 – 2.0 Cr</option>
                <option value="2cr-4cr">₹2.0 – 4.0 Cr</option>
                <option value="4cr-plus">₹4.0 Cr+</option>
              </select>

              {(locality !== "all" || budget !== "all" || bhk !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  <X className="size-3" /> Reset
                </button>
              )}
            </div>

            <p className="text-xs font-semibold text-muted-foreground">
              Showing {filteredProperties.length} of {cityProperties.length} properties in {city.nameEn}
            </p>
          </div>
        </div>
      </section>

      {/* Property Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {filteredProperties.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl font-bold">No residences match this filter</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try choosing another locality or budget band in {city.nameEn}.
            </p>
            <Button onClick={resetFilters} className="mt-6" variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="property" />
    </main>
  );
}
