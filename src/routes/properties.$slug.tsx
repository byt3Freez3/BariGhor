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
          <div className="mt-4 flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[16/10] h-20 w-32 bg-white/10" />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1.5fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-60" />
          <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
          <div className="space-y-3 pt-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <div>
          <div className="border border-border bg-card p-8 space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-44" />
            <div className="space-y-3 border-y border-border py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const prop = getPropertyBySlug(params.slug);
    if (!prop) {
      throw notFound();
    }
    return { property: prop };
  },
  pendingComponent: PropertyDetailSkeleton,
  head: ({ loaderData }) => {
    const prop = loaderData?.property;
    return {
      meta: [
        { title: `${prop ? prop.title : "Property"} — BariGhor` },
        {
          name: "description",
          content: prop ? prop.description : "Verified residence details on BariGhor.",
        },
        { property: "og:title", content: `${prop?.title} — BariGhor` },
        { property: "og:description", content: prop?.description },
      ],
    };
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { property } = Route.useLoaderData();
  const { language } = useAppStore();
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
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/properties" className="transition-colors hover:text-primary">
              Properties
            </Link>
            <span>/</span>
            <Link
              to="/localities/$slug"
              params={{ slug: property.localitySlug }}
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
            <Link to="/properties">
              <ArrowLeft className="mr-1 size-3.5" /> Back to listings
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
              <span className="rounded-xs bg-primary/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md backdrop-blur-xs">
                WBRERA: {property.reraProjectNo}
              </span>
              <span className="rounded-xs bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-xs">
                {property.tenure_type || property.tenure}
              </span>
            </div>

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

          {/* Thumbnail Selector Strip */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] h-18 shrink-0 overflow-hidden rounded-xs border-2 transition-all md:h-20 ${
                  activeImageIndex === idx
                    ? "border-accent ring-2 ring-accent/30"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY MAIN CONTENT & STICKY SIDEBAR */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1.5fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          {/* Header Info */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xs bg-sage/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <BadgeCheck className="size-4 text-emerald-600" />
              WBRERA Verified
            </span>
            <span className="text-xs text-muted-foreground">
              Reference: {property.id.toUpperCase()} · Updated September 2026
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {language === "en" ? property.title : property.bengaliTitle}
          </h1>

          <p className="mt-2.5 flex items-center gap-2 text-base text-muted-foreground">
            <MapPin className="size-4 text-accent shrink-0" />
            {property.locationDetails}, {property.locality}, Kolkata
          </p>

          {/* Key Specs Matrix */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-6 sm:grid-cols-3">
            {homeFacts.map(({ Icon, value, label }) => (
              <div key={label} className="p-2">
                <Icon className="mb-2 size-5 text-accent" />
                <p className="font-display text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          {/* Interactive Content Tabs */}
          <div className="mt-10 flex border-b border-border text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`border-b-2 px-5 py-3 transition-colors ${
                activeTab === "overview"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Architectural Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("floorplan")}
              className={`border-b-2 px-5 py-3 transition-colors ${
                activeTab === "floorplan"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Floor Plan & Carpet Area
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`border-b-2 px-5 py-3 transition-colors ${
                activeTab === "specs"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Due Diligence & Title
            </button>
          </div>

          {/* Tab 1: Architectural Overview */}
          {activeTab === "overview" && (
            <div className="mt-8 space-y-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  The Story
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold">
                  Design, cross-ventilation, and privacy.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {property.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="rounded-xs border border-black/5 bg-card p-6 shadow-sm">
                <h4 className="font-display text-xl font-bold">Residence Highlights</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 text-accent shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="font-display text-2xl font-bold">Included Amenities</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-2 border-b border-border py-3 text-sm"
                    >
                      <Check className="size-4 text-accent" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Floor Plan */}
          {activeTab === "floorplan" && (
            <div className="mt-8 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Layout Blueprint
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold">
                  Dimensional Living Proportions
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Carefully proportioned room dimensions to maximize usable carpet efficiency and
                  cross-breeze.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xs border border-border bg-card p-6 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Usable Carpet Area</span>
                    <span className="font-mono font-bold text-foreground">
                      {property.floorPlanSpecs?.carpetAreaSqFt || Math.round(property.sqft * 0.78)}{" "}
                      sq ft
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Balcony & Utility Area</span>
                    <span className="font-mono font-bold text-foreground">
                      {property.floorPlanSpecs?.balconyAreaSqFt || 180} sq ft
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Living & Dining Lounge</span>
                    <span className="font-mono font-bold text-foreground">
                      {property.floorPlanSpecs?.livingDiningSqFt || "24'0\" x 14'0\""}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Master Bedroom Suite</span>
                    <span className="font-mono font-bold text-foreground">
                      {property.floorPlanSpecs?.masterBedroomSqFt || "16'0\" x 13'0\""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modular Kitchen Layout</span>
                    <span className="font-mono font-bold text-foreground">
                      {property.floorPlanSpecs?.kitchenSqFt || "12'0\" x 9'0\""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xs border border-dashed border-border bg-secondary/30 p-8 text-center">
                  <FileText className="size-10 text-accent" />
                  <p className="mt-3 font-display text-lg font-bold">Sanctioned CAD Floor Plan</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Available as high-resolution PDF with structural column markings.
                  </p>
                  <WhatsAppAction
                    context="property"
                    propertyTitle={`${property.title} Floor Plan Request`}
                    className="mt-5"
                    size="sm"
                    label="Request PDF Blueprint"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Legal & Due Diligence */}
          {activeTab === "specs" && (
            <div className="mt-8 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Title & Approval Assessment
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold">
                  Verified Records & Due Diligence
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {legalFacts.map(({ Icon, label, value }) => (
                  <div key={label} className="border border-border bg-card p-5">
                    <Icon className="size-5 text-accent" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xs border border-sage/40 bg-sage/10 p-6 text-sm">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <ShieldCheck className="size-5 text-emerald-600" />
                  <span>WBRERA Escrow & Sanction Verification</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/80">
                  This project has active escrow compliance under WBRERA registration{" "}
                  <code className="font-mono font-semibold">{property.reraProjectNo}</code>. Buyer
                  advances are strictly deposited to the project-specific escrow account ensuring
                  timely construction milestones.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* STICKY SIDEBAR: PRICING & ENQUIRE NOW CTA */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xs border border-border bg-card p-6 shadow-xl md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Verified Price
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-primary">{property.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Approx. ₹{property.pricePerSqFt.toLocaleString("en-IN")} / sq ft · Excl. registration
              & stamp duty
            </p>

            <div className="my-6 space-y-3 border-y border-border py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">WBRERA ID</span>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {property.reraProjectNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Developer</span>
                <span className="font-medium text-foreground">{property.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Land Title</span>
                <span className="font-medium text-foreground">
                  {property.tenure_type || property.tenure}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Possession</span>
                <span className="font-medium text-accent">{property.possessionDate}</span>
              </div>
            </div>

            {/* Enquire CTA buttons routing to +91 90735 99355 */}
            <div className="space-y-3">
              <WhatsAppAction
                context="property"
                propertyTitle={`${property.title} in ${property.locality}`}
                size="lg"
                className="w-full justify-center bg-accent text-white hover:bg-accent/90 shadow-md font-semibold"
                label="Enquire on WhatsApp"
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full cursor-not-allowed">
                      <Button variant="outline" size="lg" disabled className="w-full opacity-60">
                        Book a Private Site Tour
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-primary text-primary-foreground max-w-xs text-center text-xs"
                  >
                    Coming Soon: Instant calendar scheduling in development. Please use WhatsApp for
                    immediate site visits.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Direct routing to Senior Kolkata Advisory (+91 90735 99355)
            </p>
          </div>
        </aside>
      </section>

      {/* EMBEDDED EMI CALCULATOR INSTANCE */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Financial Affordability
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Calculate EMI for {property.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimated 80% loan calculation with 8.50% p.a. standard benchmark rate.
            </p>
          </div>
          <EmiCalculator initialLoanLakhs={Math.round(property.priceNumericLakhs * 0.8)} compact />
        </div>
      </section>

      {/* More Properties from this Locality */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Explore More</p>
            <h3 className="mt-2 font-display text-3xl font-bold">
              Other residences in {property.locality}
            </h3>
          </div>
          <Button asChild variant="outline">
            <Link to="/properties">View All Kolkata Homes</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties
            .filter((p) => p.id !== property.id && p.localitySlug === property.localitySlug)
            .slice(0, 3)
            .map((p) => (
              <div key={p.id} className="border border-border bg-card p-4 shadow-sm">
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="aspect-[16/10] w-full object-cover"
                />
                <h4 className="mt-3 font-display text-lg font-bold">
                  <Link
                    to="/properties/$slug"
                    params={{ slug: p.slug }}
                    className="hover:text-primary transition-colors"
                  >
                    {p.title}
                  </Link>
                </h4>
                <p className="text-sm font-semibold text-primary">{p.price}</p>
              </div>
            ))}
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
