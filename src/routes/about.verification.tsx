import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  MapPin,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/reveal";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/about/verification")({
  head: () => ({
    meta: [
      { title: "BariGhor Verification Standard — 4-Pillar Due Diligence | West Bengal" },
      {
        name: "description",
        content:
          "How BariGhor audits every listed home across West Bengal: 30-year title deeds, municipal sanctioned plans, on-site structural/flood checks, and WBRERA statutory verification.",
      },
      { property: "og:title", content: "BariGhor 4-Pillar Verification Standard" },
      {
        property: "og:description",
        content:
          "Zero ghost listings. Zero unauthorized floors. Read how our engineers verify titles, building sanctions, flood risks, and WBRERA compliance.",
      },
      { property: "og:url", content: "https://build-it-better-five.vercel.app/about/verification" },
    ],
    links: [{ rel: "canonical", href: "https://build-it-better-five.vercel.app/about/verification" }],
  }),
  component: AboutVerificationPage,
});

export default function AboutVerificationPage() {
  const { language, selectedCity } = useAppStore();

  const auditPillars = [
    {
      step: "01",
      title: "30-Year Title Search & Encumbrance Audit",
      bengaliTitle: "ত্রিশ বছরের মালিকানা ও দায়মুক্তি যাচাই",
      icon: FileCheck2,
      summary:
        "Every single home undergoes a legal investigation tracing ownership deeds back thirty years at the Directorate of Registration and Stamp Revenue, West Bengal.",
      checks: [
        "Chain of title tracing from original zamindari / government lease grant to present owner",
        "Non-Encumbrance Certificate (NEC) search from Form 15 & 16 across district registries",
        "Verification of mutation certificate with KMC / NKDA / local municipal records",
        "Up-to-date property tax receipts and Khajna payments without outstanding liabilities",
        "Scrutiny for pending litigations, partition suits, or bank mortgage liens",
      ],
    },
    {
      step: "02",
      title: "Municipal Sanction & Blueprint Conformance",
      bengaliTitle: "পৌর অনুমোদন ও ব্লুপ্রিন্ট মিলিয়ে দেখা",
      icon: Building2,
      summary:
        "We obtain official sanction blueprints directly from KMC, HMC, NKDA, BMC, or local bodies and audit the structure room-by-room against approved floor plans.",
      checks: [
        "Sanctioned plan validity and adherence to Floor Area Ratio (FAR) restrictions",
        "Audit against unauthorized rooftop constructions, illegal mezzanine levels, or covered setbacks",
        "Structural engineer vetting for earthquake resistance (Zone III / IV compliance)",
        "Fire and Emergency Services NOC verification for mid-rise and high-rise developments",
        "Environmental Clearance (SEIAA) and PCB consent-to-establish certificates",
      ],
    },
    {
      step: "03",
      title: "Physical Site Engineering Survey",
      bengaliTitle: "সরাসরি সাইট পরিদর্শন ও ড্রেনেজ পরীক্ষা",
      icon: ShieldCheck,
      summary:
        "Our in-house civil engineers visit every site in person. We measure carpet areas with laser rangefinders and evaluate monsoon flood exposure.",
      checks: [
        "Laser measurement of RERA usable carpet area to detect developer super-built markup",
        "Road crown elevation measurement relative to high-tide monsoon waterlogging levels",
        "Soil bearing capacity report and pile foundation audit for low-lying and riverbank zones",
        "Actual photographic and video documentation of physical construction milestones",
        "Groundwater testing, overhead water reservoir adequacy, and transformer capacity checks",
      ],
    },
    {
      step: "04",
      title: "WBRERA Registration & Escrow Cross-Check",
      bengaliTitle: "ডাব্লুবি-রেরা রেজিস্ট্রেশন ও এসক্রো অ্যাকাউন্ট যাচাই",
      icon: Scale,
      summary:
        "We verify compliance on the official West Bengal Real Estate Regulatory Authority portal (rera.wb.gov.in) and audit developer financial transparency.",
      checks: [
        "Active WBRERA project registration certificate and quarterly compliance filings",
        "Designated 70% project escrow bank account confirmation for buyer deposit ring-fencing",
        "Certified delivery schedule matching developer representations to buyers",
        "Encumbrance disclosure on land title uploaded to the statutory authority portal",
        "Clear demarcation of common areas, parking allotments, and club amenities",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <SiteHeader sticky />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/$citySlug" params={{ citySlug: selectedCity }} className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/about" className="transition-colors hover:text-primary">
              About
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">Verification Standard</span>
          </div>

          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/$citySlug/properties" params={{ citySlug: selectedCity }}>
              <ArrowLeft className="mr-1 size-3.5" /> Back to listings
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="border-b border-border bg-card/70 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
            <BadgeCheck className="size-4 text-emerald-600" />
            100% Physically Audited Portfolio
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {language === "en" ? (
              <>
                The BariGhor <span className="italic font-normal text-accent">4-Pillar</span> Verification Standard.
              </>
            ) : (
              <>
                বাড়িঘরের <span className="italic font-normal text-accent">৪-স্তরের</span> নির্ভরযোগ্য অডিট মানদণ্ড।
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {language === "en"
              ? "Unlike open property portals that harvest unvetted broker submissions, BariGhor operates as a single-admin publication. Every residence on this platform has been physically surveyed, title-checked, and cross-matched against municipal blueprints."
              : "আমরা কোনো ওপেন বিজ্ঞাপন সাইট নই। আমাদের প্রতিটি বাড়ি নিজস্ব প্রকৌশলী দল দ্বারা সরাসরি সরেজমিনে যাচাই করা।"}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#pillars"
              className="rounded-xs bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Explore the 4 Pillars
            </a>
            <WhatsAppAction
              context="verification"
              variant="outline"
              size="default"
              label="Request Title Report on WhatsApp"
            />
          </div>
        </div>
      </section>

      {/* Statutory Licensing Banner */}
      <Reveal as="section" className="border-b border-border bg-accent/5 py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xs border border-accent/20 bg-card p-6 shadow-xs md:flex-row">
            <div className="flex items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xs bg-accent/20 text-accent">
                <Scale className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Statutory Regulatory Compliance
                </p>
                <p className="font-mono text-lg font-bold text-foreground">
                  West Bengal RERA Agent Registration: WBRERA/A/KOL/2023/000184
                </p>
                <p className="text-xs text-muted-foreground">
                  Issued under Section 9(1) of the Real Estate (Regulation and Development) Act, 2016.
                </p>
              </div>
            </div>

            <a
              href="https://rera.wb.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline shrink-0"
            >
              Verify on rera.wb.gov.in <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* 4 AUDIT PILLARS IN DETAIL */}
      <section id="pillars" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 scroll-mt-24">
        <Reveal as="div" className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Rigorous Due Diligence</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How Every Property Earns the Verified Badge
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            A property is approved for publication only when it satisfies all four pillars without exception.
          </p>
        </Reveal>

        <RevealGroup staggerMs={80} className="mt-14 space-y-12">
          {auditPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.step}
                index={idx}
                as="article"
                className="grid gap-8 rounded-xs border border-border bg-card p-8 shadow-xs md:grid-cols-[0.8fr_1.2fr] lg:p-10 transition-shadow duration-base ease-out hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xs bg-primary/10 font-mono text-sm font-bold text-primary">
                      {pillar.step}
                    </span>
                    <Icon className="size-6 text-accent" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground font-sans">
                    {pillar.bengaliTitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {pillar.summary}
                  </p>
                </div>

                <div className="rounded-xs border border-border bg-background/50 p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Mandatory Engineering & Legal Checklist
                  </p>
                  <ul className="mt-4 space-y-3">
                    {pillar.checks.map((chk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </section>

      {/* FAQ / Direct Advisory CTA */}
      <Reveal as="section" className="border-t border-border bg-card/60 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <ClipboardCheck className="mx-auto size-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-bold">Have Questions About a Property's Title?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Our legal advisory desk provides prospective buyers with municipal sanction copies,
            encumbrance summaries, and WBRERA documentation before you put down any token deposit.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <WhatsAppAction
              context="verification"
              variant="accent"
              size="lg"
              label="Chat with Due Diligence Desk on WhatsApp"
            />
            <Button asChild variant="outline" size="lg">
              <Link to="/$citySlug/properties" params={{ citySlug: selectedCity }}>
                Browse Verified Properties
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <SiteFooter />
    </main>
  );
}
