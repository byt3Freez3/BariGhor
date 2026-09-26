import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Building2, Clock3, MapPin, Search, ShieldCheck, TrainFront, Trees } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmiCalculator } from "@/components/emi-calculator";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { featured, imagery, localities } from "@/lib/properties";

const trustSignals = [
  { Icon: BadgeCheck, value: "143", label: "WBHIRA-checked homes" },
  { Icon: ShieldCheck, value: "100%", label: "Listings manually reviewed" },
  { Icon: Clock3, value: "12 min", label: "Median enquiry response" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BariGhor — Curated Homes in Kolkata" },
      { name: "description", content: "Discover verified homes and honest neighbourhood intelligence across Kolkata and West Bengal." },
      { property: "og:title", content: "BariGhor — Curated Homes in Kolkata" },
      { property: "og:description", content: "A considered way to find your next address in Kolkata." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

const copy = {
  en: { eyebrow: "Homes with a Kolkata point of view", title: "Your next address, made simple.", body: "Verified homes and the neighbourhood detail that national portals leave out.", explore: "Explore curated homes" },
  bn: { eyebrow: "কলকাতাকে চিনে, এমন বাড়ির খোঁজ", title: "আপনার পরের ঠিকানা, আরও সহজে।", body: "যাচাই করা বাড়ি, আর পাড়ার সেই সব খবর যা বড় পোর্টালে থাকে না।", explore: "বাছাই করা বাড়ি দেখুন" },
};

function IndexPage() {
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [locality, setLocality] = useState("New Town");
  const [budget, setBudget] = useState("₹1–2 Cr");
  const [bedrooms, setBedrooms] = useState("3 BHK");
  const [searched, setSearched] = useState(false);
  const text = copy[language];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-hero text-hero-foreground">
        <img src={imagery.heroImage} alt="Contemporary residences beside Kolkata's New Town wetlands at sunset" width={1920} height={1280} fetchPriority="high" className="ken-burns absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--hero)_90%,transparent)_0%,color-mix(in_oklab,var(--hero)_60%,transparent)_48%,color-mix(in_oklab,var(--hero)_16%,transparent)_100%)]" />
        <SiteHeader inverse language={language} onLanguage={() => setLanguage((value) => value === "en" ? "bn" : "en")} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 lg:px-8 lg:pb-16">
          <div className="reveal-up max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent"><span className="h-px w-9 bg-accent" />{text.eyebrow}</p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">{text.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-hero-foreground/78 md:text-lg">{text.body}</p>
          </div>
          <form className="glass-panel mt-9 grid max-w-5xl gap-px overflow-hidden border border-hero-foreground/30 md:grid-cols-[1.25fr_1fr_0.8fr_auto]" onSubmit={(event) => { event.preventDefault(); setSearched(true); document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" }); }}>
            <label className="bg-background/70 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Locality<select value={locality} onChange={(event) => setLocality(event.target.value)} className="mt-1 block w-full bg-transparent text-base font-semibold text-foreground outline-none"><option>New Town</option><option>Salt Lake</option><option>Alipore</option><option>Rajarhat</option></select></label>
            <label className="bg-background/70 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Budget<select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-1 block w-full bg-transparent text-base font-semibold text-foreground outline-none"><option>₹1–2 Cr</option><option>₹75 L–1 Cr</option><option>₹2–4 Cr</option><option>₹4 Cr+</option></select></label>
            <label className="bg-background/70 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Home type<select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="mt-1 block w-full bg-transparent text-base font-semibold text-foreground outline-none"><option>3 BHK</option><option>2 BHK</option><option>4 BHK</option><option>Villa</option></select></label>
            <Button type="submit" size="lg" className="h-full rounded-none px-8"><Search className="size-4" />{text.explore}</Button>
          </form>
          <p className="mt-3 text-xs text-hero-foreground/65">Demonstration inventory · Final availability subject to verification</p>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          {trustSignals.map(({ Icon, value, label }) => <div key={label} className="flex items-center gap-4 py-7 md:justify-center"><Icon className="size-6 text-copper" /><div><p className="font-display text-2xl">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div></div>)}
        </div>
      </section>

      <section id="localities" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-copper">Neighbourhood notes</p><h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight md:text-6xl">Choose the para, not just the pin.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Grounded guidance on connectivity, character, approvals, and the everyday realities of each address.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {localities.map((item, index) => <article key={item.name} className={`group relative overflow-hidden ${index === 1 ? "md:mt-12" : ""}`}><img src={item.image} alt={`${item.name} neighbourhood in Kolkata`} width={1408} height={1056} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--hero)_88%,transparent)_100%)]" /><div className="absolute inset-x-0 bottom-0 p-6 text-hero-foreground"><div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-3xl">{item.name}</h3><span className="text-sm text-accent">{item.bengali}</span></div><p className="mt-2 text-sm leading-6 text-hero-foreground/75">{item.note}</p><p className="mt-4 border-t border-hero-foreground/25 pt-4 text-xs font-semibold">{item.price}</p></div></article>)}
        </div>
      </section>

      <section id="homes" className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-accent">Handpicked this week</p><h2 className="mt-3 font-display text-4xl md:text-6xl">One home, looked at properly.</h2></div>{searched ? <p className="max-w-md border-l-2 border-accent pl-4 text-sm text-primary-foreground/70">Showing the closest curated match for {bedrooms} in {locality}, within {budget}.</p> : null}</div>
          <div className="mt-10 grid overflow-hidden border border-primary-foreground/20 lg:grid-cols-[1.45fr_0.8fr]">
            <Link to="/property/$slug" params={{ slug: featured.slug }} className="group relative min-h-[460px] overflow-hidden"><img src={featured.image} alt={featured.title} width={1920} height={1280} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.025]" /><span className="absolute left-5 top-5 bg-card px-3 py-2 text-xs font-bold uppercase tracking-widest text-card-foreground">WBHIRA verified</span></Link>
            <div className="flex flex-col justify-between bg-background p-7 text-foreground md:p-10"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-copper"><MapPin className="size-4" />{featured.location}</p><h3 className="mt-5 font-display text-4xl md:text-5xl">{featured.title}</h3><p className="mt-4 text-xl font-semibold text-primary">{featured.price}</p><p className="mt-2 text-sm text-muted-foreground">{featured.configuration} · {featured.status}</p><div className="mt-8 grid grid-cols-2 gap-3 border-y border-border py-6 text-sm"><span className="flex items-center gap-2"><TrainFront className="size-4 text-copper" />Metro 2.1 km</span><span className="flex items-center gap-2"><Trees className="size-4 text-copper" />Low flood risk</span><span className="flex items-center gap-2"><Building2 className="size-4 text-copper" />HIDCO approved</span><span className="flex items-center gap-2"><BadgeCheck className="size-4 text-copper" />Freehold</span></div></div><Button asChild size="lg" className="mt-8 justify-between"><Link to="/property/$slug" params={{ slug: featured.slug }}>See the full story<ArrowRight className="size-4" /></Link></Button></div>
          </div>
        </div>
      </section>

      <section id="insights" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><EmiCalculator /></section>
      <section className="border-y border-border bg-secondary"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.5fr] lg:px-8"><p className="text-xs font-bold uppercase tracking-widest text-copper">From the BariGhor journal</p><div><h2 className="font-display text-3xl md:text-5xl">Freehold, leasehold, or co-operative share?</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">In Bengal, the paperwork can shape your purchase as much as the floor plan. Our plain-language field guide is being prepared for launch.</p></div></div></section>
      <SiteFooter />
      <WhatsAppAction floating />
    </main>
  );
}
