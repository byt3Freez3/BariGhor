import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Check, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppStore } from "@/lib/store";
import { cities } from "@/lib/regions";

export function HeroSearch({
  onExplore,
  onSearchAction,
}: {
  onExplore?: () => void;
  onSearchAction?: () => void;
}) {
  const router = useRouter();
  const { locality, budget, bhk, setLocality, setBudget, setBhk, language, selectedCity, setCity } = useAppStore();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setBottomSheetOpen(false);
    const callback = onSearchAction || onExplore;
    if (callback) {
      callback();
    } else {
      router.navigate({
        to: "/$citySlug/search",
        params: { citySlug: selectedCity },
        search: {
          locality: locality !== "all" ? locality : undefined,
          budget: budget !== "all" ? budget : undefined,
          bhk: bhk !== "all" ? bhk : undefined,
        },
      });
    }
  };

  const cityOptions = cities.filter(c => c.status === "live").map(c => ({
    value: c.slug,
    label: language === "en" ? c.nameEn : c.nameBn,
  }));

  const currentCityObj = cities.find(c => c.slug === selectedCity);
  const localitiesOptions = [
    { value: "all", label: language === "en" ? "All Neighbourhoods" : "সব এলাকা" },
    ...(currentCityObj?.localities.map(l => ({ value: l.slug, label: l.name })) || [])
  ];

  const budgetOptions = [
    { value: "all", label: language === "en" ? "Any Price Band" : "যে কোন বাজেট" },
    { value: "under-1cr", label: "Under ₹1.0 Cr" },
    { value: "1cr-2cr", label: "₹1.0 – 2.0 Cr" },
    { value: "2cr-4cr", label: "₹2.0 – 4.0 Cr" },
    { value: "4cr-plus", label: "₹4.0 Cr & Above" },
  ];

  const bhkOptions = [
    { value: "all", label: language === "en" ? "All Layouts" : "সব মাপের" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK / Villa" },
  ];

  return (
    <>
      {/* MOBILE TRIGGER: Opens Bottom-Sheet (Hidden on Desktop) */}
      <div className="mt-8 block md:hidden">
        <Sheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="glass-panel flex w-full items-center justify-between rounded-xs border border-hero-foreground/30 bg-background/90 p-4 text-left shadow-lg backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xs bg-primary text-primary-foreground">
                  <SlidersHorizontal className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    Filter Handpicked Homes
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {locality === "all" ? "Kolkata" : locality} ·{" "}
                    {budget === "all" ? "Any Budget" : budget} · {bhk === "all" ? "Any BHK" : bhk}
                  </p>
                </div>
              </div>
              <div className="rounded-xs bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                Filter
              </div>
            </button>
          </SheetTrigger>

          {/* Bottom Sheet Drawer for Mobile */}
          <SheetContent
            side="bottom"
            className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 text-foreground shadow-2xl"
          >
            <SheetHeader className="text-left pb-4 border-b border-border">
              <SheetTitle className="font-display text-2xl font-bold">
                {language === "en" ? "Refine Kolkata Search" : "বাড়ি ফিল্টার করুন"}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Select your preferred neighbourhood, budget, and BHK configuration.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* City Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  01 / City
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {cityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setCity(opt.value); setLocality("all"); }}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        selectedCity === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {selectedCity === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locality Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  02 / Locality
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {localitiesOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLocality(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        locality === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {locality === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  03 / Budget
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBudget(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        budget === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {budget === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* BHK Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-accent">
                  04 / Home Layout
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {bhkOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBhk(opt.value)}
                      className={`flex items-center justify-between rounded-xs border px-3 py-2.5 text-xs font-semibold transition-all ${
                        bhk === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {bhk === opt.value && <Check className="size-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Bottom Thumb Zone Action */}
            <div className="sticky bottom-0 mt-8 border-t border-border bg-background pt-4 pb-2">
              <Button
                type="button"
                size="lg"
                onClick={() => handleSubmit()}
                className="w-full bg-primary font-semibold text-primary-foreground hover:bg-accent"
              >
                <Search className="mr-2 size-4" />
                {language === "en" ? "Show Curated Homes" : "বাছাই করা বাড়ি দেখুন"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SEARCH BAR (Hidden on Mobile) */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel mt-9 hidden max-w-[1200px] gap-px overflow-hidden rounded-xs border border-hero-foreground/25 md:grid md:grid-cols-[1.1fr_1.3fr_1.1fr_0.9fr_auto]"
        aria-label="Filter homes"
      >
        <label className="bg-background/85 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "01 / City" : "০১ / শহর"}
          </span>
          <select
            value={selectedCity}
            onChange={(e) => { setCity(e.target.value); setLocality("all"); }}
            className="mt-1 block w-full cursor-pointer bg-transparent text-base font-semibold text-foreground outline-none"
          >
            {cityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        <label className="bg-background/85 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "02 / Locality" : "০২ / এলাকা"}
          </span>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-base font-semibold text-foreground outline-none"
          >
            {localitiesOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        <label className="bg-background/85 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "03 / Budget" : "০৩ / বাজেট"}
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-base font-semibold text-foreground outline-none"
          >
            <option value="all">{language === "en" ? "Any Price Band" : "যে কোন বাজেট"}</option>
            <option value="under-1cr">Under ₹1 Cr</option>
            <option value="1cr-2cr">₹1.0 – 2.0 Cr</option>
            <option value="2cr-4cr">₹2.0 – 4.0 Cr</option>
            <option value="4cr-plus">₹4.0 Cr & Above</option>
          </select>
        </label>

        <label className="bg-background/85 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-background">
          <span className="block text-[11px] font-bold text-accent">
            {language === "en" ? "04 / Configuration" : "০৪ / বিএইচকে"}
          </span>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="mt-1 block w-full cursor-pointer bg-transparent text-base font-semibold text-foreground outline-none"
          >
            <option value="all">{language === "en" ? "All Layouts" : "সব মাপের"}</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK / Penthouse</option>
          </select>
        </label>

        <Button
          type="submit"
          size="lg"
          className="h-full min-h-[58px] rounded-none bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-accent"
        >
          <Search className="mr-2 size-4" />
          {language === "en" ? "Explore curated homes" : "বাছাই করা বাড়ি দেখুন"}
        </Button>
      </form>
    </>
  );
}
