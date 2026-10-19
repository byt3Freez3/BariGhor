import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  BedDouble,
  Building2,
  Calendar,
  Check,
  Compass,
  Download,
  Droplets,
  Expand,
  FileCheck,
  FileText,
  Heart,
  Home,
  Layers,
  MapPin,
  Ruler,
  ShieldCheck,
  TrainFront,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { EmiCalculator } from "@/components/emi-calculator";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { getPropertyBySlug, properties } from "@/lib/data";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

export function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <SiteHeader sticky />
      <div className="border-b border-border bg-card/60 px-5 py-3 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="border-b border-border bg-black/95 py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Skeleton className="aspect-[21/9] w-full bg-white/10 rounded-xs" />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/$citySlug/properties/$propertySlug")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    const prop = getPropertyBySlug(params.propertySlug);
    if (!city || !prop) {
      throw notFound();
    }
    return { city, property: prop };
  },
  pendingComponent: PropertyDetailSkeleton,
  head: ({ loaderData }) => {
    const prop = loaderData?.property;
    const city = loaderData?.city;
    const title = `${prop?.title || "Property"} — ${prop?.locality}, ${city?.nameEn} | BariGhor`;
    const desc = prop?.description || `Handpicked verified home in ${city?.nameEn}.`;
    const canonical = `https://build-it-better-five.vercel.app/${city?.slug}/properties/${prop?.slug}`;
    const ogImage = prop?.image_url || "https://build-it-better-five.vercel.app/og-image.jpg";

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
            "@type": "RealEstateListing",
            name: prop?.title,
            description: prop?.description,
            image: prop?.image_url,
            url: canonical,
            offers: {
              "@type": "Offer",
              price: prop?.priceNumericLakhs ? prop.priceNumericLakhs * 100000 : 0,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: prop?.locality,
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          }),
        },
      ],
    };
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { city, property } = Route.useLoaderData();
  const { language, isShortlisted, toggleShortlist } = useAppStore();
  const saved = isShortlisted(property.id);
  const gallery = property.gallery_images || property.galleryImages || [property.image_url];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "floorplan" | "specs">("overview");

  const homeFacts = [
    { Icon: BedDouble, value: property.bhk, label: "Configuration" },
    { Icon: Ruler, value: `${property.sqft.toLocaleString("en-IN")}`, label: "sq ft built-up" },
    { Icon: Layers, value: property.floor, label: "Floor & Level" },
    { Icon: Compass, value: property.facing, label: "Orientation" },
    { Icon: Calendar, value: property.possessionDate, label: "Possession" },
    { Icon: Building2, value: property.developer, label: "Developer" },
  ];

  const legalFacts = [
    { Icon: FileCheck, label: "Tenure / Title", value: property.tenure_type || property.tenure },
    { Icon: ShieldCheck, label: "Approval Authority", value: property.approval },
    { Icon: TrainFront, label: "Nearest Transit", value: property.metro },
    { Icon: Droplets, label: "Flood-Risk Rating", value: `${property.floodRisk} Risk` },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/$citySlug" params={{ citySlug: city.slug }} className="transition-colors hover:text-primary">
              {city.nameEn}
            </Link>
            <span>/</span>
            <Link to="/$citySlug/properties" params={{ citySlug: city.slug }} className="transition-colors hover:text-primary">
              Properties
            </Link>
            <span>/</span>
            <Link
              to="/$citySlug/localities/$localitySlug"
              params={{ citySlug: city.slug, localitySlug: property.localitySlug }}
              className="transition-colors hover:text-primary"
            >
              {property.locality}
            </Link>
            <span>/</span>
            <span className="max-w-[180px] truncate font-semibold text-foreground sm:max-w-none">
              {property.title}
            </span>
          </div>

          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/$citySlug/properties" params={{ citySlug: city.slug }}>
              <ArrowLeft className="mr-1 size-3.5" /> Back to {city.nameEn} listings
            </Link>
          </Button>
        </div>
      </nav>

      {/* FULL-WIDTH IMAGE GALLERY SHOWCASE */}
      <section className="border-b border-border bg-black/95 py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs bg-black/40 sm:aspect-[21/9]">
            <img
              src={gallery[activeImageIndex]}
              alt={`${property.title} - view ${activeImageIndex + 1}`}
              className="size-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <Link
                to="/about/verification"
                className="inline-flex items-center gap-1.5 rounded-xs bg-primary/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md backdrop-blur-xs transition-colors hover:bg-primary"
                title="BariGhor 4-Pillar Due Diligence: Click to view audit protocol"
              >
                <BadgeCheck className="size-3.5 text-emerald-400" />
                WBRERA: {property.reraProjectNo}
              </Link>
              <span className="rounded-xs bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-xs">
                {property.tenure_type || property.tenure}
              </span>
            </div>

            {/* Shortlist Heart Button */}
            <button
              type="button"
              onClick={() => toggleShortlist(property.id)}
              className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold backdrop-blur-xs transition-transform active:scale-95 ${
                saved
                  ? "bg-rose-500 text-white shadow-lg"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
              aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
            >
              <Heart className={`size-4 ${saved ? "fill-white" : ""}`} />
              <span>{saved ? "Saved to Shortlist" : "Save Home"}</span>
            </button>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {property.locality} · {property.locationDetails}
                </p>
                <h2 className="font-display text-2xl font-bold md:text-3xl">{property.title}</h2>
              </div>
              <span className="rounded-sm bg-black/60 px-3 py-1 text-xs font-mono">
                {activeImageIndex + 1} / {gallery.length} Photos
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] h-20 shrink-0 overflow-hidden rounded-xs border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-accent ring-2 ring-accent/30 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CORE DETAILS & SIDEBAR */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1.5fr_0.8fr] lg:px-8">
        <div>
          {/* Header Title & Pricing */}
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-baseline">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                {property.locality} · {property.bhk}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-1 text-sm font-sans text-muted-foreground">
                {property.bengaliTitle} · {property.locationDetails}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-display text-3xl font-bold text-primary">{property.price}</p>
              <p className="text-xs text-muted-foreground">
                ₹{property.pricePerSqFt?.toLocaleString("en-IN")} / sq ft built-up
              </p>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 border-b border-border py-6 sm:grid-cols-3">
            {homeFacts.map((fact, i) => {
              const Icon = fact.Icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xs bg-primary/10 text-primary">
                    <Icon className="size-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="font-semibold text-foreground text-sm">{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Description */}
          <div className="border-b border-border py-8">
            <h2 className="font-display text-2xl font-bold">The Residence Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {property.description}
            </p>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold">Key Architectural Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.highlights?.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Due Diligence */}
          <div className="py-8">
            <h3 className="font-display text-xl font-bold">BariGhor Verification Report</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {legalFacts.map((fact, idx) => {
                const Icon = fact.Icon;
                return (
                  <div key={idx} className="flex items-start gap-3 rounded-xs border border-border bg-card p-4">
                    <Icon className="size-5 shrink-0 text-accent mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">{fact.label}</p>
                      <p className="font-display text-sm font-bold text-foreground mt-0.5">{fact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs border border-accent/20 bg-accent/5 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  4-Pillar Due Diligence Certified
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Title Search · Sanction Plan · Physical Survey · WBRERA Escrow
                </p>
              </div>
              <Link
                to="/about/verification"
                className="text-xs font-semibold text-accent hover:underline shrink-0"
              >
                Read Full Audit Standard →
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Concierge Sidebar */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-xs border border-border bg-card p-6 shadow-md">
            <Link
              to="/about/verification"
              className="group flex items-center gap-2 hover:opacity-90"
              title="Click to view our 4-pillar audit methodology"
            >
              <BadgeCheck className="size-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent group-hover:underline">
                100% Verified Inventory (Audit Details →)
              </span>
            </Link>
            <h3 className="mt-3 font-display text-2xl font-bold">{property.price}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct developer terms. No brokerage surcharge.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20(${property.price})%20in%20${encodeURIComponent(property.locality)}.%20Reference%3A%20${property.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#128C7E]"
              >
                Inquire on WhatsApp
              </a>

              <a
                href="tel:+919073599355"
                className="flex w-full items-center justify-center gap-2 rounded-xs border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Call Advisory (+91 90735 99355)
              </a>

              <Button
                type="button"
                variant={saved ? "secondary" : "outline"}
                onClick={() => toggleShortlist(property.id)}
                className="w-full flex items-center justify-center gap-2 rounded-xs py-3 text-sm font-semibold"
              >
                <Heart className={`size-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{saved ? "Saved to Your Shortlist" : "Save to Shortlist"}</span>
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Direct routing to Senior {city.nameEn} Advisory
            </p>
          </div>
        </aside>
      </section>

      {/* Embedded EMI Calculator */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Financial Affordability
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Calculate EMI for {property.title}
            </h2>
          </div>
          <EmiCalculator initialLoanLakhs={Math.round(property.priceNumericLakhs * 0.8)} compact />
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction
        floating
        context="property"
        propertyTitle={`${property.title} in ${property.locality}`}
      />
    </main>
  );
}
