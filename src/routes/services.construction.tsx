import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import React, { useState } from "react";
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
import { CONSTRUCTION_CONTENT } from "@/data/services-content";
import { Reveal, RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { STAGGER_PRESETS_MS } from "@/lib/motion";

export const Route = createFileRoute("/services/construction")({
  head: () => {
    const title = "Turnkey Home Construction Kolkata & West Bengal | BariGhor";
    const desc =
      "Ground-up villa & independent plot construction in New Town, Salt Lake & Kolkata. Soil bore logging, HIDCO/KMC sanctions, Seismic Zone IV RCC frames, and 10-year structural warranty.";
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
            name: "BariGhor Turnkey Plot Construction",
            serviceType: "Civil Engineering & Home Construction",
            provider: {
              "@type": "HomeAndConstructionBusiness",
              name: "BariGhor",
            },
            areaServed: ["Kolkata", "New Town", "Salt Lake", "Howrah", "Siliguri"],
            description: desc,
          }),
        },
      ],
    };
  },
  component: ConstructionServicePage,
});

function TierInclusionsList({ included }: { included: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const topInclusions = included.slice(0, 5);
  const remainingInclusions = included.slice(5);

  return (
    <div className="mt-6 pt-4 border-t border-border">
      <p className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-3">
        Included In Scope:
      </p>
      <ul className="space-y-2 text-xs text-muted-foreground">
        {topInclusions.map((inc, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{inc}</span>
          </li>
        ))}
        {showAll &&
          remainingInclusions.map((inc, i) => (
            <li key={i + 5} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>{inc}</span>
            </li>
          ))}
      </ul>
      {remainingInclusions.length > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline cursor-pointer"
        >
          <span>{showAll ? "Show less" : `+ ${remainingInclusions.length} more inclusions`}</span>
          {showAll ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>
      )}
    </div>
  );
}

function ConstructionServicePage() {
  const { language } = useAppStore();
  const isBn = language === "bn";

  const constructionTiers = getServicePackages("construction");
  const constructionAddOns = getAddOnsForService("construction");
  const constructionPortfolio = PORTFOLIO_PROJECTS.filter((p) => p.category === "construction");

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* HERO — NO REVEAL (Above the fold, paints immediately for CWV & LCP < 2.0s) */}
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
              From soil testing and HIDCO/NKDA municipal sanction drawings to deep bored RCC pile foundations and turnkey key handover. One team, one master structural warranty.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-6 rounded-xs text-sm shadow-md button-press">
                <a
                  href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20discuss%20a%20turnkey%20construction%20project%20for%20my%20plot."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Consult Civil Engineer on WhatsApp</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="border-[#236860] bg-transparent text-[#F9F7F1] hover:bg-[#0E4944] px-6 py-6 text-sm font-semibold rounded-xs button-press">
                <a href="#tiers">View Construction Tiers ↓</a>
              </Button>
            </div>

            <p className="mt-4 text-xs italic font-mono text-[#D4A373]">
              {INDICATIVE_PRICE_DISCLAIMER}
              {isBn && <span className="ml-2 not-italic" lang="bn">({INDICATIVE_PRICE_DISCLAIMER_BN})</span>}
            </p>
          </div>
        </div>
      </section>

      {/* THREE CONSTRUCTION TIERS — Recommended settles last with deeper resting shadow (STEP A3) */}
      <section id="tiers" className="band-wash-a py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow={CONSTRUCTION_CONTENT.eyebrow}
            title={CONSTRUCTION_CONTENT.title}
            description={CONSTRUCTION_CONTENT.subhead}
          />

          <RevealGroup
            staggerMs={STAGGER_PRESETS_MS.packageTier}
            order="recommended-last"
            className="mt-14 grid gap-8 sm:grid-cols-3"
          >
            {constructionTiers.map((tier) => {
              const isRecommended = tier.tier === "comfort";
              return (
                <Reveal key={tier.id} as="div">
                  <div
                    className={`flex h-full flex-col justify-between rounded-xs border p-6 sm:p-8 card-hover-lift ${
                      isRecommended
                        ? "border-accent bg-card shadow-xl ring-2 ring-accent/30"
                        : "border-border bg-card shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                          {tier.tier}
                        </span>
                        {isRecommended && (
                          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                            Recommended
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

                      <TierInclusionsList included={tier.included} />
                    </div>

                    <div className="mt-8 pt-4 border-t border-border">
                      <a
                        href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                          tier.nameEn
                        )}%20Construction%20Tier%20(%E2%82%B9${tier.indicativePricePerSqft}%2Fsq%20ft).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#0A3632] py-2.5 px-4 text-xs font-semibold text-white transition-colors hover:bg-accent button-press"
                      >
                        <span>Enquire for {tier.nameEn}</span>
                        <ArrowRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </RevealGroup>

          <p className="mt-8 text-center text-xs italic font-mono text-muted-foreground">
            {INDICATIVE_PRICE_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ADD-ON UPGRADES (STEP A2: 60ms stagger) */}
      <section className="band-wash-b py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Civil Engineering Add-Ons"
            title="Specialized Structural Inclusions"
          />

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.cardGrid} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {constructionAddOns.map((addon) => (
              <Reveal key={addon.id} as="div">
                <div className="flex h-full flex-col justify-between rounded-xs border border-border bg-card p-5 shadow-xs card-hover-lift">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-muted">
                      <img
                        src={addon.thumbnail}
                        alt={addon.title}
                        loading="lazy"
                        width={300}
                        height={225}
                        className="size-full object-cover transition-transform duration-base group-hover:scale-[1.03]"
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
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE (STEP A2: 120ms stagger) */}
      <section className="band-wash-a py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Completed Plot Builds"
            title="Engineered Villas & Independent Homes"
          />

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.portfolio} className="mt-12 grid gap-8 sm:grid-cols-2">
            {constructionPortfolio.map((proj) => (
              <Reveal key={proj.id} as="div">
                <div className="overflow-hidden rounded-xs border border-border bg-card shadow-md flex flex-col md:flex-row h-full card-hover-lift">
                  <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      width={600}
                      height={450}
                      className="size-full object-cover transition-transform duration-base group-hover:scale-[1.03]"
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
                        {proj.keyFeatures.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent font-bold">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-3 border-t border-border font-mono text-xs text-muted-foreground">
                      {proj.areaSqft.toLocaleString("en-IN")} sq ft constructed
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PROCESS TIMELINE — Strictly sequential 01 -> 05 (STEP A2) */}
      <section className="band-wash-b py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Engineering Roadmap"
            title="5-Stage Construction Process"
          />

          <RevealGroup staggerMs={STAGGER_PRESETS_MS.processStep} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CONSTRUCTION_CONTENT.processSteps.map((s) => (
              <Reveal key={s.num} as="div">
                <div className="flex h-full flex-col justify-between rounded-xs border border-border bg-card p-6 shadow-xs card-hover-lift">
                  <div>
                    <span className="font-mono text-2xl font-bold text-accent">
                      {s.num}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQS — GPU-friendly Accordion (STEP A4) */}
      <section className="band-wash-deep py-20 border-b border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Construction Engineering FAQs"
            title="Codes, Soil & Structural Warranties"
          />

          <div className="mt-10">
            <FaqAccordion
              items={CONSTRUCTION_CONTENT.faqs.map((f) => ({
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

      {/* WHATSAPP CTA */}
      <section className="py-16 bg-[#0A3632] text-[#F9F7F1] text-center">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal as="div">
            <h2 className="font-display text-2xl font-bold sm:text-3xl text-white">
              {CONSTRUCTION_CONTENT.ctaHeadline}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#C2D1CF] max-w-md mx-auto">
              {CONSTRUCTION_CONTENT.ctaCopy}
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20schedule%20a%20structural%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1DA851] transition-colors button-press"
              >
                <MessageCircle className="size-4 fill-white" />
                <span>Message Civil Desk on WhatsApp (+91 90735 99355)</span>
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
