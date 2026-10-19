import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Building2,
  Clock3,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Trees,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EmiCalculator } from "@/components/emi-calculator";
import { HeroSearch } from "@/components/hero-search";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import {
  filterProperties,
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
    value: "143",
    label: "WBRERA-checked homes",
    sub: "Direct title & sanction verification",
  },
  {
    Icon: ShieldCheck,
    value: "100%",
    label: "Physical site audits",
    sub: "No unverified portal duplicates",
  },
  {
    Icon: Clock3,
    value: "12 min",
    label: "Direct advisor response",
    sub: "Direct WhatsApp concierge",
  },
];

function CityHomePage() {
  const { city } = Route.useLoaderData();
  const { language, locality, budget, bhk } = useAppStore();
  const [hasInteractedSearch, setHasInteractedSearch] = useState(false);

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
  const cityProperties = properties.filter((p) => {
    if (city.slug === "kolkata") {
      return p.citySlug === "kolkata" || !p.citySlug;
    }
    return p.citySlug === city.slug;
  });

  const cityLocalities = city.localities || [];
  const featuredProp = cityProperties.find((p) => p.isFeatured) || cityProperties[0] || properties[0];

  const filteredList = filterProperties({
    citySlug: city.slug,
    locality,
    budget,
    bhk,
  });

  const handleHeroExplore = () => {
    setHasInteractedSearch(true);
    const el = document.getElementById("curated-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader inverse />

      {/* Hero Section */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-hero text-hero-foreground">
        <div
          className="ken-burns absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${city.heroImage || imagery.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-4 py-1.5 text-xs font-bold tracking-widest text-accent uppercase">
              <MapPin className="size-3.5 text-accent" />
              {city.nameEn} · {city.nameBn}
            </p>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
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

            <p className="mx-auto mt-6 max-w-2xl text-lg text-hero-foreground/80 sm:text-xl">
              {language === "en" ? city.blurbEn : city.blurbBn}
            </p>

            {/* Hero Search Box */}
            <div className="mt-10">
              <HeroSearch onSearchAction={handleHeroExplore} />
            </div>

            {/* Quick Explore Link */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-hero-foreground/75">
              <span>{cityProperties.length} Verified homes in {city.nameEn}</span>
              <span>·</span>
              <Link
                to="/$citySlug/properties"
                params={{ citySlug: city.slug }}
                className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
              >
                Browse all {city.nameEn} homes <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals Band */}
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

      {/* Curated Properties Section */}
      <section id="curated-results" className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {city.nameEn} Portfolio
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                {language === "en" ? `Curated ${city.nameEn} Residences` : `${city.nameBn}-এর বাছাই করা বাড়ি`}
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
            {filteredList.length > 0 ? (
              filteredList.slice(0, 6).map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))
            ) : (
              cityProperties.slice(0, 6).map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Neighbourhood Intelligence Band */}
      {cityLocalities.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Neighbourhood Intelligence
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
                    <div className="mt-4 border-t border-border pt-4 text-xs">
                      <span className="font-semibold text-foreground">Avg Rate:</span>{" "}
                      <span className="text-muted-foreground">{loc.avgPriceSqFt}</span>
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

      {/* Featured Property Highlight */}
      {featuredProp && (
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs">
                <img
                  src={featuredProp.image_url}
                  alt={featuredProp.title}
                  className="size-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Featured {city.nameEn} Residence
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredProp.title}
                </h3>
                <p className="mt-1 text-sm text-accent font-medium">
                  {featuredProp.locality} · {featuredProp.price}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {featuredProp.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/$citySlug/properties/$propertySlug"
                    params={{ citySlug: city.slug, propertySlug: featuredProp.slug }}
                    className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    View Residence Details <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EMI Calculator */}
      <section className="border-t border-border bg-secondary/20 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <EmiCalculator />
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
