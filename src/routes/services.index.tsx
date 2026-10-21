import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  Hammer,
  HelpCircle,
  Home,
  Layers,
  MessageCircle,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { BlurImage } from "@/components/blur-image";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import {
  getServicePackages,
  INDICATIVE_PRICE_DISCLAIMER,
  INDICATIVE_PRICE_DISCLAIMER_BN,
} from "@/data/services";
import { PORTFOLIO_PROJECTS } from "@/data/services-portfolio";

export const Route = createFileRoute("/services/")({
  head: () => {
    const title = "Architectural Services & Turnkey Construction Kolkata | BariGhor";
    const desc =
      "West Bengal's vertically integrated property house: we survey land, engineer ground-up residential construction, and craft bespoke turnkey interiors under one unified warranty.";
    const canonical = "https://build-it-better-five.vercel.app/services";

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
            "@type": "HomeAndConstructionBusiness",
            name: "BariGhor Architectural & Construction Services",
            url: canonical,
            description: desc,
            areaServed: ["Kolkata", "New Town", "Salt Lake", "Howrah", "West Bengal"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Unified Residential Architecture & Construction Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Turnkey Residential Interior Architecture",
                    description: "End-to-end bespoke interior design, joinery, and lighting.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Ground-Up Villa & Plot Construction",
                    description: "Seismic Zone IV engineered home construction on freehold plots.",
                  },
                },
              ],
            },
          }),
        },
      ],
    };
  },
  component: ServicesOverviewPage,
});

function ServicesOverviewPage() {
  const { language } = useAppStore();
  const isBn = language === "bn";

  const interiorTiers = getServicePackages("interiors");
  const constructionTiers = getServicePackages("construction");

  const processSteps = [
    {
      num: "01",
      title: "Field Survey & Sanction Audit",
      titleBn: "সাইট অডিট ও স্যাংশন পরীক্ষা",
      desc: "Every project starts on the ground. We check soil bore logs, plinth elevation above road crown, HIDCO/KMC sanction status, and structural load allowances.",
      icon: Ruler,
    },
    {
      num: "02",
      title: "Architectural 3D Drafting & MEP Design",
      titleBn: "আর্কিটেকচারাল নকশা ও ৩ডি ড্রাফটিং",
      desc: "Detailed isometric floor layouts, concealed electrical conduit plans, plumbing pressure simulations, and 3D joinery elevations with exact material schedules.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Precision Execution by One Dedicated Crew",
      titleBn: "নির্দিষ্ট কারিগরদের তত্ত্বাবধানে নিখুঁত কাজ",
      desc: "Our own civil engineers and master carpenters execute the build. No sub-contracting to anonymous third-party labor. One accountable site supervisor on call.",
      icon: Hammer,
    },
    {
      num: "04",
      title: "Multi-Tier Snag Inspection & Turnkey Keys",
      titleBn: "মাল্টি-টিয়ার পরিদর্শন ও চাবি হস্তান্তর",
      desc: "Laser plinth checks, chemical crystalline waterproofing pressure testing, acoustic baffle validation, and clean-room cleaning before final handover.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: "Why hire the same company to build and furnish the home?",
      a: "Outside interior contractors frequently drill through concealed conduits, damage beam rebars, or miscalculate structural loads. Because our engineering team oversees the structural drawings, our interior architects build directly to the millimeter-exact blueprints of the residence. You receive one accountable point of contact, one master warranty, and zero blame-shifting.",
    },
    {
      q: "Are the package prices final or indicative?",
      a: "All figures displayed online are strictly indicative starting benchmarks based on typical floorplates. Every home receives an exhaustive, non-binding physical site visit and formal BOQ (Bill of Quantities) quotation before any agreement is signed.",
    },
    {
      q: "Which areas in West Bengal do you operate in?",
      a: "Our active construction and interior teams currently operate across Kolkata, New Town (Action Areas I, II, III), Salt Lake (Bidhannagar), Howrah (Shibpur corridor), and Siliguri (Sevoke Road foothills).",
    },
    {
      q: "What warranties do you provide on completion?",
      a: "Construction packages carry up to a 10-year bonded structural guarantee and 5-year crystalline waterproofing warranty. Interior packages include a 3 to 5-year comprehensive craftsmanship warranty covering joinery, hinges, and drawer runners.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A3632] text-[#F9F7F1] py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#124B45] border border-[#236860] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#E5B869]">
              <Sparkles className="size-3.5" />
              <span>Vertically Integrated Property House</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Architectural Precision.
              <span className="block italic font-normal text-[#E5B869] mt-2">
                From Groundwork to Fine Woodwork.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#C2D1CF] sm:text-xl">
              West Bengal's only single-admin property ecosystem where the same team that verifies your title and surveys your land can engineer your structural home and craft bespoke turnkey interiors.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-6 rounded-xs text-sm shadow-md">
                <a
                  href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20consult%20with%20your%20Architectural%20Advisory%20team."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Consult Advisory on WhatsApp</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="border-[#236860] bg-transparent text-[#F9F7F1] hover:bg-[#0E4944] px-6 py-6 text-sm font-semibold rounded-xs">
                <a href="#pillars">Explore Core Offerings ↓</a>
              </Button>
            </div>

            <p className="mt-4 text-xs italic font-mono text-[#D4A373]">
              {INDICATIVE_PRICE_DISCLAIMER}
              {isBn && <span className="ml-2 not-italic" lang="bn">({INDICATIVE_PRICE_DISCLAIMER_BN})</span>}
            </p>
          </div>
        </div>
      </section>

      {/* CORE SERVICES PILLARS (INTERIORS & CONSTRUCTION) */}
      <section id="pillars" className="py-20 lg:py-28 border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Unified Vertical Capabilities
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Two Disciplines. One Accountable Standard.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Select your requirement below to explore specific process roadmaps, tier rates, and past completed projects.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* PILLAR 1: INTERIORS */}
            <div className="group flex flex-col justify-between rounded-xs border border-border bg-card p-8 sm:p-10 shadow-xs hover:border-accent hover:shadow-xl transition-all duration-base">
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xs bg-primary/10 text-primary">
                    <Paintbrush className="size-6 text-accent" />
                  </div>
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent">
                    From ₹1,250/sq ft (indicative)
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                  Turnkey Interior Architecture
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Tailored modular cabinetry, Italian marble floor inlays, Saint-Gobain acoustic false ceilings, and smart scene lighting designed for Kolkata apartments and boutique villas.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>IS-710 Marine ply & BWR grade termite-resistant joinery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Blum & Hafele soft-close hardware with lifetime factory warranty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Direct coordination with building structural blue-prints</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Link
                  to="/services/interiors"
                  className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent hover:underline"
                >
                  <span>Explore Interior Design Services</span>
                  <ArrowRight className="size-4" />
                </Link>
                <span className="text-xs text-muted-foreground font-mono">3 Tiers Available</span>
              </div>
            </div>

            {/* PILLAR 2: CONSTRUCTION */}
            <div className="group flex flex-col justify-between rounded-xs border border-border bg-card p-8 sm:p-10 shadow-xs hover:border-accent hover:shadow-xl transition-all duration-base">
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xs bg-primary/10 text-primary">
                    <Building className="size-6 text-accent" />
                  </div>
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent">
                    From ₹1,950/sq ft (indicative)
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                  Turnkey Plot Construction
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Ground-up villa and independent home construction on freehold plots. From municipal sanction drawings and soil testing to deep pile RCC frames and handover.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Bored cast-in-situ RCC pile foundation engineered for alluvial soil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Seismic Zone IV engineered frame with Fe500D / Fe550D TMT</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>10-year structural integrity guarantee signed off by licensed engineers</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Link
                  to="/services/construction"
                  className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent hover:underline"
                >
                  <span>Explore Plot Construction Services</span>
                  <ArrowRight className="size-4" />
                </Link>
                <span className="text-xs text-muted-foreground font-mono">3 Tiers Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-20 lg:py-28 border-b border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Execution Methodology
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              How We Deliver Turnkey Homes
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A transparent, milestone-gated process from first physical site audit to key handover.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex flex-col justify-between rounded-xs border border-border bg-card p-6 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-accent">
                        {step.num}
                      </span>
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold">
                      {step.title}
                    </h3>
                    {isBn && (
                      <p className="text-xs text-accent mt-0.5" lang="bn">
                        {step.titleBn}
                      </p>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Past Completed Projects
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Executed Across Kolkata & West Bengal
              </h2>
            </div>
            <div className="flex gap-3">
              <Link
                to="/services/interiors"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Interiors Gallery →
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link
                to="/services/construction"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Construction Gallery →
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PORTFOLIO_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="group flex flex-col overflow-hidden rounded-xs border border-border bg-card shadow-xs hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="size-full object-cover transition-transform duration-base group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-xs bg-primary/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-xs">
                    {proj.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      {proj.locality} · {proj.completedYear}
                    </p>
                    <h4 className="mt-1 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {proj.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {proj.scope}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-accent">
                    {proj.areaSqft.toLocaleString("en-IN")} sq ft executed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 lg:py-28 border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Clarifications & Standards
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-border bg-card p-6 shadow-xs"
              >
                <h3 className="font-display text-base font-bold text-foreground">
                  {faq.q}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL WHATSAPP CALLOUT */}
      <section className="py-16 bg-[#0A3632] text-[#F9F7F1]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
            Plan your next build or interior project with us.
          </h2>
          <p className="mt-2 text-sm text-[#C2D1CF] max-w-xl mx-auto">
            Speak directly with our senior architectural advisory desk. Direct WhatsApp dispatch with zero brokerage intermediaries.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20schedule%20an%20architectural%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle className="size-4 fill-white" />
              <span>Inquire with Advisory (+91 90735 99355)</span>
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
