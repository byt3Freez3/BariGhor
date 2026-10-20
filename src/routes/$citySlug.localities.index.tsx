import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Droplets,
  MapPin,
  Star,
  TrainFront,
  TrendingUp,
} from "lucide-react";
import { z } from "zod";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { Reveal } from "@/components/reveal";
import { properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

const localitiesSearchSchema = z.object({
  note: z.string().optional(),
});

export const Route = createFileRoute("/$citySlug/localities/")({
  validateSearch: (search) => localitiesSearchSchema.parse(search),
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = `${city?.nameEn || "City"} Neighbourhood Intelligence & Localities — BariGhor`;
    const desc = `In-depth guides to ${city?.nameEn}'s premier residential neighbourhoods: connectivity, flood risk, and price trends.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}/localities`;

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
  component: CityLocalitiesPage,
});

export default function CityLocalitiesPage() {
  const { city } = Route.useLoaderData();
  const search = Route.useSearch();
  const { language } = useAppStore();

  const cityLocalities = city.localities || [];

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
            {city.nameEn} Neighbourhood Intelligence
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en"
              ? `${city.nameEn} Localities & Paras`
              : `${city.nameBn}-এর পাড়া ও এলাকা`}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A home is more than its floorplan. Understand drainage histories, YoY price appreciation,
            transit times, and physical street plinth levels across {city.nameEn}.
          </p>
        </div>
      </section>

      {/* Localities Deep-Dive Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {cityLocalities.length > 0 ? (
          <div className="space-y-16">
            {cityLocalities.map((loc, idx) => {
              const locProps = properties.filter((p) => p.localitySlug === loc.slug);
              const homeCount = loc.propertyCount || locProps.length;

              return (
                <Reveal
                  key={loc.slug}
                  index={idx}
                  as="article"
                  className="grid overflow-hidden rounded-xs border border-border bg-card shadow-xs transition-shadow duration-base ease-out hover:shadow-xl lg:grid-cols-[1.2fr_1.4fr]"
                >
                  {/* Left Hero Image */}
                  <div className="relative min-h-[340px] overflow-hidden bg-muted">
                    <img
                      src={loc.image || loc.hero_image}
                      alt={loc.name}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-base ease-out hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Top Chips */}
                    <div className="absolute left-4 top-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-bold text-accent backdrop-blur-md">
                        <TrendingUp className="size-3.5 text-emerald-400" />
                        {loc.priceTrendPercent || loc.price_trend?.yoyGrowth || "+10% YoY"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {loc.rating || 4.8} / 5 Editorial Score
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider text-accent">
                        {loc.bengali} · {city.nameEn}
                      </p>
                      <h2 className="mt-1 font-display text-3xl font-bold">{loc.name}</h2>
                      <p className="mt-2 text-sm text-white/85 line-clamp-2">{loc.tagline}</p>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col justify-between p-8 lg:p-10">
                    <div>
                      {/* Metric Strips: ₹/sq ft, Price Band, Homes, Transit */}
                      <div className="grid grid-cols-2 gap-4 border-b border-border pb-6 sm:grid-cols-4">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Average Rate
                          </p>
                          <p className="mt-1 font-display text-base font-bold text-foreground">
                            {loc.avgPriceSqFt}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Price Band
                          </p>
                          <p className="mt-1 font-display text-sm font-bold text-foreground truncate">
                            {loc.priceRange}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Inventory
                          </p>
                          <p className="mt-1 font-display text-sm font-bold text-accent">
                            {homeCount} verified homes
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Connectivity
                          </p>
                          <p className="mt-1 font-display text-sm font-bold text-foreground">
                            {loc.connectivityScore || loc.connectivity_score || "8.8 / 10"}
                          </p>
                        </div>
                      </div>

                      {/* Chips: Flood-risk chip + Nearest-metro chip */}
                      <div className="mt-5 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                          <Droplets className="size-3.5 text-blue-500" />
                          <span>Flood Profile: <strong>{loc.floodRiskRating || "Low"}</strong></span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                          <TrainFront className="size-3.5 text-accent" />
                          <span>{loc.nearestMetro || loc.metroConnectivity} ({loc.nearestMetroDistance || "Nearby"})</span>
                        </span>
                      </div>

                      <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                        {loc.description}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                      <div className="text-xs text-muted-foreground max-w-sm truncate">
                        {loc.connectivityNotes}
                      </div>
                      <Link
                        to="/$citySlug/localities/$localitySlug"
                        params={{ citySlug: city.slug, localitySlug: loc.slug }}
                        className="inline-flex items-center gap-2 rounded-xs bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-accent hover:text-primary"
                      >
                        Read Full Locality Dossier <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-card p-16 text-center">
            <Compass className="mx-auto size-12 text-accent opacity-60" />
            <h3 className="mt-4 font-display text-2xl font-bold">
              Auditing {city.nameEn} Neighbourhoods
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Our architectural field team is currently mapping drainage profiles, transit connectivity,
              and title validity for {city.nameEn}.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to="/$citySlug"
                params={{ citySlug: city.slug }}
                className="rounded-xs bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground"
              >
                Return to {city.nameEn} Home
              </Link>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="locality" />
    </main>
  );
}
