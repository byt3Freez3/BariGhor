import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
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
  featuredProperty,
  filterProperties,
  imagery,
  journalArticles,
  localities,
  properties,
} from "@/lib/data";
import { cities } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BariGhor — Handpicked Homes & Neighbourhood Intelligence in Kolkata" },
      {
        name: "description",
        content:
          "Discover verified luxury and premium homes with honest neighbourhood guidance across New Town, Salt Lake, and Alipore.",
      },
      { property: "og:title", content: "BariGhor — Curated Homes in Kolkata" },
      {
        property: "og:description",
        content: "A considered, authentic way to find your next residential address in Kolkata.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
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

const copy = {
  en: {
    eyebrow: "Homes with a Kolkata point of view",
    title: "Find your Kolkata home.",
    body: "Verified residences and the neighbourhood detail that national portals leave out—from flood drainage and municipal lease terms to morning light.",
    explore: "Explore curated homes",
  },
  bn: {
    eyebrow: "কলকাতাকে চিনে, এমন বাড়ির খোঁজ",
    title: "আপনার পরের ঠিকানা, আরও সহজে।",
    body: "যাচাই করা বাড়ি, আর পাড়ার সেই সব খুঁটিনাটি যা বড় পোর্টালে থাকে না—জলনিকাশী থেকে মিউটেশন ও সকালের রোদ।",
    explore: "বাছাই করা বাড়ি দেখুন",
  },
};

function IndexPage() {
  const { language, locality, budget, bhk } = useAppStore();
  const [hasInteractedSearch, setHasInteractedSearch] = useState(false);
  const text = copy[language];

  // Filter properties based on active store state
  const filteredList = filterProperties({ locality, budget, bhk });

  const handleHeroExplore = () => {
    setHasInteractedSearch(true);
    const el = document.getElementById("curated-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[94svh] items-end overflow-hidden bg-hero text-hero-foreground">
        <img
          src={imagery.heroImage}
          alt="Contemporary residences beside Kolkata's New Town wetlands at sunset"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="ken-burns absolute inset-0 size-full object-cover"
        />
        {/* Editorial gradient overlay matching design reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-hero/95 via-hero/65 to-hero/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-transparent to-black/30" />

        <SiteHeader inverse />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36 lg:px-8 lg:pb-20">
          <div className="reveal-up max-w-3xl">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {text.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-hero-foreground/80 md:text-lg">
              {text.body}
            </p>
          </div>

          {/* Interactive Search Bar */}
          <HeroSearch onExplore={handleHeroExplore} />

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-hero-foreground/70">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" />
              Showing {properties.length} hand-curated residences in Kolkata
            </span>
            <span>·</span>
            <span>WBRERA Certified</span>
            <span>·</span>
            <span>Updated September 2026</span>
          </div>
        </div>
      </section>

      {/* 2. TRUST SIGNALS BAR */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          {trustSignals.map(({ Icon, value, label, sub }) => (
            <div key={label} className="flex items-center gap-4 py-8 md:px-6 md:justify-center">
              <div className="grid size-12 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="size-6 text-accent" />
              </div>
              <div>
                <p className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="text-[11px] text-muted-foreground/80">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC SEARCH RESULTS SECTION (If User Interacts with Hero Filters) */}
      {hasInteractedSearch && (
        <section
          id="curated-results"
          className="border-b border-border bg-secondary/30 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Filtered Inventory
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                  {filteredList.length} Matching {filteredList.length === 1 ? "Home" : "Homes"}{" "}
                  Found
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Criteria: {locality !== "all" ? locality : "All areas"} ·{" "}
                  {budget !== "all" ? budget : "Any budget"} · {bhk !== "all" ? bhk : "All layouts"}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/search">Advanced Filters & Map →</Link>
              </Button>
            </div>

            {filteredList.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredList.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-lg border border-dashed border-border bg-card p-12 text-center">
                <p className="font-display text-2xl font-bold">
                  No direct matches for this specific combination
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try broadening your budget or locality filters.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <Link to="/properties">View All 8 Verified Homes</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. WHERE WE ARE (MULTI-CITY) */}
      <section id="regions" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Our Network
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Where we are.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Expanding our verified portfolio across Bengal, starting from the capital and reaching emerging urban centers.
            </p>
            <Link
              to="/cities"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              Explore all cities <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.filter(c => c.tier === 1).map((city, index) => (
            <Link
              key={city.slug}
              to="/cities/$slug"
              params={{ slug: city.slug }}
              className="group relative overflow-hidden rounded-xs border border-border bg-card shadow-sm transition-all hover:shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                {city.heroImage && (
                  <img
                    src={city.heroImage}
                    alt={city.nameEn}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <MapPin className="size-3.5" />
                  {city.district}
                </div>
                <h3 className="mt-2 font-display text-3xl font-bold">{city.nameEn}</h3>
                <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4 text-xs font-semibold">
                  <span>{city.priceBand}</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-display text-2xl font-bold">Coming Soon</h3>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {cities.filter(c => c.tier === 2).map((city) => (
              <div
                key={city.slug}
                className="w-[280px] shrink-0 snap-start flex-col justify-between rounded-xs border border-border bg-secondary/20 p-5"
              >
                <div>
                  <h4 className="font-display text-lg font-bold">{city.nameEn}</h4>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">{city.district}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {city.blurbEn}
                  </p>
                </div>
                <div className="mt-5 border-t border-border/50 pt-4">
                  <a
                    href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20please%20notify%20me%20when%20you%20launch%20in%20${city.nameEn}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Notify me <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEIGHBOURHOOD NOTES (LOCALITIES) */}
      <section id="localities" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Neighbourhood notes
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Pick your para.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Grounded guidance on connectivity, character, municipal land titles, and the everyday
              realities of each Kolkata locality.
            </p>
            <Link
              to="/localities"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              Explore all neighbourhoods <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {localities.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-xs border border-black/5 bg-card shadow-sm transition-all duration-500 hover:shadow-xl ${
                index === 1 ? "md:mt-8" : ""
              }`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <img
                  src={item.hero_image || item.image}
                  alt={`${item.name} neighbourhood in Kolkata`}
                  width={1408}
                  height={1056}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-hero-foreground">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl font-bold tracking-tight">
                      <Link to="/localities/$slug" params={{ slug: item.slug }}>
                        {item.name}
                      </Link>
                    </h3>
                    <span className="font-sans text-sm font-medium text-accent">
                      {item.bengali}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-hero-foreground/80 line-clamp-2">
                    {item.tagline}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-hero-foreground/20 pt-4 text-xs font-semibold">
                    <span>{item.priceRange}</span>
                    <Link
                      to="/localities/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex items-center gap-1 text-accent transition-transform group-hover:translate-x-1"
                    >
                      Read guide <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 5. FEATURED HOME SPOTLIGHT */}
      <section id="homes" className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Handpicked this week
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
                Featured home.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75">
              Every month our architects and legal team select one exceptional project for an
              exhaustive 360-degree review.
            </p>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-xs border border-primary-foreground/15 bg-primary-foreground/5 shadow-2xl lg:grid-cols-[1.4fr_0.85fr]">
            <Link
              to="/properties/$slug"
              params={{ slug: featuredProperty.slug }}
              className="group relative min-h-[480px] overflow-hidden bg-black/20"
            >
              <img
                src={featuredProperty.image_url}
                alt={featuredProperty.title}
                width={1920}
                height={1280}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-6 top-6 bg-card px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-card-foreground shadow-md">
                WBRERA verified · Ref BG-NT-021
              </span>
            </Link>

            <div className="flex flex-col justify-between bg-background p-8 text-foreground md:p-12">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                  <MapPin className="size-4" />
                  {featuredProperty.locationDetails}, {featuredProperty.locality}
                </p>

                <h3 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  <Link
                    to="/properties/$slug"
                    params={{ slug: featuredProperty.slug }}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredProperty.title}
                  </Link>
                </h3>

                <p className="mt-4 text-2xl font-bold text-primary">{featuredProperty.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {featuredProperty.bhk} · {featuredProperty.sqft} sq ft · {featuredProperty.status}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 border-y border-border py-6 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <TrainFront className="size-4 text-accent" />
                    {featuredProperty.metro}
                  </span>
                  <span className="flex items-center gap-2">
                    <Trees className="size-4 text-accent" />
                    {featuredProperty.floodRisk} Flood Risk
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2 className="size-4 text-accent" />
                    {featuredProperty.approval}
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="size-4 text-accent" />
                    {featuredProperty.tenure} Title
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="flex-1 justify-between">
                  <Link to="/properties/$slug" params={{ slug: featuredProperty.slug }}>
                    See the full story
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <WhatsAppAction
                  context="property"
                  propertyTitle={featuredProperty.title}
                  variant="accent"
                  size="lg"
                  label="Enquire"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE EMI CALCULATOR SECTION */}
      <section id="insights" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <EmiCalculator />
      </section>

      {/* 7. MARKET JOURNAL PREVIEW */}
      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                From the BariGhor Journal
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Local field guides.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/journal">View All Articles →</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journalArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-xs border border-black/5 bg-card p-7 shadow-xs transition-shadow duration-300 hover:shadow-xl"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {article.category} · {article.readTime}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-foreground hover:text-primary transition-colors">
                    <Link to="/journal/$slug" params={{ slug: article.slug }}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: article.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    Read article <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <SiteFooter />

      {/* WhatsApp Persistent Floating Action Button */}
      <WhatsAppAction floating context="home" />
    </main>
  );
}
