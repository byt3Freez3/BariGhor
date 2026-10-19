import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Heart, Scale, Share2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: "My Shortlisted Residences — BariGhor" },
      {
        name: "description",
        content:
          "Review your saved homes, compare specifications side by side, and send your shortlist directly to a BariGhor advisor on WhatsApp.",
      },
    ],
  }),
  component: ShortlistPage,
});

export default function ShortlistPage() {
  const { shortlist, selectedCity, language, toggleShortlist, clearShortlist } = useAppStore();

  const savedProperties = useMemo(() => {
    return properties.filter((p) => shortlist.includes(p.id));
  }, [shortlist]);

  // Construct WhatsApp prefilled message with full property links
  const whatsappUrl = useMemo(() => {
    if (savedProperties.length === 0) {
      return "https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20enquire%20about%20verified%20residences.";
    }
    const lines = [
      "Hi BariGhor, I have shortlisted the following verified residences on your site:",
      "",
      ...savedProperties.map(
        (p, idx) =>
          `${idx + 1}. *${p.title}* (${p.locality}, ${p.price})\n   Link: https://build-it-better-five.vercel.app/${p.citySlug || "kolkata"}/properties/${p.slug}\n   Ref: ${p.reraProjectNo || p.id}`,
      ),
      "",
      "Please arrange site visit appointments and share municipal sanction drawings.",
    ];
    return `https://wa.me/919073599355?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [savedProperties]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Header Banner */}
      <section className="border-b border-border bg-card/60 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {language === "en" ? "Private Collection" : "সংরক্ষিত তালিকা"}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
                {language === "en"
                  ? `Saved Residences (${savedProperties.length})`
                  : `সংরক্ষিত বাড়ি (${savedProperties.length})`}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {language === "en"
                  ? "Saved privately in your browser storage. Zero login or account creation required."
                  : "আপনার ডিভাইসে সংরক্ষিত। কোনো অ্যাকাউন্ট বা সাইন-ইনের প্রয়োজন নেই।"}
              </p>
            </div>

            {savedProperties.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearShortlist}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="mr-1.5 size-3.5" />
                  {language === "en" ? "Clear All" : "সব মুছুন"}
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xs bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
                >
                  <Share2 className="size-4" />
                  {language === "en"
                    ? "Send Shortlist on WhatsApp"
                    : "হোয়াটসঅ্যাপে শর্টলিস্ট পাঠান"}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shortlist Cards */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {savedProperties.length > 0 ? (
          <div className="space-y-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((property, index) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} index={index} />
                  <button
                    type="button"
                    onClick={() => toggleShortlist(property.id)}
                    className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-full bg-background/80 text-destructive backdrop-blur-md transition-colors hover:bg-destructive hover:text-white"
                    title="Remove from shortlist"
                    aria-label="Remove from shortlist"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* SIDE-BY-SIDE COMPARISON MATRIX (When 2 or more properties are shortlisted) */}
            {savedProperties.length >= 2 && (
              <div className="rounded-xs border border-border bg-card p-6 shadow-sm lg:p-8">
                <div className="flex items-center gap-2">
                  <Scale className="size-5 text-accent" />
                  <h2 className="font-display text-2xl font-bold">
                    {language === "en" ? "Side-by-Side Comparison Matrix" : "পাশাপাশি তুলনামূলক বিবরণ"}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Quick audit of specifications, pricing, and municipal approvals across your saved residences.
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="py-3 pr-4 font-semibold uppercase tracking-wider">Property</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Config</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Built-up</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Total Price</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Rate / sq ft</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Possession</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">Transit</th>
                        <th className="px-4 py-3 font-semibold uppercase tracking-wider">WBRERA No</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {savedProperties.map((p) => (
                        <tr key={p.id} className="hover:bg-accent/5">
                          <td className="py-3.5 pr-4 font-semibold text-foreground">
                            <Link
                              to="/$citySlug/properties/$propertySlug"
                              params={{
                                citySlug: p.citySlug || (p.localitySlug === "new-town" ? "new-town" : "kolkata"),
                                propertySlug: p.slug,
                              }}
                              className="hover:text-accent hover:underline"
                            >
                              {p.title}
                            </Link>
                            <p className="text-[11px] text-muted-foreground font-normal">{p.locality}</p>
                          </td>
                          <td className="px-4 py-3.5 font-medium">{p.bhk}</td>
                          <td className="px-4 py-3.5 font-mono">{p.sqft.toLocaleString("en-IN")} sq ft</td>
                          <td className="px-4 py-3.5 font-bold text-primary">{p.price}</td>
                          <td className="px-4 py-3.5 font-mono">₹{p.pricePerSqFt?.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3.5 text-muted-foreground">{p.possessionDate}</td>
                          <td className="px-4 py-3.5 text-muted-foreground truncate max-w-[140px]">{p.metro}</td>
                          <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">{p.reraProjectNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-muted-foreground">
              <Heart className="size-8" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">Your shortlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart icon on any residence to save it here for comparison and direct WhatsApp consultation.
            </p>
            <Button asChild className="mt-8 font-semibold">
              <Link to="/$citySlug/properties" params={{ citySlug: selectedCity }}>
                <ArrowLeft className="mr-2 size-4" /> Explore Curated Homes
              </Link>
            </Button>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="general" />
    </main>
  );
}
