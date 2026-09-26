import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrainFront,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { getLocalityBySlug, properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export function LocalityDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <SiteHeader sticky />
      <div className="border-b border-border bg-card/60 px-5 py-3 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
      <div className="min-h-[440px] bg-hero/50 p-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <Skeleton className="h-4 w-40 bg-white/20" />
          <Skeleton className="h-16 w-80 bg-white/20" />
          <Skeleton className="h-6 w-2/3 bg-white/20" />
        </div>
      </div>
      <div className="border-b border-border bg-card p-6">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/localities/$slug")({
  loader: ({ params }) => {
    const locality = getLocalityBySlug(params.slug);
    if (!locality) {
      throw notFound();
    }
    return { locality };
  },
  pendingComponent: LocalityDetailSkeleton,
  head: ({ loaderData }) => {
    const loc = loaderData?.locality;
    return {
      meta: [
        { title: `${loc ? loc.name : "Locality"} Neighbourhood Dossier — BariGhor` },
        {
          name: "description",
          content: loc ? loc.description : "Neighbourhood guide in Kolkata.",
        },
        { property: "og:title", content: `${loc?.name} Neighbourhood Guide — BariGhor` },
        { property: "og:description", content: loc?.tagline },
      ],
    };
  },
  component: LocalityDetailPage,
});

function LocalityDetailPage() {
  const { locality } = Route.useLoaderData();
  const { language } = useAppStore();
  const localProperties = properties.filter((p) => p.localitySlug === locality.slug);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/localities" className="transition-colors hover:text-primary">
              Localities
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">{locality.name}</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/localities">
              <ArrowLeft className="mr-1 size-3.5" /> All neighbourhoods
            </Link>
          </Button>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="relative min-h-[440px] bg-hero text-hero-foreground">
        <img
          src={locality.hero_image || locality.image}
          alt={locality.name}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/75 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-5 py-16 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Kolkata Neighbourhood Dossier
          </span>
          <div className="mt-2 flex items-baseline gap-4">
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              {locality.name}
            </h1>
            <span className="font-sans text-2xl font-semibold text-accent">{locality.bengali}</span>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-hero-foreground/85">{locality.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppAction
              context="locality"
              localityName={locality.name}
              className="bg-accent text-white hover:bg-accent/90"
              label={`Enquire for ${locality.name}`}
            />
            <Button
              asChild
              variant="outline"
              className="border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10"
            >
              <a href="#neighbourhood-homes">View {localProperties.length} Verified Properties ↓</a>
            </Button>
          </div>
        </div>
      </section>

      {/* KEY STATS & CONNECTIVITY SCORE BAR */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-border px-5 sm:grid-cols-4 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Price Band</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {locality.priceRange}
            </p>
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Average Rate</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {locality.avgPriceSqFt}
            </p>
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Connectivity Score
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {locality.connectivity_score || locality.connectivityScore}
            </p>
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Airport Transit</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">
              {locality.airportTime}
            </p>
          </div>
        </div>
      </section>

      {/* PRICE TREND & EDITORIAL DOSSIER */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold">Living in {locality.name}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {locality.description}
            </p>

            {/* Editorial Insight Card */}
            <div className="mt-8 border-l-2 border-accent bg-secondary/40 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                BariGhor Ground Reality Assessment
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {locality.editorialNote}
              </p>
            </div>

            {/* Price Trend Deep Dive */}
            <div className="mt-10 rounded-xs border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">
                    Historical Capital Growth
                  </p>
                  <h3 className="font-display text-2xl font-bold">Price Trend & Rental Yields</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                  <TrendingUp className="size-3.5" />
                  {locality.price_trend?.yoyGrowth || "+10.5% YoY"}
                </span>
              </div>

              {/* Historical Rates Table */}
              <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs">
                {locality.price_trend?.historicalRates.map((h) => (
                  <div
                    key={h.year}
                    className="rounded-xs border border-border/50 bg-background p-3"
                  >
                    <p className="text-muted-foreground">{h.year}</p>
                    <p className="mt-1 font-mono font-bold text-foreground">
                      ₹{h.avgRate.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-muted-foreground">/ sq ft</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs">
                <div>
                  <span className="text-muted-foreground uppercase font-semibold">
                    Average Rental Yield
                  </span>
                  <p className="mt-0.5 font-bold text-foreground">
                    {locality.price_trend?.rentalYield || "3.5%"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase font-semibold">
                    Investment Demand
                  </span>
                  <p className="mt-0.5 font-bold text-accent">
                    {locality.price_trend?.demandRating || "High"}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Neighbourhood Highlights */}
            <h3 className="mt-10 font-display text-2xl font-bold">Neighbourhood Advantages</h3>
            <div className="mt-4 space-y-3">
              {locality.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xs border border-black/5 bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 size-4 text-accent shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Transit, Drainage & Advisory */}
          <aside className="space-y-6">
            <div className="border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold">Transit & Infrastructure</h3>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <TrainFront className="size-5 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Metro & Arterial Roads</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {locality.metroConnectivity}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Droplets className="size-5 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Drainage & Monsoon Note</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{locality.floodRiskNote}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-primary p-6 text-primary-foreground shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                Private Advisory Walkthrough
              </p>
              <h4 className="mt-2 font-display text-2xl font-bold">Touring {locality.name}?</h4>
              <p className="mt-2 text-xs text-primary-foreground/80 leading-relaxed">
                Connect with our local area director for private block visits, title inspection
                dossiers, and verified inventory access.
              </p>
              <WhatsAppAction
                context="locality"
                localityName={locality.name}
                className="mt-5 w-full bg-accent text-white hover:bg-accent/90"
                label={`WhatsApp Desk for ${locality.name}`}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ASSOCIATED PROPERTIES GRID */}
      <section id="neighbourhood-homes" className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Curated Inventory
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">
                {localProperties.length} Verified{" "}
                {localProperties.length === 1 ? "Residence" : "Residences"} in {locality.name}
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/properties">View All Kolkata Homes →</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="locality" localityName={locality.name} />
    </main>
  );
}
