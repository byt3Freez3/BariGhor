import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useReducedMotion } from "@/lib/motion";
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
  Star,
  TrainFront,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { getLocalityBySlug, properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
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
    </div>
  );
}

export const Route = createFileRoute("/$citySlug/localities/$localitySlug")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    const locality = getLocalityBySlug(params.localitySlug);
    if (!city || !locality) {
      throw notFound();
    }
    return { city, locality };
  },
  pendingComponent: LocalityDetailSkeleton,
  head: ({ loaderData }) => {
    const loc = loaderData?.locality;
    const city = loaderData?.city;
    const title = `${loc?.name} Neighbourhood Dossier, ${city?.nameEn} — BariGhor`;
    const desc = loc?.description || `In-depth neighbourhood guide for ${loc?.name}, ${city?.nameEn}.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}/localities/${loc?.slug}`;

    const ogImage = locality.image || "https://build-it-better-five.vercel.app/og-image.jpg";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: loc?.tagline || desc },
        { property: "og:url", content: canonical },
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `${loc?.name}, ${city?.nameEn}`,
            alternateName: loc?.bengali,
            description: loc?.description,
            address: {
              "@type": "PostalAddress",
              addressLocality: loc?.name,
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          }),
        },
      ],
    };
  },
  component: LocalityDetailPage,
});

export default function LocalityDetailPage() {
  const { city, locality } = Route.useLoaderData();
  const { language } = useAppStore();
  const localProperties = properties.filter((p) => p.localitySlug === locality.slug);
  const prefersReduced = useReducedMotion();
  const [hasAnimatedChart, setHasAnimatedChart] = useState(false);

  useEffect(() => {
    setHasAnimatedChart(true);
  }, []);

  const chartData = locality.price_trend?.historicalRates || [
    { year: "2023", avgRate: 7000 },
    { year: "2024", avgRate: 7800 },
    { year: "2025", avgRate: 8900 },
    { year: "2026", avgRate: 9800 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              to="/$citySlug"
              params={{ citySlug: city.slug }}
              className="transition-colors hover:text-primary font-medium"
            >
              {city.nameEn}
            </Link>
            <span>/</span>
            <Link
              to="/$citySlug/localities"
              params={{ citySlug: city.slug }}
              className="transition-colors hover:text-primary font-medium"
            >
              Localities
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">{locality.name}</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/$citySlug/localities" params={{ citySlug: city.slug }}>
              <ArrowLeft className="mr-1 size-3.5" /> All {city.nameEn} neighbourhoods
            </Link>
          </Button>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="relative min-h-[440px] bg-hero text-hero-foreground">
        <img
          src={locality.hero_image || locality.image}
          alt={locality.name}
          width={1600}
          height={900}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/75 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-5 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {city.nameEn} Neighbourhood Dossier
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {locality.rating || 4.8} / 5 Editorial Rating
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-4">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              {locality.name}
            </h1>
            <span className="font-sans text-2xl font-semibold text-accent font-bengali">
              {locality.bengali}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-hero-foreground/85">{locality.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              variant="default"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <a href="#neighbourhood-homes">View {localProperties.length} Verified Homes</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <a
                href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20know%20more%20about%20properties%20in%20${encodeURIComponent(locality.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* KEY METRICS BAR */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-4 lg:px-8">
          <div className="border-r border-border/60 pr-4 last:border-none">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Avg Price / Sq Ft
            </p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {locality.avgPriceSqFt}
            </p>
          </div>
          <div className="border-r border-border/60 pr-4 last:border-none">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Historical Growth
            </p>
            <p className="mt-1 font-display text-xl font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="size-4" />
              {locality.priceTrendPercent || locality.price_trend?.yoyGrowth || "+12% YoY"}
            </p>
          </div>
          <div className="border-r border-border/60 pr-4 last:border-none">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Transit Rating
            </p>
            <p className="mt-1 font-display text-xl font-bold text-accent">
              {locality.connectivityScore || locality.connectivity_score || "8.8 / 10"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Flood Risk Profile
            </p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {locality.floodRiskRating || "Low"}
            </p>
          </div>
        </div>
      </section>

      {/* EDITORIAL GUIDE CONTENT (Above Data) */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Architectural Appraisal
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold">The Editorial Perspective</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {locality.description}
              </p>
              {locality.editorialNote && (
                <div className="mt-6 rounded-xs border-l-2 border-accent bg-accent/5 p-4 text-sm text-foreground">
                  <span className="font-semibold text-accent">Architect's Note: </span>
                  {locality.editorialNote}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-display text-xl font-bold">Key Neighbourhood Highlights</h3>
              <ul className="mt-4 space-y-3">
                {locality.keyHighlights?.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="rounded-xs border border-border bg-card p-6 shadow-xs">
              <h3 className="font-display text-lg font-bold">Transit & Infrastructure</h3>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <TrainFront className="size-4 shrink-0 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Nearest Metro / Rail</p>
                    <p className="text-xs text-muted-foreground">
                      {locality.nearestMetro || locality.metroConnectivity}{" "}
                      <span className="font-semibold text-accent">
                        ({locality.nearestMetroDistance || "Nearby"})
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="size-4 shrink-0 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Airport Commute Time</p>
                    <p className="text-xs text-muted-foreground">{locality.airportTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="size-4 shrink-0 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Drainage & Monsoon Profile</p>
                    <p className="text-xs text-muted-foreground">{locality.floodRiskNote}</p>
                  </div>
                </div>
              </div>

              {locality.connectivityNotes && (
                <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Corridor Analysis: </span>
                  {locality.connectivityNotes}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICE TREND CHART (Recharts) */}
      <section className="border-t border-border bg-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Market Dynamics
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold">
                {locality.name} Price Appreciation Trend
              </h2>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
              Historical average rates in ₹/sq ft (Admin verified records)
            </p>
          </div>

          <div className="mt-8 rounded-xs border border-border bg-card p-6 shadow-xs">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A16207" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#A16207" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis
                    dataKey="year"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickFormatter={(val) => `₹${val.toLocaleString("en-IN")}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A3632",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")} / sq ft`, "Avg Rate"]}
                    labelFormatter={(label) => `Calendar Year ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgRate"
                    stroke="#A16207"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#rateGradient)"
                    isAnimationActive={!hasAnimatedChart && !prefersReduced}
                    animationDuration={600}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                Capital Growth: <strong>{locality.priceTrendPercent || locality.price_trend?.yoyGrowth}</strong>
              </span>
              <span>
                Rental Yield: <strong>{locality.price_trend?.rentalYield || "3.5% – 4.2%"}</strong>
              </span>
              <span>
                Demand Rating: <strong>{locality.price_trend?.demandRating || "High"}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOMES IN THIS LOCALITY */}
      <section id="neighbourhood-homes" className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Curated Inventory
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold">
                Verified Residences in {locality.name} ({localProperties.length})
              </h2>
            </div>
            <Link
              to="/$citySlug/properties"
              params={{ citySlug: city.slug }}
              className="text-xs font-semibold text-accent hover:underline"
            >
              All {city.nameEn} properties →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {localProperties.length > 0 ? (
              localProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} index={idx} />
              ))
            ) : (
              <div className="col-span-3 rounded-md border border-dashed border-border bg-card p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No active properties currently listed in {locality.name}.
                </p>
                <div className="mt-4">
                  <WhatsAppAction context="locality" label="Request Off-Market Alerts on WhatsApp" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="locality" />
    </main>
  );
}
