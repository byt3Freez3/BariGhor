import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, BedDouble, Building2, Check, Droplets, Expand, MapPin, Ruler, ShieldCheck, TrainFront } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmiCalculator } from "@/components/emi-calculator";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { featured, imagery } from "@/lib/properties";

export const Route = createFileRoute("/property/$slug")({
  head: () => ({
    meta: [
      { title: "The Verandah Residences, New Town — BariGhor" },
      { name: "description", content: "Explore a verified 3 BHK residence in New Town with WBHIRA, approval, connectivity, and price details." },
      { property: "og:title", content: "The Verandah Residences, New Town — BariGhor" },
      { property: "og:description", content: "A considered 3 BHK address in Action Area II, New Town." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertyPage,
});

function PropertyPage() {
  const [language, setLanguage] = useState<"en" | "bn">("en");
  return (
    <main className="min-h-screen bg-background">
      <div className="relative h-20"><SiteHeader language={language} onLanguage={() => setLanguage((value) => value === "en" ? "bn" : "en")} /></div>
      <div className="mx-auto max-w-7xl px-5 pt-7 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="-ml-3"><Link to="/"><ArrowLeft className="size-4" />Back to Kolkata homes</Link></Button>
        <div className="mt-6 grid gap-2 md:grid-cols-[1.7fr_0.85fr] md:grid-rows-2">
          <img src={imagery.heroImage} alt="The Verandah Residences exterior" width={1920} height={1280} className="h-full min-h-[340px] w-full object-cover md:row-span-2 md:min-h-[560px]" />
          <img src={imagery.aliporeImage} alt="Verandah-inspired living space" width={1408} height={1056} loading="lazy" className="hidden size-full object-cover md:block" />
          <div className="relative hidden overflow-hidden md:block"><img src={imagery.newTownImage} alt="New Town neighbourhood landscape" width={1408} height={1056} loading="lazy" className="size-full object-cover" /><Button variant="light" size="sm" className="absolute bottom-4 right-4"><Expand className="size-4" />View gallery</Button></div>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1.45fr_0.7fr] lg:px-8 lg:py-16">
        <div>
          <div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-1.5 bg-sage px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sage-foreground"><BadgeCheck className="size-4" />WBHIRA verified</span><span className="text-xs text-muted-foreground">Sample listing · Ref BG-NT-021</span></div>
          <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">{language === "en" ? featured.title : "দ্য ভেরান্দা রেসিডেন্সেস"}</h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-copper" />{featured.location}, Kolkata</p>
          <div className="mt-8 grid grid-cols-2 border-y border-border sm:grid-cols-4">
            {[[BedDouble, "3 BHK", "Configuration"], [Ruler, "1,840", "sq ft built-up"], [Building2, "18 of 24", "Floor"], [ShieldCheck, "Dec 2027", "Possession"]].map(([Icon, value, label]) => <div key={String(label)} className="border-border p-4 first:pl-0 sm:border-r last:border-r-0"><Icon className="mb-3 size-5 text-copper" /><p className="font-display text-2xl">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}
          </div>
          <div className="mt-12"><p className="text-xs font-bold uppercase tracking-widest text-copper">The home</p><h2 className="mt-3 font-display text-4xl">Light, air, and a verandah that earns its name.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">A considered three-bedroom residence with two-sided ventilation, a deep shaded balcony, and views toward New Town’s open green corridor. The plan separates the social and private rooms without wasting space on long passages.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[[Building2, "Tenure", featured.tenure], [ShieldCheck, "Approval authority", featured.approval], [TrainFront, "Nearest metro", featured.metro], [Droplets, "Flood-zone assessment", featured.floodRisk]].map(([Icon, label, value]) => <div key={String(label)} className="border border-border bg-card p-5"><Icon className="size-5 text-copper" /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 font-semibold">{value}</p></div>)}
          </div>
          <div className="mt-12"><h2 className="font-display text-4xl">Everyday comforts</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">{["Central garden", "Residents’ lounge", "24-hour security", "EV charging", "Pool & fitness studio", "Power backup"].map((amenity) => <span key={amenity} className="flex items-center gap-2 border-b border-border py-3 text-sm"><Check className="size-4 text-copper" />{amenity}</span>)}</div></div>
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="border border-border bg-card p-6 editorial-shadow md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-copper">Indicative price</p><p className="mt-2 font-display text-4xl text-primary">₹1.42 Cr</p><p className="mt-1 text-sm text-muted-foreground">₹7,717 per sq ft · excluding registration</p>
            <div className="my-6 border-y border-border py-5 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">WBHIRA</span><span className="font-medium">{featured.wbhira}</span></div><div className="mt-3 flex justify-between"><span className="text-muted-foreground">Developer</span><span className="font-medium">{featured.developer}</span></div></div>
            <WhatsAppAction title={`${featured.title} in ${featured.location}, Ref BG-NT-021`} />
            <Button variant="secondary" className="mt-3 w-full">Request a call back</Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">Usually responds in about 12 minutes</p>
          </div>
        </aside>
      </section>

      <section className="bg-secondary"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-widest text-copper">Monthly affordability</p><h2 className="mt-3 font-display text-4xl">Estimate your EMI</h2></div><EmiCalculator compact /></div></section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid overflow-hidden border border-border lg:grid-cols-2"><img src={imagery.newTownImage} alt="New Town landscaped neighbourhood" width={1408} height={1056} loading="lazy" className="h-full min-h-[360px] w-full object-cover" /><div className="bg-primary p-8 text-primary-foreground md:p-12"><p className="text-xs font-bold uppercase tracking-widest text-accent">Living in New Town</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Planned, green, and growing into itself.</h2><p className="mt-5 text-sm leading-7 text-primary-foreground/72">Action Area II balances quick airport access with Eco Park, schools, hospitals, and a growing metro connection. This pocket sits away from the busiest commercial spine.</p><div className="mt-8 grid grid-cols-2 gap-5 border-t border-primary-foreground/20 pt-6"><div><p className="font-display text-2xl">18 min</p><p className="text-xs text-primary-foreground/60">to the airport</p></div><div><p className="font-display text-2xl">8.6 / 10</p><p className="text-xs text-primary-foreground/60">connectivity score</p></div></div></div></div></section>
      <SiteFooter />
      <WhatsAppAction title={`${featured.title} in ${featured.location}`} floating />
    </main>
  );
}
