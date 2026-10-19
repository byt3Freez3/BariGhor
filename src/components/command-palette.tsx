import * as React from "react";
import { useRouter } from "@tanstack/react-router";
import {
  Building2,
  Compass,
  FileText,
  Heart,
  Home,
  Layers,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cities } from "@/lib/regions";
import { properties } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { selectedCity, setCity, language } = useAppStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (callback: () => void) => {
    onOpenChange(false);
    callback();
  };

  const allLocalities = React.useMemo(() => {
    return cities.flatMap((c) =>
      c.localities.map((l) => ({
        citySlug: c.slug,
        cityName: c.nameEn,
        slug: l.slug,
        name: l.name,
        bengali: l.bengali,
        avgPrice: l.avgPriceSqFt,
      })),
    );
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={
          language === "en"
            ? "Search cities, neighbourhoods, properties, budgets (or press Esc)..."
            : "শহর, পাড়া, বাড়ি, বাজেট খুঁজুন..."
        }
      />
      <CommandList className="max-h-[75vh]">
        <CommandEmpty>
          <div className="py-8 text-center text-sm">
            <p className="font-semibold text-foreground">No matches found.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try searching by city name, locality, BHK, or price.
            </p>
          </div>
        </CommandEmpty>

        {/* Quick Navigation / Collections */}
        <CommandGroup heading="Browse Collections">
          <CommandItem
            value="browse all properties handpicked homes"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                }),
              )
            }
          >
            <Home className="mr-2 size-4 text-accent" />
            <span className="font-medium">All Curated Residences</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {properties.length} homes in West Bengal
            </span>
          </CommandItem>

          <CommandItem
            value="shortlist saved homes favourites"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/shortlist",
                }),
              )
            }
          >
            <Heart className="mr-2 size-4 text-accent" />
            <span className="font-medium">My Shortlist</span>
            <span className="ml-auto text-xs text-muted-foreground">Saved homes</span>
          </CommandItem>

          <CommandItem
            value="market journal legal guide wbrera articles"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/journal",
                }),
              )
            }
          >
            <FileText className="mr-2 size-4 text-accent" />
            <span className="font-medium">Market Journal & Field Guides</span>
          </CommandItem>

          <CommandItem
            value="west bengal cities rollout price map"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/cities",
                }),
              )
            }
          >
            <Compass className="mr-2 size-4 text-accent" />
            <span className="font-medium">West Bengal Cities & Price Map</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* West Bengal Cities */}
        <CommandGroup heading="West Bengal Cities">
          {cities.map((c) => (
            <CommandItem
              key={c.slug}
              value={`${c.nameEn} ${c.nameBn} ${c.district} Tier ${c.tier}`}
              onSelect={() =>
                handleSelect(() => {
                  setCity(c.slug);
                  router.navigate({
                    to: "/$citySlug",
                    params: { citySlug: c.slug },
                  });
                })
              }
            >
              <Building2 className="mr-2 size-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">
                  {c.nameEn}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    ({c.nameBn})
                  </span>
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {c.district} · Tier {c.tier}
                </span>
              </div>
              <span className="ml-auto text-xs font-mono text-accent">
                ₹{c.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Popular Localities */}
        <CommandGroup heading="Neighbourhood Dossiers">
          {allLocalities.map((loc) => (
            <CommandItem
              key={`${loc.citySlug}-${loc.slug}`}
              value={`${loc.name} ${loc.bengali} ${loc.cityName}`}
              onSelect={() =>
                handleSelect(() => {
                  setCity(loc.citySlug);
                  router.navigate({
                    to: "/$citySlug/localities/$localitySlug",
                    params: { citySlug: loc.citySlug, localitySlug: loc.slug },
                  });
                })
              }
            >
              <MapPin className="mr-2 size-4 text-muted-foreground" />
              <span>
                {loc.name}{" "}
                <span className="text-xs text-muted-foreground">
                  ({loc.bengali}) · {loc.cityName}
                </span>
              </span>
              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                {loc.avgPrice}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Curated Properties */}
        <CommandGroup heading="Verified Residences">
          {properties.slice(0, 8).map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.title} ${p.bengaliTitle} ${p.locality} ${p.bhk} ${p.price}`}
              onSelect={() =>
                handleSelect(() => {
                  const citySlug =
                    p.citySlug || (p.localitySlug === "new-town" ? "new-town" : "kolkata");
                  setCity(citySlug);
                  router.navigate({
                    to: "/$citySlug/properties/$propertySlug",
                    params: { citySlug, propertySlug: p.slug },
                  });
                })
              }
            >
              <Sparkles className="mr-2 size-4 text-accent" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{p.title}</span>
                <span className="text-[11px] text-muted-foreground">
                  {p.locality} · {p.bhk} · {p.propertyType || "Apartment"}
                </span>
              </div>
              <span className="ml-auto text-xs font-semibold text-accent">{p.price}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Browse by Budget */}
        <CommandGroup heading="Browse by Budget Band">
          <CommandItem
            value="under 25 lakh low income affordable"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                  search: { budget: "under-25l" },
                }),
              )
            }
          >
            <Layers className="mr-2 size-4 text-muted-foreground" />
            <span>Under ₹25 Lakhs</span>
            <span className="ml-auto text-xs text-muted-foreground">Affordable builds</span>
          </CommandItem>
          <CommandItem
            value="25 to 50 lakh mid tier"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                  search: { budget: "25l-50l" },
                }),
              )
            }
          >
            <Layers className="mr-2 size-4 text-muted-foreground" />
            <span>₹25 – 50 Lakhs</span>
            <span className="ml-auto text-xs text-muted-foreground">Suburban & Tier 2</span>
          </CommandItem>
          <CommandItem
            value="50 lakh to 1 crore"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                  search: { budget: "50l-1cr" },
                }),
              )
            }
          >
            <Layers className="mr-2 size-4 text-muted-foreground" />
            <span>₹50 Lakhs – ₹1.0 Cr</span>
            <span className="ml-auto text-xs text-muted-foreground">Urban planned</span>
          </CommandItem>
          <CommandItem
            value="1 crore to 3 crore luxury"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                  search: { budget: "1cr-3cr" },
                }),
              )
            }
          >
            <Layers className="mr-2 size-4 text-muted-foreground" />
            <span>₹1.0 – 3.0 Cr</span>
            <span className="ml-auto text-xs text-muted-foreground">Premium residences</span>
          </CommandItem>
          <CommandItem
            value="3 crore plus ultra luxury heritage"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/$citySlug/properties",
                  params: { citySlug: selectedCity },
                  search: { budget: "3cr-plus" },
                }),
              )
            }
          >
            <Layers className="mr-2 size-4 text-muted-foreground" />
            <span>₹3.0 Cr & Above</span>
            <span className="ml-auto text-xs text-muted-foreground">Trophy estates</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* About & Trust */}
        <CommandGroup heading="About & Trust">
          <CommandItem
            value="our story about barighor boutique ethos"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/about",
                  hash: "story",
                }),
              )
            }
          >
            <ShieldCheck className="mr-2 size-4 text-muted-foreground" />
            <span>Our Story & Advisory Model</span>
          </CommandItem>
          <CommandItem
            value="wbrera agent licence regulatory check"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/about",
                  hash: "licence",
                }),
              )
            }
          >
            <ShieldCheck className="mr-2 size-4 text-muted-foreground" />
            <span>WBRERA Agent Licence: WBRERA/A/KOL/2023/000184</span>
          </CommandItem>
          <CommandItem
            value="verification physical audit title check standard"
            onSelect={() =>
              handleSelect(() =>
                router.navigate({
                  to: "/about",
                  hash: "verification",
                }),
              )
            }
          >
            <ShieldCheck className="mr-2 size-4 text-accent" />
            <span>4-Pillar Physical Verification Standard</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
