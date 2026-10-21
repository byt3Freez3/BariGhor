import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  CheckCircle2,
  FileCheck,
  Hammer,
  HelpCircle,
  Home,
  Layers,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { VideoBackdrop } from "@/components/video-backdrop";
import { useAppStore } from "@/lib/store";
import {
  getServicePackages,
  getAddOnsForService,
  INDICATIVE_PRICE_DISCLAIMER,
  INDICATIVE_PRICE_DISCLAIMER_BN,
} from "@/data/services";
import { PORTFOLIO_PROJECTS } from "@/data/services-portfolio";

export const Route = createFileRoute("/services/construction")({
  head: () => {
    const title = "Home Construction in Kolkata & New Town | Turnkey Villa Builders | BariGhor";
    const desc =
      "Architectural home construction for freehold plots across Kolkata, New Town & West Bengal. Bored pile foundations, Seismic Zone IV engineering, HIDCO/KMC sanctions, and 10-year structural warranty.";
    const canonical = "https://build-it-better-five.vercel.app/services/construction";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "BariGhor Turnkey Residential Construction",
            serviceType: "Civil Engineering & Home Construction",
            provider: {
              "@type": "HomeAndConstructionBusiness",
              name: "BariGhor",
              url: "https://build-it-better-five.vercel.app",
            },
            areaServed: ["New Town", "Salt Lake", "Kolkata", "Howrah", "Siliguri", "West Bengal"],
            description: desc,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: 1950,
              highPrice: 3800,
              priceUnit: "per sq ft (indicative)",
            },
          }),
        },
      ],
    };
  },
  component: ConstructionServicePage,
});

function ConstructionServicePage() {
  const { language } = useAppStore();
  const isBn = language === "bn";

  const constructionTiers = getServicePackages("construction");
  const constructionAddOns = getAddOnsForService("construction");
  const constructionPortfolio = PORTFOLIO_PROJECTS.filter((p) => p.category === "construction");

  const processSteps = [
    {
      step: "01",
      title: "Soil Test & Sanction Feasibility",
      desc: "Standardized geotechnical soil bore logging to determine strata load capacity and exact pile depth required for alluvial soil conditions.",
    },
    {
      step: "02",
      title: "Sanctioned Blueprints & Structural Modeling",
      desc: "Architectural floor plans with HIDCO/NKDA/KMC sanction drawings, 3D structural wireframes, and licensed engineer vetting.",
    },
    {
      step: "03",
      title: "Deep Piles & Elevated Plinth Substructure",
      desc: "Bored cast-in-situ RCC pile foundation, damp-proof plinth beam tied at minimum 30 inches above the peripheral road crown to prevent monsoon water ingress.",
    },
    {
      step: "04",
      title: "Superstructure Frame & Masonry",
      desc: "M25/M30 grade concrete frame with Tata Tiscon Fe500D steel, precision autoclaved aerated concrete (AAC) blocks, and multi-tier crystalline waterproofing.",
    },
    {
      step: "05",
      title: "MEP Conduit Roughing & Occupancy Handover",
      desc: "Concealed electrical lines, Astral CPVC plumbing lines pressure tested at 10 bar, perimeter boundary wall, and final municipal compliance sign-off.",
    },
  ];

  const faqs = [
    {
      q: "Do you assist with HIDCO, NKDA, or KMC municipal sanction approvals?",
      a: "Yes. Our in-house architectural team manages the complete municipal sanction workflow: architectural drafting, FAR (Floor Area Ratio) optimization, setback calculations, submission to NKDA / KMC portals, and issuance of the sanctioned building permit.",
    },
    {
      q: "How do you protect ground-up homes against Kolkata monsoon waterlogging?",
      a: "Every BariGhor residential design enforces our strict plinth elevation rule: the ground-floor finished plinth level is elevated a minimum of 2.5 to 3.0 feet above the central crown of the peripheral road. We also install dual-chamber sump pits with automatic submersible evacuation pumps.",
    },
    {
      q: "What foundation design is used for plots in New Town Action Area II and III?",
      a: "Due to the deltaic, alluvial clay soils of East Kolkata and New Town, shallow strip footings are unsafe for multi-story builds. We mandate bored cast-in-situ RCC piles anchored into dense sand strata (typically 12 to 18 meters depth) to prevent differential settlement.",
    },
    {
      q: "What is your structural warranty?",
      a: "All turnkey residential builds carry a 10-year bonded structural guarantee and 5-year crystalline waterproofing warranty, with scheduled annual engineering audits.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* HERO */}
      <section className="relative overflow-hidden isolate bg-[#0A3632] text-[#F9F7F1] py-20 lg:py-28">
        <VideoBackdrop />
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#124B45] border border-[#236860] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#E5B869]">
              <Building className="size-3.5" />
              <span>Turnkey Home Construction · Kolkata · New Town · West Bengal</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Architectural Construction
              <span className="block italic font-normal text-[#E5B869] mt-2">
                for your freehold plot.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#C2D1CF] sm:text-xl">
              One accountable engineering team, one master structural warranty, and unified municipal sanction management. Built to Seismic Zone IV standards from soil test to handover.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-6 rounded-xs text-sm shadow-md">
                <a
                  href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20have%20a%20freehold%20plot%20and%20would%20like%20to%20consult%20with%20your%20Civil%20Engineering%20team."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Discuss Your Plot on WhatsApp</span>
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs italic font-mono text-[#D4A373]">
              {INDICATIVE_PRICE_DISCLAIMER}
              {isBn && <span className="ml-2 not-italic" lang="bn">({INDICATIVE_PRICE_DISCLAIMER_BN})</span>}
            </p>
          </div>
        </div>
      </section>

      {/* THREE CONSTRUCTION TIERS */}
      <section className="py-20 lg:py-28 border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Transparent Engineering Rates
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Turnkey Construction Packages
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Engineered with Fe500D structural steel, high-grade concrete, and certified waterproofing.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {constructionTiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-xs border p-6 sm:p-8 transition-all ${
                  tier.tier === "comfort"
                    ? "border-accent bg-card shadow-xl ring-2 ring-accent/20"
                    : "border-border bg-card shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                      {tier.tier}
                    </span>
                    {tier.tier === "comfort" && (
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                        Recommended Value
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold">
                    {tier.nameEn}
                  </h3>
                  {isBn && (
                    <p className="text-xs text-muted-foreground mt-0.5" lang="bn">
                      {tier.nameBn}
                    </p>
                  )}

                  <div className="mt-4">
                    <span className="font-display text-3xl font-bold text-primary">
                      ₹{tier.indicativePricePerSqft.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground"> / sq ft</span>
                    <span className="block text-[11px] font-mono text-accent">
                      indicative starting benchmark
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {tier.blurb}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-3">
                      Structural Inclusions:
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {tier.included.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <a
                    href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                      tier.nameEn
                    )}%20Construction%20Tier%20(%E2%82%B9${tier.indicativePricePerSqft}%2Fsq%20ft).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#0A3632] py-2.5 px-4 text-xs font-semibold text-white transition-colors hover:bg-accent"
                  >
                    <span>Enquire for {tier.nameEn}</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs italic font-mono text-muted-foreground">
            {INDICATIVE_PRICE_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* CONSTRUCTION ADD-ONS */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Civil Enhancements
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Site & Structural Add-Ons
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {constructionAddOns.map((addon) => (
              <div
                key={addon.id}
                className="flex flex-col justify-between rounded-xs border border-border bg-card p-5 shadow-xs"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-muted">
                    <img
                      src={addon.thumbnail}
                      alt={addon.title}
                      loading="lazy"
                      width={300}
                      height={225}
                      className="size-full object-cover"
                    />
                  </div>
                  <h4 className="mt-4 font-display text-base font-bold text-foreground">
                    {addon.title}
                  </h4>
                  {isBn && (
                    <p className="text-[11px] text-muted-foreground" lang="bn">
                      {addon.titleBn}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {addon.keySpec}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between text-xs">
                  <span className="font-display font-bold text-accent">
                    {addon.priceUnit === "per_sqft"
                      ? `₹${addon.indicativePrice}/sq ft`
                      : `₹${addon.indicativePrice.toLocaleString("en-IN")}`}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    indicative
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="py-20 lg:py-28 border-b border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Ground-Up Executions
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Completed Plot Builds in West Bengal
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {constructionPortfolio.map((proj) => (
              <div
                key={proj.id}
                className="overflow-hidden rounded-xs border border-border bg-card shadow-md flex flex-col md:flex-row"
              >
                <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    width={600}
                    height={450}
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-mono text-accent">
                      {proj.locality} · {proj.completedYear}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {proj.scope}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                      {proj.keyFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="size-3.5 text-accent mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border font-mono text-xs text-muted-foreground">
                    {proj.areaSqft.toLocaleString("en-IN")} sq ft built-up
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-STEP PROTOCOL */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Engineering Rigour
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              5-Phase Construction Lifecycle
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xs border border-border bg-card p-6 shadow-xs"
              >
                <span className="font-mono text-2xl font-bold text-accent">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-base font-bold">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-center sm:text-3xl">
            Construction Engineering FAQs
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xs border border-border bg-card p-5 shadow-xs">
                <h3 className="font-display text-sm font-bold text-foreground">
                  {f.q}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="py-16 bg-[#0A3632] text-[#F9F7F1] text-center">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
            Own a plot in Kolkata, New Town or Siliguri?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#C2D1CF] max-w-md mx-auto">
            Schedule a physical soil investigation and structural sanction consultation with our Principal Civil Engineer.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20discuss%20turnkey%20construction%20for%20my%20plot."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle className="size-4 fill-white" />
              <span>Connect on WhatsApp (+91 90735 99355)</span>
            </a>
          </div>
          <p className="mt-4 text-xs font-mono text-[#D4A373]">
            {INDICATIVE_PRICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
