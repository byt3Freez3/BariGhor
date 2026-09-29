import * as React from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

const LOCALITIES = [
  { slug: "new-town", name: "New Town, Rajarhat", region: "Kolkata Metro", count: 14 },
  { slug: "salt-lake", name: "Salt Lake / Bidhannagar", region: "Kolkata Metro", count: 8 },
  { slug: "alipore", name: "Alipore", region: "Kolkata Metro", count: 5 },
  { slug: "ballygunge", name: "Ballygunge", region: "Kolkata Metro", count: 12 },
  { slug: "garia", name: "Garia", region: "South Kolkata", count: 7 },
  { slug: "behala", name: "Behala", region: "South West Kolkata", count: 9 },
  { slug: "howrah", name: "Howrah", region: "Howrah District", count: 11 },
  { slug: "siliguri", name: "Siliguri", region: "Darjeeling District", count: 3 },
];

export function LocalitySearch({ inverse = false }: { inverse?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.navigate({ to: `/localities/$slug`, params: { slug } });
  };

  return (
    <>
      <Button
        variant={inverse ? "ghost" : "outline"}
        size="sm"
        className={`hidden md:flex relative h-8 w-full justify-start rounded-[2rem] bg-background/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64 ${
          inverse ? "border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        <span className="hidden lg:inline-flex">Search localities in WB...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`md:hidden ${inverse ? "text-hero-foreground" : ""}`}
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
        <span className="sr-only">Search</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search localities in WB..." />
        <CommandList>
          <CommandEmpty>
            <div className="p-6 text-center text-sm">
              <p>No properties found in this locality yet.</p>
              <p className="mt-1 text-muted-foreground">Request alerts on WhatsApp.</p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Suggestions">
            {LOCALITIES.map((loc) => (
              <CommandItem
                key={loc.slug}
                value={loc.name}
                onSelect={() => handleSelect(loc.slug)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{loc.name}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline-block">- {loc.region}</span>
                </div>
                <div className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {loc.count} properties
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
