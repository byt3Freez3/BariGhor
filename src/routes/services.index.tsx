import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Hammer,
  Layers,
  MessageCircle,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { VideoBackdrop } from "@/components/video-backdrop";
import { useAppStore } from "@/lib/store";
import {
  INDICATIVE_PRICE_DISCLAIMER,
  INDICATIVE_PRICE_DISCLAIMER_BN,
} from "@/data/services";
import { PORTFOLIO_PROJECTS } from "@/data/services-portfolio";
import { SERVICES_HUB_CONTENT } from "@/data/services-content";
import { Reveal, RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { STAGGER_PRESETS_MS } from "@/lib/motion";

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

  const stepIcons = [Ruler, Layers, Hammer, ShieldCheck];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* HERO SECTION — NO REVEAL ANIMATION (Paints immediately for CWV & LCP < 2.0s) */}
      <section className="relative overflow-hidden isolate bg-[#0A3632] text-[#F9F7F1] py-20 lg:py-28">
        <VideoBackdrop />

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
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
              <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-6 rounded-xs text-sm shadow-md button-press">
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

              <Button asChild variant="outline" className="border-[#236860] bg-transparent text-[#F9F7F1] hover:bg-[#0E4944] px-6 py-6 text-sm font-semibold rounded-xs button-press">
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
          <SectionHeading
            eyebrow={SERVICES_HUB_CONTENT.eyebrow}
            title={SERVICES_HUB_CONTENT.title}
            description={SERVICES_HUB_CONTENT.subhead}
          />

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.portfolio} className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* PILLAR 1: INTERIORS */}
            <Reveal as="div">
              <div className="group flex h-full flex-col justify-between rounded-xs border border-border bg-card p-8 sm:p-10 shadow-xs card-hover-lift">
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
                    Modular cabinetry, Italian marble insets, Saint-Gobain acoustic ceilings, and architectural scene lighting.
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
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent animated-underline"
                  >
                    <span>Explore Interior Design Services</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground font-mono">3 Tiers Available</span>
                </div>
              </div>
            </Reveal>

            {/* PILLAR 2: CONSTRUCTION */}
            <Reveal as="div">
              <div className="group flex h-full flex-col justify-between rounded-xs border border-border bg-card p-8 sm:p-10 shadow-xs card-hover-lift">
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
                    Ground-up home construction on freehold plots from municipal sanctions and soil tests to deep pile RCC frames.
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
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent animated-underline"
                  >
                    <span>Explore Plot Construction Services</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground font-mono">3 Tiers Available</span>
                </div>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      {/* PROCESS TIMELINE — Strictly sequential 01 -> 04 (STEP A2) */}
      <section className="py-20 lg:py-28 border-b border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Execution Methodology"
            title="How We Deliver Turnkey Homes"
            description="A transparent, milestone-gated process from first physical site audit to key handover."
          />

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.processStep} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES_HUB_CONTENT.processSteps.map((step, idx) => {
              const Icon = stepIcons[idx] || Ruler;
              return (
                <Reveal key={step.num} as="div">
                  <div className="flex h-full flex-col justify-between rounded-xs border border-border bg-card p-6 shadow-xs card-hover-lift">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-bold text-accent">
                          {step.num}
                        </span>
                        <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold">
                        {step.title}
                      </h3>
                      {isBn && step.titleBn && (
                        <p className="text-xs text-accent mt-0.5" lang="bn">
                          {step.titleBn}
                        </p>
                      )}
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
      <section className="py-20 lg:py-28 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Past Completed Projects"
              title="Executed Across Kolkata & West Bengal"
              align="left"
            />
            <div className="flex gap-3 text-xs font-semibold text-accent">
              <Link to="/services/interiors" className="hover:underline">
                Interiors Gallery →
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/services/construction" className="hover:underline">
                Construction Gallery →
              </Link>
            </div>
          </div>

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.portfolio} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PORTFOLIO_PROJECTS.map((proj) => (
              <Reveal key={proj.id} as="div">
                <div className="group flex h-full flex-col overflow-hidden rounded-xs border border-border bg-card shadow-xs card-hover-lift">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="size-full object-cover transition-transform duration-base group-hover:scale-[1.03]"
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
                      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                        {proj.keyFeatures.slice(0, 4).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-accent font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-accent">
                      {proj.areaSqft.toLocaleString("en-IN")} sq ft executed
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQS — GPU-friendly Accordion (STEP A4) */}
      <section className="py-20 lg:py-28 border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Clarifications & Standards"
            title="Frequently Asked Questions"
          />

          <div className="mt-12">
            <FaqAccordion
              items={SERVICES_HUB_CONTENT.faqs.map((f) => ({
                q: f.q,
                a: (
                  <div>
                    <p className="font-medium text-foreground">{f.lead}</p>
                    <ul className="mt-3 space-y-1.5 pl-1">
                      {f.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-accent font-bold" aria-hidden="true">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* FINAL WHATSAPP CALLOUT */}
      <section className="py-16 bg-[#0A3632] text-[#F9F7F1]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <Reveal as="div">
            <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
              {SERVICES_HUB_CONTENT.ctaHeadline}
            </h2>
            <p className="mt-2 text-sm text-[#C2D1CF] max-w-xl mx-auto">
              {SERVICES_HUB_CONTENT.ctaCopy}
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20schedule%20an%20architectural%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1DA851] transition-colors button-press"
              >
                <MessageCircle className="size-4 fill-white" />
                <span>Inquire with Advisory (+91 90735 99355)</span>
              </a>
            </div>
            <p className="mt-4 text-xs font-mono text-[#D4A373]">
              {INDICATIVE_PRICE_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
