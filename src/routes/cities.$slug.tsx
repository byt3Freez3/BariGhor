import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bell, Building, Mail, MapPin } from "lucide-react";
import { getCityBySlug } from "@/lib/regions";
import { properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { WhatsAppAction } from "@/components/whatsapp-action";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.slug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    return {
      meta: [
        { title: `${city ? city.nameEn : "City"} Real Estate & Properties — BariGhor` },
        {
          name: "description",
          content: city ? city.blurbEn : "Explore verified properties in this city.",
        },
      ],
      links: [
        { rel: "canonical", href: `https://build-it-better-five.vercel.app/cities/${city?.slug}` }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            "name": city?.nameEn,
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "West Bengal",
              "addressCountry": "IN"
            }
          })
        }
      ]
    };
  },
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useLoaderData();
  const { language, setCity } = useAppStore();

  const handleSetCity = () => {
    setCity(city.slug);
  };

  if (city.status === "coming_soon") {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <SiteHeader />
        
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-5 text-center">
          <div className="mb-6 grid size-20 place-items-center rounded-full bg-secondary/50 text-accent">
            <Building className="size-10" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            Expanding our network
          </p>
          <h1 className="font-display text-4xl font-bold md:text-6xl max-w-2xl">
            {city.nameEn} is coming soon.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {city.blurbEn} We are currently auditing developers and finalizing our initial portfolio of verified titles in {city.nameEn}.
          </p>

          <div className="mt-12 w-full max-w-md p-8 border border-border bg-card shadow-xl">
            <h3 className="font-display text-2xl font-bold mb-2">Get early access</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Join the waitlist to be notified before we publicly list homes in this region.
            </p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full h-12 pl-10 pr-4 bg-background border border-input text-sm outline-none focus:border-accent transition-colors"
                />
              </div>
              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold">
                Join {city.nameEn} Waitlist
              </Button>
            </form>
            <div className="mt-6 flex items-center justify-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">OR</span>
            </div>
            <WhatsAppAction 
              context="waitlist"
              propertyTitle={`${city.nameEn} launch waitlist`}
              label="Notify me on WhatsApp"
              className="w-full mt-6 justify-center bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white"
            />
          </div>
        </div>

        <SiteFooter />
      </main>
    );
  }

  // Live city view
  // Note: currently properties don't have a city field, we filter by localities
  const cityLocalitySlugs = city.localities.map(l => l.slug);
  const cityProperties = properties.filter(p => cityLocalitySlugs.includes(p.localitySlug) || (p.localitySlug === "new-town" && city.slug === "new-town"));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-muted-foreground lg:px-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/cities" className="hover:text-primary">Cities</Link>
          <span>/</span>
          <span className="font-semibold text-foreground">{city.nameEn}</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-black/95 py-24 text-white">
        {city.heroImage && (
          <img 
            src={city.heroImage} 
            alt={city.nameEn} 
            className="absolute inset-0 size-full object-cover opacity-40 mix-blend-overlay"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4">
              <MapPin className="size-4" /> {city.district}
            </p>
            <h1 className="font-display text-5xl font-bold md:text-7xl">
              {language === "en" ? city.nameEn : city.nameBn}
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              {language === "en" ? city.blurbEn : city.blurbBn}
            </p>
            <div className="mt-8 flex gap-4">
              <Button onClick={handleSetCity} size="lg" className="bg-accent text-white hover:bg-accent/90">
                Set as Active City
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
          <div>
            <h2 className="font-display text-3xl font-bold">Verified Residences</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {cityProperties.length} homes fully audited in {city.nameEn}.
            </p>
          </div>
        </div>

        {cityProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cityProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <h3 className="font-display text-xl font-bold">More homes being added</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We are currently processing new listings for {city.nameEn}. Check back soon.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
