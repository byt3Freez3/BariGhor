import { useState, useCallback } from "react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { cities, tier3Districts, City } from "@/data/regions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, ChevronDown, Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CitySelector({ inverse }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const location = useLocation();
  const { selectedCity, setCity } = useAppStore();

  const currentCity = cities.find((c) => c.slug === selectedCity) || cities[0];
  const tier1Cities = cities.filter((c) => c.tier === 1);
  const tier2Cities = cities.filter((c) => c.tier === 2);

  const handlePrefetch = useCallback(
    (citySlug: string) => {
      try {
        router
          .preloadRoute({
            to: "/$citySlug",
            params: { citySlug },
          })
          .catch(() => {});
        router
          .preloadRoute({
            to: "/$citySlug/localities",
            params: { citySlug },
          })
          .catch(() => {});
        router
          .preloadRoute({
            to: "/$citySlug/properties",
            params: { citySlug },
          })
          .catch(() => {});
      } catch {}
    },
    [router]
  );

  const handleCitySelect = (newCity: City) => {
    setCity(newCity.slug);
    setOpen(false);

    if (newCity.status === "coming_soon") {
      router.navigate({
        to: "/$citySlug",
        params: { citySlug: newCity.slug },
      });
      return;
    }

    const currentPath = location.pathname;
    let targetTo = "/$citySlug";
    let targetParams: Record<string, string> = { citySlug: newCity.slug };
    let note = "";

    if (currentPath.includes("/localities")) {
      targetTo = "/$citySlug/localities";
      note = `Showing ${newCity.nameEn} neighbourhoods.`;
    } else if (currentPath.includes("/properties")) {
      targetTo = "/$citySlug/properties";
      note = `Showing ${newCity.nameEn} properties.`;
    } else if (currentPath.includes("/search")) {
      targetTo = "/$citySlug/search";
      note = `Showing ${newCity.nameEn} search results.`;
    } else if (
      currentPath === "/cities" ||
      currentPath.startsWith("/journal") ||
      currentPath.startsWith("/about")
    ) {
      toast.info(`Active city set to ${newCity.nameEn}`);
      return;
    } else {
      targetTo = "/$citySlug";
    }

    if (note) {
      toast.info(note);
    }

    const performNavigation = () => {
      router.navigate({
        to: targetTo as any,
        params: targetParams as any,
        search: note ? { note } : undefined,
      });
    };

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => {
        performNavigation();
      });
    } else {
      performNavigation();
    }
  };

  const renderCityCard = (city: City) => {
    const isSelected = selectedCity === city.slug;

    if (city.status === "coming_soon") {
      return (
        <div
          key={city.slug}
          className="group flex flex-col justify-between rounded-md border border-border/60 bg-secondary/30 p-3.5 transition-all"
          onMouseEnter={() => handlePrefetch(city.slug)}
        >
          <div>
            <div className="flex items-start justify-between gap-1">
              <span className="font-semibold text-foreground text-sm">{city.nameEn}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded-xs">
                Upcoming
              </span>
            </div>
            <span className="block text-xs text-accent font-medium mt-0.5">{city.nameBn}</span>
            <span className="block text-[11px] text-muted-foreground/80 mt-1">{city.district}</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
            <span className="text-[11px] text-muted-foreground">
              Avg ₹{city.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
            </span>
            <a
              href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20please%20notify%20me%20when%20you%20launch%20in%20${encodeURIComponent(city.nameEn)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-xs bg-border/60 px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors hover:bg-accent hover:text-white"
            >
              <Bell className="size-3" />
              Notify
            </a>
          </div>
        </div>
      );
    }

    return (
      <button
        key={city.slug}
        type="button"
        onClick={() => handleCitySelect(city)}
        onMouseEnter={() => handlePrefetch(city.slug)}
        onFocus={() => handlePrefetch(city.slug)}
        className={`flex flex-col justify-between rounded-md border p-3.5 text-left transition-all hover:scale-[1.01] ${
          isSelected
            ? "border-accent bg-accent/10 ring-1 ring-accent/30 shadow-xs"
            : "border-border bg-card hover:bg-secondary/60 hover:border-accent/40"
        }`}
      >
        <div>
          <div className="flex items-baseline justify-between">
            <span className="font-semibold text-foreground text-sm">{city.nameEn}</span>
            <span className="font-mono text-xs font-bold text-accent">
              ₹{city.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
            </span>
          </div>
          <span className="block text-xs text-accent/90 font-medium mt-0.5">{city.nameBn}</span>
          <span className="block text-[11px] text-muted-foreground mt-0.5">{city.district}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[11px]">
          <span className="text-muted-foreground truncate">{city.priceBand}</span>
          {isSelected && (
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
              Active
            </span>
          )}
        </div>
      </button>
    );
  };

  const Trigger = (
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full px-3 text-xs font-semibold ${
        inverse
          ? "border-hero-foreground/30 bg-black/20 text-hero-foreground hover:bg-black/40 hover:text-hero-foreground"
          : "bg-secondary text-primary hover:bg-secondary/80 border-border"
      }`}
    >
      <MapPin className="mr-1.5 size-3.5 text-accent" />
      <span className="font-bold">{currentCity.nameEn}</span>
      <span className="hidden sm:inline opacity-70 text-[11px] ml-1">
        (₹{currentCity.avgPricePerSqft.toLocaleString("en-IN")}/sq ft)
      </span>
      <ChevronDown className="ml-1.5 size-3.5 opacity-50" />
    </Button>
  );

  const Content = (
    <div className="flex flex-col gap-6">
      {/* Tier 1 Section */}
      <div>
        <div className="mb-3 flex items-center justify-between border-b border-border pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Tier 1 — Metropolitan Centers
            </h4>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">3 Cities</span>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {tier1Cities.map(renderCityCard)}
        </div>
      </div>

      {/* Tier 2 Section */}
      <div>
        <div className="mb-3 flex items-center justify-between border-b border-border pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Tier 2 — Urban Growth Corridors
            </h4>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">
            {tier2Cities.length} Cities
          </span>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[380px] overflow-y-auto pr-1">
          {tier2Cities.map(renderCityCard)}
        </div>
      </div>

      {/* Tier 3 Notice */}
      {tier3Districts.length === 0 && (
        <div className="rounded-md border border-dashed border-border/80 bg-secondary/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tier 3 Districts:</span> Title audits and ground surveys in progress across 12 remaining Bengal districts.
          </p>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{Trigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[92dvh] overflow-y-auto px-5 py-6">
          <div className="mb-6 border-b border-border pb-4 mt-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              <h3 className="font-display text-2xl font-bold">Select Active City</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Select any West Bengal city to view verified homes, neighbourhoods and ₹/sq ft price trends.
            </p>
          </div>
          {Content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-[680px] p-6 max-h-[85vh] overflow-y-auto">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="font-display text-lg font-bold">West Bengal Price Map & City Selector</h3>
            <p className="text-xs text-muted-foreground">
              Live ₹/sq ft intelligence across Tier 1 & Tier 2 districts.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs text-accent hover:text-accent font-semibold"
            onClick={() => setOpen(false)}
          >
            <a href="/cities">View Full Rollout →</a>
          </Button>
        </div>
        {Content}
      </PopoverContent>
    </Popover>
  );
}
