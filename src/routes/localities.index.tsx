import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building, CheckCircle2, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { localities, properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/localities/")({
  head: () => ({
    meta: [
      { title: "Kolkata Neighbourhood Intelligence — BariGhor" },
      {
        name: "description",
        content:
          "In-depth guides to Kolkata's premier residential paras: New Town, Salt Lake, and Alipore.",
      },
    ],
  }),
  component: LocalitiesIndexPage,
});

function LocalitiesIndexPage() {
  const { language } = useAppStore();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Page Header */}
      <section className="border-b border-border bg-card/60 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Neighbourhood Directory
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en" ? "Kolkata Localities & Paras" : "কলকাতার পাড়া ও এলাকা"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A home is more than its carpet area. Understand connectivity, waterlogging history,
            municipal leases, and daily lifestyle rhythm before deciding.
          </p>
        </div>
      </section>

      {/* Localities Deep-Dive Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="space-y-16">
          {localities.map((loc, index) => {
            const locProps = properties.filter((p) => p.localitySlug === loc.slug);
            return (
              <article
                key={loc.slug}
                className="grid overflow-hidden border border-black/5 bg-card shadow-sm transition-all lg:grid-cols-[1.2fr_1.4fr]"
              >
                <div className="relative min-h-[340px] overflow-hidden bg-muted">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="size-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-display text-3xl font-bold">{loc.name}</h2>
                      <span className="font-sans text-base text-accent font-semibold">
                        {loc.bengali}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/80">{loc.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
                      <span className="text-primary font-bold text-sm">{loc.priceRange}</span>
                      <span>·</span>
                      <span>{loc.avgPriceSqFt}</span>
                      <span>·</span>
                      <span className="text-accent">{loc.verifiedHomesCount} Active Homes</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {loc.description}
                    </p>

                    <div className="mt-6 rounded-sm bg-secondary/60 p-4 text-xs">
                      <p className="font-bold text-foreground uppercase tracking-wider">
                        Editorial Assessment
                      </p>
                      <p className="mt-1 text-muted-foreground">{loc.editorialNote}</p>
                    </div>

                    <div className="mt-6 space-y-2">
                      {loc.keyHighlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                          <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <Button asChild>
                      <Link to="/localities/$slug" params={{ slug: loc.slug }}>
                        Read full neighbourhood dossier <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                    <Link
                      to="/search"
                      search={{ locality: loc.name }}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      View {locProps.length} residences in {loc.name} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="locality" />
    </main>
  );
}
