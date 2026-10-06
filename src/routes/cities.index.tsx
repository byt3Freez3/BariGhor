import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cities } from "@/lib/regions";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/cities/")({
  head: () => ({
    meta: [
      { title: "Cities & Regions — BariGhor" },
      { name: "description", content: "Explore verified residential real estate across Kolkata, New Town, Howrah and expanding across Bengal." },
    ],
  }),
  component: CitiesIndex,
});

function CitiesIndex() {
  const tier1 = cities.filter(c => c.tier === 1);
  const tier2 = cities.filter(c => c.tier === 2);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      
      <div className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-muted-foreground lg:px-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Cities & Regions</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Network</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Where we operate.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We are building Bengal's most trusted network of verified residences, starting from the capital and systematically expanding to key urban centers.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold">Live Regions</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tier1.map(city => (
              <Link
                key={city.slug}
                to="/cities/$slug"
                params={{ slug: city.slug }}
                className="group relative overflow-hidden rounded-xs border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  {city.heroImage && (
                    <img 
                      src={city.heroImage} 
                      alt={city.nameEn} 
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                    <MapPin className="size-3.5" />
                    {city.district}
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold">
                    {city.nameEn}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-sm font-medium">{city.priceBand}</span>
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-display text-2xl font-bold">Coming Soon</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Waitlist Open
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tier2.map(city => (
              <div key={city.slug} className="flex flex-col justify-between rounded-xs border border-border bg-secondary/30 p-5">
                <div>
                  <h3 className="font-display text-xl font-bold">{city.nameEn}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{city.blurbEn}</p>
                </div>
                <div className="mt-6">
                  <a
                    href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20please%20notify%20me%20when%20you%20launch%20in%20${city.nameEn}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Get Notified <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
