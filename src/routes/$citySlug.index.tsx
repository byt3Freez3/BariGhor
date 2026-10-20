import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Building2,
  Calendar,
  Clock3,
  Compass,
  FileText,
  Home,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Trees,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EmiCalculator } from "@/components/emi-calculator";
import { HeroSearch } from "@/components/hero-search";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import {
  filterProperties,
  getDerivedPossessionStatus,
  imagery,
  journalArticles,
  properties,
} from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/$citySlug/")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = `${city?.nameEn || "West Bengal"} Real Estate & Verified Homes | BariGhor`;
    const desc =
      city?.blurbEn ||
      `Explore handpicked, verified residences in ${city?.nameEn}, West Bengal.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}`;
    const ogImage =
      city?.heroImage || "https://build-it-better-five.vercel.app/og-image.jpg";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: canonical },
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
            name: city?.nameEn,
            alternateName: city?.nameBn,
            description: city?.blurbEn,
            address: {
              "@type": "PostalAddress",
              addressLocality: city?.nameEn,
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          }),
        },
      ],
    };
  },
  component: CityHomePage,
});

const trustSignals = [
  {
    Icon: BadgeCheck,
    value: "100%",
    label: "WBRERA-Checked Homes",
    sub: "Direct title & sanction verification",
  },
  {
    Icon: ShieldCheck,
    value: "100%",
    label: "Physical Site Audits",
    sub: "Every home verified by our team",
  },
  {
    Icon: Clock3,
    value: "Direct",
    label: "Single-Admin Concierge",
    sub: "No external brokers or listing spam",
  },
];

const BUDGET_BANDS = [
  {
    slug: "under-25l",
    title: "Under ₹25 Lakhs",
    titleBn: "২৫ লাখের নিচে",
    sub: "Starter homes & affordable suburban builds",
    range: "Up to ₹25L",
  },
  {
    slug: "25l-50l",
    title: "₹25 – 50 Lakhs",
    titleBn: "২৫ – ৫০ লাখ",
    sub: "Suburban 2 BHKs & Tier-2 city homes",
    range: "₹25L – ₹50L",
  },
  {
    slug: "50l-1cr",
    title: "₹50L – 1.0 Crore",
    titleBn: "৫০ লাখ – ১ কোটি",
    sub: "Planned satellite apartments & townhouses",
    range: "₹50L – ₹1Cr",
  },
  {
    slug: "1cr-3cr",
    title: "₹1.0 – 3.0 Crore",
    titleBn: "১ – ৩ কোটি",
    sub: "Premium gated residences & penthouses",
    range: "₹1Cr – ₹3Cr",
  },
  {
    slug: "3cr-plus",
    title: "₹3.0 Crore & Above",
    titleBn: "৩ কোটি ও তার বেশি",
    sub: "Historic heritage estates & trophy villas",
    range: "₹3Cr+",
  },
];

const BHK_BANDS = [
  { slug: "1 BHK", label: "1 BHK", bn: "১ বিএইচকে", sub: "Studios & compact starter flats" },
  { slug: "2 BHK", label: "2 BHK", bn: "২ বিএইচকে", sub: "Urban couples & balanced layouts" },
  { slug: "3 BHK", label: "3 BHK", bn: "৩ বিএইচকে", sub: "Classic family homes with verandahs" },
  { slug: "4 BHK+", label: "4 BHK+", bn: "৪ বিএইচকে+", sub: "Duplexes, villas & penthouses" },
];

const POSSESSION_BANDS = [
  {
    slug: "ready",
    label: "Ready to Move",
    bn: "তৈরি বাড়ি",
    sub: "Immediate registration & move-in",
  },
  {
    slug: "2027",
    label: "Possession 2027",
    bn: "২০২৭ হস্তান্তর",
    sub: "Under advanced construction stages",
  },
  {
    slug: "2028+",
    label: "Possession 2028+",
    bn: "২০২৮+ হস্তান্তর",
    sub: "New launches & prime early-pricing deals",
  },
];

function CityHomePage() {
  const { city } = Route.useLoaderData();
  const {
    language,
    locality,
    budget,
    bhk,
    listingType,
    propertyType,
    recentlyViewed,
    clearRecentlyViewed,
  } = useAppStore();

  // If city is coming_soon, show the editorial expansion view
  if (city.status === "coming_soon") {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-6 grid size-20 place-items-center rounded-full bg-secondary/50 text-accent">
            <Building className="size-10" />
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
            Expanding our network
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold md:text-6xl">
            {city.nameEn} ({city.nameBn}) is coming soon.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {city.blurbEn} We are currently conducting site audits, developer due diligence,
            and municipal title checks across {city.district}.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20please%20notify%20me%20when%20you%20launch%20in%20${city.nameEn}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              Get Notified on WhatsApp
            </a>
            <Link
              to="/$citySlug"
              params={{ citySlug: "kolkata" }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse Kolkata Instead
            </Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  // Filter properties for this city
  const cityProperties = useMemo(() => {
    return properties.filter((p) => {
      if (city.slug === "kolkata") {
        return p.citySlug === "kolkata" || !p.citySlug;
      }
      return p.citySlug === city.slug;
    });
  }, [city.slug]);

  const cityLocalities = city.localities || [];
  const featuredProp =
    cityProperties.find((p) => p.isFeatured) || cityProperties[0] || properties[0];

  const filteredList = useMemo(() => {
    return filterProperties({
      citySlug: city.slug,
      locality,
      budget,
      bhk,
      listingType,
      propertyType,
    });
  }, [city.slug, locality, budget, bhk, listingType, propertyType]);

  const recentlyViewedProperties = useMemo(() => {
    if (!recentlyViewed || recentlyViewed.length === 0) return [];
    return recentlyViewed
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is (typeof properties)[0] => Boolean(p));
  }, [recentlyViewed]);

  const handleHeroExplore = () => {
    const el = document.getElementById("curated-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader inverse />

      {/* SECTION 1: HERO (With Buy/Rent/New Launch Search Card) */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-hero text-hero-foreground">
        <div
          className="ken-burns absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url(${city.heroImage || imagery.heroImage})`,
            viewTransitionName: "city-hero-image",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/65 to-hero/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-4 py-1.5 text-xs font-bold tracking-widest text-accent uppercase">
              <MapPin className="size-3.5 text-accent" />
              {city.nameEn} · {city.nameBn} · Avg ₹{city.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
            </p>

            <h1
              className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
              style={{ viewTransitionName: "city-hero-title" }}
            >
              {language === "en" ? (
                <>
                  Find your{" "}
                  <span className="italic font-normal text-accent">{city.nameEn}</span>{" "}
                  home.
                </>
              ) : (
                <>
                  {city.nameBn}-এ আপনার{" "}
                  <span className="italic font-normal text-accent">পরের ঠিকানা</span>।
                </>
              )}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-hero-foreground/80 sm:text-lg">
              {language === "en" ? city.blurbEn : city.blurbBn}
            </p>

            {/* Hero Search Box */}
            <div className="mt-10">
              <HeroSearch onSearchAction={handleHeroExplore} />
            </div>

            {/* Quick Explore Link & Live Stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-hero-foreground/75">
              <span>{cityProperties.length} verified residences in {city.nameEn}</span>
              <span>·</span>
              <Link
                to="/$citySlug/properties"
                params={{ citySlug: city.slug }}
                className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
              >
                Browse all {city.nameEn} homes <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST SIGNALS BAND */}
      <section className="border-b border-border bg-card/50 py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {trustSignals.map((item, idx) => {
              const Icon = item.Icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xs bg-primary/10 text-primary">
                    <Icon className="size-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: CURATED RESIDENCES PORTFOLIO (With Live Result Count) */}
      <section id="curated-results" className="py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {city.nameEn} Portfolio
                </p>
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent">
                  {filteredList.length} homes match
                </span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                {language === "en"
                  ? `Curated ${city.nameEn} Residences`
                  : `${city.nameBn}-এর বাছাই করা বাড়ি`}
              </h2>
            </div>
            <Link
              to="/$citySlug/properties"
              params={{ citySlug: city.slug }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View all {cityProperties.length} homes in {city.nameEn} <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(filteredList.length > 0 ? filteredList : cityProperties)
              .slice(0, 6)
              .map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EDITORIAL BROWSE BANDS (Budget, BHK, Possession) */}
      <section id="browse-collections" className="border-t border-border bg-secondary/25 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-16">
          {/* Sub-band A: Browse by Budget */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Budget Segmentation
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {language === "en" ? "Browse by Budget Band" : "বাজেট অনুযায়ী বাড়ি খুঁজুন"}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Tuned to span low-income starter homes to ultra-luxury heritage estates
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {BUDGET_BANDS.map((b) => (
                <Link
                  key={b.slug}
                  to="/$citySlug/properties"
                  params={{ citySlug: city.slug }}
                  search={{ budget: b.slug }}
                  className="group flex flex-col justify-between rounded-xs border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-accent">{b.range}</span>
                    <h4 className="mt-2 font-display text-lg font-bold text-foreground group-hover:text-primary">
                      {language === "en" ? b.title : b.titleBn}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{b.sub}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-accent">
                    <span>Explore band</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sub-band B: Browse by BHK & Possession */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* BHK Layouts */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Layout Configurations
              </p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {language === "en" ? "Browse by BHK Configuration" : "বিএইচকে অনুযায়ী মাপ"}
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {BHK_BANDS.map((item) => (
                  <Link
                    key={item.slug}
                    to="/$citySlug/properties"
                    params={{ citySlug: city.slug }}
                    search={{ bhk: item.slug }}
                    className="group rounded-xs border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-foreground group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-bengali">
                        {item.bn}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Possession Timelines (Derived dynamically from possessionDate) */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Possession Roadmaps
              </p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {language === "en" ? "Browse by Possession Timeline" : "হস্তান্তর সময়সীমা"}
              </h3>
              <div className="mt-6 space-y-3">
                {POSSESSION_BANDS.map((item) => (
                  <Link
                    key={item.slug}
                    to="/$citySlug/properties"
                    params={{ citySlug: city.slug }}
                    search={{ possession: item.slug }}
                    className="group flex items-center justify-between rounded-xs border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-xs bg-primary/10 text-primary">
                        <Calendar className="size-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-display text-base font-bold text-foreground group-hover:text-primary">
                          {item.label}{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            ({item.bn})
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEIGHBOURHOOD INTELLIGENCE (Localities & Paras) */}
      {cityLocalities.length > 0 && (
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Neighbourhood Dossiers
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  {city.nameEn} Localities & Paras
                </h2>
              </div>
              <Link
                to="/$citySlug/localities"
                params={{ citySlug: city.slug }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                Explore all {city.nameEn} neighbourhoods <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cityLocalities.map((loc) => (
                <div
                  key={loc.slug}
                  className="group flex flex-col overflow-hidden rounded-xs border border-border bg-card shadow-xs transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={loc.image || imagery.heroImage}
                      alt={loc.name}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs uppercase tracking-wider text-accent font-bold">
                        {loc.bengali}
                      </p>
                      <h3 className="font-display text-2xl font-bold">{loc.name}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {loc.description}
                    </p>
                    <div className="mt-4 border-t border-border pt-4 text-xs flex items-center justify-between">
                      <span className="font-semibold text-foreground">Avg Rate:</span>
                      <span className="font-mono text-accent font-bold">{loc.avgPriceSqFt}</span>
                    </div>
                    <Link
                      to="/$citySlug/localities/$localitySlug"
                      params={{ citySlug: city.slug, localitySlug: loc.slug }}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      Read neighbourhood dossier <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: FEATURED RESIDENCE SPOTLIGHT */}
      {featuredProp && (
        <section className="py-20 border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs shadow-xl">
                <img
                  src={featuredProp.image_url}
                  alt={featuredProp.title}
                  width={900}
                  height={675}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute top-4 left-4 rounded-xs bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-xs">
                  Spotlight Residence
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Featured {city.nameEn} Residence
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredProp.title}
                </h3>
                <p className="mt-1 text-sm text-accent font-medium">
                  {featuredProp.locality} · {featuredProp.price} · {featuredProp.bhk}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {featuredProp.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-xs bg-card px-2.5 py-1 border border-border">
                    {featuredProp.sqft.toLocaleString("en-IN")} sq ft
                  </span>
                  <span className="rounded-xs bg-card px-2.5 py-1 border border-border">
                    {featuredProp.status}
                  </span>
                  <span className="rounded-xs bg-card px-2.5 py-1 border border-border">
                    WBRERA Registered
                  </span>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/$citySlug/properties/$propertySlug"
                    params={{ citySlug: city.slug, propertySlug: featuredProp.slug }}
                    className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    View Residence Details <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUIET BAND: RECENTLY VIEWED HOMES (Stored locally, zero login required) */}
      {recentlyViewedProperties.length > 0 && (
        <section className="border-t border-border bg-card/40 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Private Session History
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  Recently Viewed by You
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Saved privately on your device. Zero login required.
                </p>
              </div>
              <button
                type="button"
                onClick={clearRecentlyViewed}
                className="text-xs font-medium text-muted-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >
                Clear history
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyViewedProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: HOME LOAN EMI CALCULATOR */}
      <section className="border-t border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <EmiCalculator />
        </div>
      </section>

      {/* SECTION 8: JOURNAL & FIELD GUIDES */}
      <section className="border-t border-border bg-secondary/15 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Field Guides & Legal Advisory
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                BariGhor Market Journal
              </h2>
            </div>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              Read all articles <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {journalArticles.slice(0, 3).map((article) => (
              <div
                key={article.slug}
                className="group flex flex-col justify-between rounded-xs border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link to="/journal/$slug" params={{ slug: article.slug }}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: article.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Read field guide <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
