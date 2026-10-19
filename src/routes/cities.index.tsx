import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building, CheckCircle2, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cities, tier3Districts } from "@/data/regions";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cities/")({
  head: () => ({
    meta: [
      { title: "West Bengal Real Estate Rollout & Price Map — BariGhor" },
      {
        name: "description",
        content:
          "Explore BariGhor's verified residential network across West Bengal: Tier 1 metropolises and Tier 2 growth corridors with live ₹/sq ft price maps.",
      },
      { property: "og:title", content: "West Bengal Real Estate Price Map — BariGhor" },
      {
        property: "og:description",
        content:
          "Editorial overview of residential pricing, titles, and infrastructure across Kolkata, Howrah, New Town, and 8 key growth districts.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://build-it-better-five.vercel.app/cities" },
    ],
  }),
  component: CitiesIndexPage,
});

function CitiesIndexPage() {
  const tier1Cities = cities.filter((c) => c.tier === 1);
  const tier2Cities = cities.filter((c) => c.tier === 2);

  // Price map statistics
  const avgStatePrice = Math.round(
    cities.reduce((acc, c) => acc + c.avgPricePerSqft, 0) / cities.length
  );
  const highestPriceCity = [...cities].sort((a, b) => b.avgPricePerSqft - a.avgPricePerSqft)[0];
  const lowestPriceCity = [...cities].sort((a, b) => a.avgPricePerSqft - b.avgPricePerSqft)[0];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-muted-foreground lg:px-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">West Bengal Rollout & Price Map</span>
        </div>
      </nav>

      {/* Editorial Hero Header */}
      <section className="border-b border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Statewide Real Estate Intelligence
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              The West Bengal Real Estate Rollout.
            </h1>
            <p className="mt-2 font-display text-2xl text-accent font-normal italic">
              পশ্চিমবঙ্গের প্রতিটি প্রধান শহরে সত্য ও যাচাই করা আবাসন।
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Real estate portals in India treat all locations equally with unverified crowdsourced
              duplicates. BariGhor operates with single-owner discipline: ONE verified company
              portfolio, 100% on-site physical audits, and municipal lease checks across every Tier 1
              metropolis and Tier 2 growth corridor.
            </p>
          </div>

          {/* Statewide Price Map Metric Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
            <div className="rounded-xs border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                State Portfolio
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">
                {cities.length} Cities Live
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Tier 1 & Tier 2 covered</p>
            </div>
            <div className="rounded-xs border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Benchmark Avg
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-accent">
                ₹{avgStatePrice.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-muted-foreground"> / sq ft</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Across all live corridors</p>
            </div>
            <div className="rounded-xs border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Capital Corridor
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">
                ₹{highestPriceCity.avgPricePerSqft.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-muted-foreground"> / sq ft</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {highestPriceCity.nameEn} peak band
              </p>
            </div>
            <div className="rounded-xs border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Affordability Floor
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
                ₹{lowestPriceCity.avgPricePerSqft.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-muted-foreground"> / sq ft</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {lowestPriceCity.nameEn} accessible entry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIER 1 SECTION */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <span className="size-2.5 rounded-full bg-accent" />
                Tier 1 Metropolises
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                The Capital & Satellite Triad
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs">
              Prime commercial, cultural and technology hubs with highest capital density.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tier1Cities.map((city) => (
              <article
                key={city.slug}
                className="group flex flex-col overflow-hidden rounded-xs border border-border bg-card shadow-xs transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={city.heroImage}
                    alt={city.nameEn}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-xs bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs">
                      Tier 1 Live
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">
                      {city.nameBn} · {city.district}
                    </p>
                    <h3 className="font-display text-3xl font-bold">{city.nameEn}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Price Spectrum</p>
                        <p className="font-display text-base font-bold text-foreground">
                          {city.priceBand}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Average Rate</p>
                        <p className="font-display text-base font-bold text-accent">
                          ₹{city.avgPricePerSqft.toLocaleString("en-IN")} / sq ft
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {city.blurbEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      {city.localities.length} Verified Paras
                    </span>
                    <Link
                      to="/$citySlug"
                      params={{ citySlug: city.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      Enter {city.nameEn} Portal <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIER 2 SECTION */}
      <section className="py-20 border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                <span className="size-2.5 rounded-full bg-emerald-600" />
                Tier 2 Regional Growth Centers
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                The Bengal Growth Corridors
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Industrial hubs, educational corridors, and regional trade centers with high capital appreciation potential.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tier2Cities.map((city) => (
              <div
                key={city.slug}
                className="group flex flex-col justify-between rounded-xs border border-border bg-card p-6 shadow-xs transition-all hover:shadow-md hover:border-accent/50"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                        {city.nameEn}
                      </h3>
                      <p className="text-xs font-medium text-accent">{city.nameBn}</p>
                    </div>
                    <span className="rounded-xs bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                      LIVE
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground font-mono">{city.district}</p>

                  <div className="mt-5 space-y-2 border-y border-border py-4">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-muted-foreground">Price Band:</span>
                      <span className="font-semibold text-foreground">{city.priceBand}</span>
                    </div>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-muted-foreground">Average Rate:</span>
                      <span className="font-bold text-accent font-mono">
                        ₹{city.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {city.blurbEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    to="/$citySlug"
                    params={{ citySlug: city.slug }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xs border border-border bg-secondary/50 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View {city.nameEn} Homes <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIER 3 STRATEGIC EXPANSION HORIZON */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-xs border border-dashed border-border bg-card p-8 lg:p-12 text-center">
            <Building className="mx-auto size-12 text-accent opacity-60" />
            <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Tier 3 · Strategic Horizon
            </span>
            <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Expanding Verified Title Checks Statewide
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
              We never list properties without first conducting independent land-title audits,
              WBRERA cross-checks, and flood drainage assessments. Ground surveys are currently underway
              for the remaining districts across North Bengal and Western Rarh.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-[#25D366] text-white hover:bg-[#128C7E]">
                <a
                  href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20inquire%20about%20upcoming%20projects%20in%20other%20Bengal%20districts."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consult an Advisor on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
