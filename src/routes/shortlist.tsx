import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart, Share2, Trash2 } from "lucide-react";
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
          "Review your saved homes and send your shortlist directly to a BariGhor advisor on WhatsApp.",
      },
    ],
  }),
  component: ShortlistPage,
});

export default function ShortlistPage() {
  const { shortlist, selectedCity, language, toggleShortlist } = useAppStore();

  const savedProperties = useMemo(() => {
    return properties.filter((p) => shortlist.includes(p.id));
  }, [shortlist]);

  // Construct WhatsApp prefilled message
  const whatsappUrl = useMemo(() => {
    if (savedProperties.length === 0) {
      return "https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20would%20like%20to%20enquire%20about%20verified%20residences.";
    }
    const lines = [
      "Hi BariGhor, I have shortlisted the following verified residences on your site:",
      "",
      ...savedProperties.map(
        (p, idx) =>
          `${idx + 1}. *${p.title}* (${p.locality}, ${p.price}) — Ref: ${p.reraProjectNo || p.slug}`,
      ),
      "",
      "Please arrange site visit appointments and share sanction drawings.",
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
                  ? "Saved locally in your browser. No sign-in or account registration required."
                  : "আপনার ডিভাইসে সংরক্ষিত। কোনো সাইন-ইন বা পাসওয়ার্ডের প্রয়োজন নেই।"}
              </p>
            </div>

            {savedProperties.length > 0 && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                <Share2 className="size-4" />
                {language === "en"
                  ? "Send Shortlist on WhatsApp"
                  : "হোয়াটসঅ্যাপে শর্টলিস্ট পাঠান"}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Shortlist Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {savedProperties.length > 0 ? (
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
