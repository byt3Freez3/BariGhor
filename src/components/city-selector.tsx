import { useState, useCallback } from "react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { cities, City } from "@/lib/regions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CitySelector({ inverse }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const location = useLocation();
  const { selectedCity, setCity } = useAppStore();

  const currentCity = cities.find((c) => c.slug === selectedCity) || cities[0];
  const liveCities = cities.filter((c) => c.status === "live");
  const soonCities = cities.filter((c) => c.status === "coming_soon");

  const handlePrefetch = useCallback(
    (citySlug: string) => {
      try {
        router.preloadRoute({
          to: "/$citySlug",
          params: { citySlug },
        }).catch(() => {});
        router.preloadRoute({
          to: "/$citySlug/localities",
          params: { citySlug },
        }).catch(() => {});
        router.preloadRoute({
          to: "/$citySlug/properties",
          params: { citySlug },
        }).catch(() => {});
      } catch {}
    },
    [router]
  );

  const handleCitySelect = (newCity: City) => {
    setCity(newCity.slug);
    setOpen(false);

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
      <span>{currentCity.nameEn}</span>
      <ChevronDown className="ml-1.5 size-3.5 opacity-50" />
    </Button>
  );

  const Content = (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
          Live Now
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {liveCities.map((city) => (
            <button
              key={city.slug}
              type="button"
              onClick={() => handleCitySelect(city)}
              onMouseEnter={() => handlePrefetch(city.slug)}
              onFocus={() => handlePrefetch(city.slug)}
              className={`flex flex-col items-start rounded-md border p-3 text-left transition-colors ${
                selectedCity === city.slug
                  ? "border-accent bg-accent/10"
                  : "border-border hover:bg-secondary"
              }`}
            >
              <div className="flex items-baseline justify-between w-full">
                <span className="font-semibold text-foreground">{city.nameEn}</span>
                <span className="text-[11px] font-medium text-accent">{city.nameBn}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{city.district}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Coming Soon
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {soonCities.map((city) => (
            <div
              key={city.slug}
              className="group flex flex-col items-start rounded-md border border-border/50 bg-secondary/20 p-3 opacity-80"
              onMouseEnter={() => handlePrefetch(city.slug)}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <div>
                  <span className="font-medium text-muted-foreground">{city.nameEn}</span>
                  <span className="ml-1 text-[11px] text-muted-foreground/60">{city.nameBn}</span>
                  <span className="block text-[11px] text-muted-foreground/70">
                    {city.district}
                  </span>
                </div>
                <a
                  href={`https://wa.me/919073599355?text=Hi%20BariGhor%2C%20please%20notify%20me%20when%20you%20launch%20in%20${encodeURIComponent(city.nameEn)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-full bg-border/50 px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors hover:bg-accent hover:text-white"
                >
                  <Bell className="size-3" />
                  Notify
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{Trigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[90dvh] overflow-y-auto px-5 py-6">
          <div className="mb-6 border-b border-border pb-4 mt-4">
            <h3 className="font-display text-2xl font-bold">Select City</h3>
            <p className="text-sm text-muted-foreground">
              Choose your active region in West Bengal.
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
      <PopoverContent align="start" className="w-[420px] p-5">
        {Content}
      </PopoverContent>
    </Popover>
  );
}
