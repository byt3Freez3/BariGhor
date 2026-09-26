import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { filterProperties, properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Handpicked Homes in Kolkata — BariGhor" },
      {
        name: "description",
        content:
          "Explore curated, verified residential apartments, villas, and penthouses across Kolkata.",
      },
    ],
  }),
  component: PropertiesIndexPage,
});

function PropertiesIndexPage() {
  const { locality, budget, bhk, setLocality, setBudget, setBhk, resetFilters, language } =
    useAppStore();

  const filteredProperties = filterProperties({ locality, budget, bhk });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Page Header */}
      <section className="border-b border-border bg-card/60 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Curated Portfolio
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en" ? "Handpicked Kolkata Homes" : "বাছাই করা কলকাতার বাড়ি"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every home in our portfolio has undergone WBHIRA registration validation, physical
            structural reviews, and municipal land-title verification.
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
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="rounded-xs border border-border bg-card px-3 py-1.5 font-medium outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">All Localities</option>
                <option value="New Town">New Town</option>
                <option value="Salt Lake">Salt Lake</option>
                <option value="Alipore">Alipore</option>
              </select>

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
              Showing {filteredProperties.length} of {properties.length} properties
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
              Try choosing another locality or budget band.
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
