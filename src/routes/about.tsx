import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Building,
  CheckCircle2,
  FileCheck2,
  MapPin,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BariGhor — Bengal's Single-Owner Real Estate Publication & Advisory" },
      {
        name: "description",
        content:
          "Our story, 4-pillar physical site verification standard, WBRERA agent licensing, and buyer education seminars across West Bengal.",
      },
    ],
    links: [{ rel: "canonical", href: "https://build-it-better-five.vercel.app/about" }],
  }),
  component: AboutPage,
});

export default function AboutPage() {
  const { language, selectedCity } = useAppStore();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Page Hero */}
      <section className="border-b border-border bg-card/60 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Sparkles className="size-3.5 text-accent" />
            {language === "en" ? "BariGhor Ethos" : "বাড়িঘর পরিচিতি"}
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {language === "en" ? (
              <>
                A boutique publication with{" "}
                <span className="italic font-normal text-accent">single-owner</span> accountability.
              </>
            ) : (
              <>
                একক মালিকানাধীন দায়িত্বে{" "}
                <span className="italic font-normal text-accent">যাচাই করা</span> রিয়েল এস্টেট।
              </>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {language === "en"
              ? "BariGhor was founded on a simple observation: property portals in India have become noisy ad exchanges crowded with duplicate listings, phantom inventories, and aggressive broker spam. We run a single curated portfolio where every home has been physically audited by our own team."
              : "আমরা বিজ্ঞাপন নয়, নির্ভরযোগ্য তথ্য ও যাচাই করা প্রপার্টি বিশ্বাস করি। প্রতিটি বাড়ি আমাদের দল নিজে গিয়ে পরিদর্শন করেছে।"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8 space-y-24">
        {/* SECTION 1: Our Story */}
        <section id="story" className="scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xs bg-primary/10 text-primary font-bold">
              01
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {language === "en" ? "Our Story & Single-Admin Advisory" : "আমাদের গল্প ও একক উপদেষ্টা মডেল"}
            </h2>
          </div>
          <div className="mt-6 prose prose-neutral max-w-none text-muted-foreground leading-relaxed text-base space-y-4">
            <p>
              BariGhor is not an open marketplace. There are no external broker accounts, no paid listing boosts,
              and no user-submitted property forms. The company acts as the single editorial curator and owner of
              all listed inventory across West Bengal.
            </p>
            <p>
              From affordable starter homes in Habra and Asansol to heritage bungalows in Alipore and riverfront
              villas along Foreshore Road in Howrah, every project undergoes physical inspection, municipal
              sanction review, and legal title tracking prior to being published.
            </p>
          </div>
        </section>

        {/* SECTION 2: 4-Pillar Verification Standard */}
        <section id="verification" className="scroll-mt-28 border-t border-border pt-16">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xs bg-accent/20 text-accent font-bold">
              02
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {language === "en"
                ? "The 4-Pillar Physical Verification Standard"
                : "৪-স্তরের ফিজিক্যাল ভেরিফিকেশন মানদণ্ড"}
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            Every home carrying the BariGhor Verified badge has satisfied all four rigorous audits below.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xs border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary/10 text-primary">
                  <FileCheck2 className="size-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">1. Legal Title & Encumbrance Check</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                30-year chain of title audit at the relevant District Registrar Office (DRO). Non-encumbrance
                certificate (NEC) validation, mutation receipt verification, and scrutiny of original mother
                deeds to ensure undisputed ownership.
              </p>
            </div>

            <div className="rounded-xs border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary/10 text-primary">
                  <Building className="size-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">2. Sanctioned Plan Cross-Match</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Verification against official building sanctioned blueprints issued by KMC, NKDA, HMC, or
                relevant municipal bodies. Floor area ratio (FAR), setback compliance, and floor-plate alignment.
              </p>
            </div>

            <div className="rounded-xs border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary/10 text-primary">
                  <ShieldCheck className="size-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">3. Physical Field Audit</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                In-person engineering survey by BariGhor inspectors. Structural integrity check, road crown
                elevation measurement, waterlogging assessment during peak rainfall, and physical cross-ventilation confirmation.
              </p>
            </div>

            <div className="rounded-xs border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary/10 text-primary">
                  <Scale className="size-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">4. WBRERA Escrow & Timeline Audit</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Cross-referencing active registration on rera.wb.gov.in. Verification of designated 70% project
                escrow account routing, quarterly progress filings, and certified possession delivery timelines.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: WBRERA Licence */}
        <section id="licence" className="scroll-mt-28 border-t border-border pt-16">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xs bg-primary/10 text-primary font-bold">
              03
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {language === "en" ? "WBRERA Agent Licence & Disclosures" : "WBRERA রিয়েল এস্টেট এজেন্ট লাইসেন্স"}
            </h2>
          </div>

          <div className="mt-6 rounded-xs border border-accent/30 bg-accent/5 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Statutory Registration
                </p>
                <p className="mt-1 font-mono text-xl font-bold text-foreground">
                  WBRERA/A/KOL/2023/000184
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Registered under Section 9(1) of the Real Estate (Regulation and Development) Act, 2016
                  with the West Bengal Real Estate Regulatory Authority.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Registered Advisory Office
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  BariGhor Advisory Headquarters
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  14 Camac Street, 7th Floor, Kolkata 700017, West Bengal.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Trade Licence: KMC/BL/2023/941842
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Accolades & Citations */}
        <section id="accolades" className="scroll-mt-28 border-t border-border pt-16">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xs bg-primary/10 text-primary font-bold">
              04
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {language === "en" ? "Accolades & Recognition" : "সম্মাননা ও স্বীকৃতি"}
            </h2>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xs border border-border bg-card p-6">
              <Award className="size-8 text-accent" />
              <h3 className="mt-4 font-display text-base font-bold">
                Bengal Chamber of Commerce (BCC&I)
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Excellence in Consumer Real Estate Transparency & Regulatory Compliance (2025).
              </p>
            </div>

            <div className="rounded-xs border border-border bg-card p-6">
              <Award className="size-8 text-accent" />
              <h3 className="mt-4 font-display text-base font-bold">
                Eastern Architectural Digest
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Best Boutique Residential Publication celebrating Bengal's verandah and courtyard heritage.
              </p>
            </div>

            <div className="rounded-xs border border-border bg-card p-6">
              <Award className="size-8 text-accent" />
              <h3 className="mt-4 font-display text-base font-bold">
                CREDAI Bengal Advisory Citation
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Recognized for educational efforts demystifying municipal land titles in Salt Lake and New Town.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Seminars & Buyer Outreach */}
        <section id="seminars" className="scroll-mt-28 border-t border-border pt-16">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xs bg-primary/10 text-primary font-bold">
              05
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {language === "en" ? "Buyer Seminars & Title Workshops" : "ক্রেতা কর্মশালা ও সেমিনার"}
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Every quarter, BariGhor hosts free public education workshops at the Kolkata Academy of Fine Arts
            and Rabindra Tirtha (New Town), teaching prospective homebuyers how to read deed mutation records,
            calculate super built-up loading, and verify WBRERA bank escrow details.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20register%20for%20the%20next%20free%20Property%20Buyer%20Seminar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
            >
              <Users className="size-4" /> Register for Next Free Seminar on WhatsApp
            </a>
            <Link
              to="/$citySlug/properties"
              params={{ citySlug: selectedCity }}
              className="inline-flex items-center gap-2 rounded-xs border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              Browse Verified Homes
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
