import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { z } from "zod";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
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

function CityLocalitiesPage() {
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
            {city.nameEn} Neighbourhood Directory
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en"
              ? `${city.nameEn} Localities & Paras`
              : `${city.nameBn}-এর পাড়া ও এলাকা`}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A home is more than its carpet area. Understand connectivity, waterlogging history,
            municipal leases, and daily lifestyle rhythm across {city.nameEn}.
          </p>
        </div>
      </section>

      {/* Localities Deep-Dive Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {cityLocalities.length > 0 ? (
          <div className="space-y-16">
            {cityLocalities.map((loc) => {
              const locProps = properties.filter((p) => p.localitySlug === loc.slug);
              return (
                <article
                  key={loc.slug}
                  className="grid overflow-hidden border border-black/5 bg-card shadow-xs transition-all lg:grid-cols-[1.2fr_1.4fr]"
                >
                  <div className="relative min-h-[340px] overflow-hidden bg-muted">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="size-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider text-accent">
                        {loc.bengali} · {city.nameEn}
                      </p>
                      <h2 className="mt-1 font-display text-3xl font-bold">{loc.name}</h2>
                      <p className="mt-2 text-sm text-white/80">{loc.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-8 lg:p-10">
                    <div>
                      <div className="grid grid-cols-2 gap-4 border-b border-border pb-6 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Average Rate</p>
                          <p className="mt-1 font-display text-sm font-bold text-foreground">
                            {loc.avgPriceSqFt}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Verified Homes</p>
                          <p className="mt-1 font-display text-sm font-bold text-accent">
                            {locProps.length} homes available
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Metro & Transit</p>
                          <p className="mt-1 font-display text-xs font-semibold text-foreground">
                            {loc.metroConnectivity}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                        {loc.description}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                      <div className="text-xs text-muted-foreground">
                        Flood risk profile: <span className="font-semibold text-foreground">{loc.floodRiskNote}</span>
                      </div>
                      <Link
                        to="/$citySlug/localities/$localitySlug"
                        params={{ citySlug: city.slug, localitySlug: loc.slug }}
                        className="inline-flex items-center gap-2 rounded-xs bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Read Full Locality Dossier <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
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
