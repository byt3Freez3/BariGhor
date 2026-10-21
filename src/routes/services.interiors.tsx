import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  HelpCircle,
  Home,
  Layers,
  MessageCircle,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import {
  getServicePackages,
  getAddOnsForService,
  INDICATIVE_PRICE_DISCLAIMER,
  INDICATIVE_PRICE_DISCLAIMER_BN,
} from "@/data/services";
import { PORTFOLIO_PROJECTS } from "@/data/services-portfolio";

export const Route = createFileRoute("/services/interiors")({
  head: () => {
    const title = "Interior Designers in New Town & Kolkata | Turnkey Home Interiors | BariGhor";
    const desc =
      "Architectural home interiors by the team that built it. IS-710 marine ply, Blum hardware, Italian marble, and false ceilings across New Town, Salt Lake & South Kolkata. Indicative quotes online.";
    const canonical = "https://build-it-better-five.vercel.app/services/interiors";

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
            name: "BariGhor Turnkey Interior Architecture",
            serviceType: "Interior Design & Fit-Out",
            provider: {
              "@type": "HomeAndConstructionBusiness",
              name: "BariGhor",
              url: "https://build-it-better-five.vercel.app",
            },
            areaServed: ["New Town", "Salt Lake", "Alipore", "Kolkata", "West Bengal"],
            description: desc,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: 1250,
              highPrice: 2850,
              priceUnit: "per sq ft (indicative)",
            },
          }),
        },
      ],
    };
  },
  component: InteriorsServicePage,
});

function InteriorsServicePage() {
  const { language } = useAppStore();
  const isBn = language === "bn";

  const interiorTiers = getServicePackages("interiors");
  const interiorAddOns = getAddOnsForService("interiors");
  const interiorPortfolio = PORTFOLIO_PROJECTS.filter((p) => p.category === "interiors");

  const processSteps = [
    {
      step: "01",
      title: "Physical Site Scan & Space Planning",
      desc: "Laser survey of every room aperture, cross-ventilation assessment, conduit path mapping, and 2D spatial layouts with zero hallway waste.",
    },
    {
      step: "02",
      title: "Material Palette & 3D Elevations",
      desc: "Physical samples of IS-710 marine ply, 1mm anti-fingerprint laminates, natural Burma teak veneers, and realistic 3D photometric renders.",
    },
    {
      step: "03",
      title: "Factory Modular Joinery & On-Site Civil",
      desc: "Precision German CNC cutting of modular cabinetry, Gyproc moisture-resistant false ceiling framing, and concealed Finolex conduit installation.",
    },
    {
      step: "04",
      title: "Snag Inspection & Warranty Sign-Off",
      desc: "Multi-point soft-close hinge alignment, drawer weight tests, paint sheen inspection, and handover with comprehensive BariGhor warranty document.",
    },
  ];

  const faqs = [
    {
      q: "What plywood grade do you use in kitchens and bathrooms?",
      a: "We strictly specify IS-710 Marine Grade plywood (710 BWP) for all wet areas including modular kitchen base units and bathroom vanities. Unlike standard commercial ply, our marine ply is pressure-treated with anti-termite chemicals and resists boiling water exposure.",
    },
    {
      q: "How long does a full 3 BHK interior fit-out take in New Town or Salt Lake?",
      a: "A typical 3 BHK execution takes between 45 to 65 working days from 3D design sign-off. Because joinery modules are pre-fabricated under controlled conditions, on-site dust and noise are minimized.",
    },
    {
      q: "Can I customize the packages or choose specific add-ons?",
      a: "Yes. Our three tiers (Essential, Comfort, Signature Luxe) provide transparent starting baselines. You can select individual add-ons like false ceiling lighting grids, custom walk-in wardrobes, or quartz island countertops to match your exact budget.",
    },
    {
      q: "Is the quotation fixed or indicative?",
      a: "Online rates are indicative benchmarks. Every project receives a detailed, itemized BOQ quotation following a free physical site visit by our interior architect.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A3632] text-[#F9F7F1] py-20 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#124B45] border border-[#236860] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#E5B869]">
              <Sparkles className="size-3.5" />
              <span>Interior Design · New Town · Salt Lake · Kolkata</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interiors by the team
              <span className="block italic font-normal text-[#E5B869] mt-2">
                that built it.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#C2D1CF] sm:text-xl">
              One accountable team, one integrated warranty, and zero coordination friction between separate vendors. We deliver finished keys, crafted to the exact structural tolerances of your Kolkata residence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-6 rounded-xs text-sm shadow-md">
                <a
                  href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20discuss%20an%20Interior%20Design%20package%20for%20my%20residence."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Enquire for Interiors on WhatsApp</span>
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

      {/* THREE PACKAGE TIERS */}
      <section className="py-20 lg:py-28 border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Transparent Interior Rates
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Craftsmanship Package Tiers
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Built with certified marine plywood, branded hardware, and non-toxic low-VOC paints.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {interiorTiers.map((tier) => (
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
                        Most Popular
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
                      indicative starting rate
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {tier.blurb}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-3">
                      Included In Scope:
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
                    )}%20Interiors%20Tier%20(%E2%82%B9${tier.indicativePricePerSqft}%2Fsq%20ft).`}
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

      {/* ADD-ON UPGRADES */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Modular Component Add-Ons
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Specialized Architectural Inclusions
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {interiorAddOns.map((addon) => (
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
              Completed Interior Projects
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Executed in Kolkata Residences
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {interiorPortfolio.map((proj) => (
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
                    {proj.areaSqft.toLocaleString("en-IN")} sq ft interior execution
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Rigorous Handover Protocol
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              4-Step Execution Process
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xs border border-border bg-card p-6 shadow-xs"
              >
                <span className="font-mono text-2xl font-bold text-accent">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">
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
            Interior Architecture FAQs
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
            Ready to design your Kolkata home?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#C2D1CF] max-w-md mx-auto">
            Book a non-binding physical site inspection with our Principal Interior Architect.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20schedule%20an%20interior%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle className="size-4 fill-white" />
              <span>Message Advisory on WhatsApp (+91 90735 99355)</span>
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
