import * as React from "react";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building,
  Clock,
  Compass,
  FileText,
  Heart,
  History,
  Home,
  Layers,
  MapPin,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
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
import { useAppStore } from "@/lib/store";
import {
  executeFuzzySearch,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  POPULAR_LOCALITIES,
  type RankedSearchResult,
  type RecentSearchEntry,
} from "@/lib/search";
import { logSearchQuery } from "@/lib/enquiries";

/**
 * Bold matched characters in search results (safe index slicing, zero regex)
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim() || !text) {
    return <span>{text}</span>;
  }

  const q = query.trim().toLowerCase();
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);

  if (idx !== -1) {
    // Exact contiguous match
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);

    return (
      <span>
        {before}
        <strong className="font-bold text-accent underline decoration-accent/60 underline-offset-2">
          {match}
        </strong>
        {after}
      </span>
    );
  }

  // Non-contiguous fuzzy match: highlight matching characters
  const qSet = new Set(q.split(""));
  const elements: React.ReactNode[] = [];
  let buffer = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (qSet.has(char.toLowerCase())) {
      if (buffer) {
        elements.push(<span key={`buf-${i}`}>{buffer}</span>);
        buffer = "";
      }
      elements.push(
        <strong
          key={`match-${i}`}
          className="font-bold text-accent underline decoration-accent/60 underline-offset-2"
        >
          {char}
        </strong>
      );
    } else {
      buffer += char;
    }
  }
  if (buffer) {
    elements.push(<span key="buf-end">{buffer}</span>);
  }

  return <span>{elements}</span>;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { selectedCity, language } = useAppStore();
  const isBn = language === "bn";

  const [rawQuery, setRawQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<RecentSearchEntry[]>([]);

  // 1. Keyboard shortcut listener (⌘K / Ctrl+K)
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

  // 2. Load recent searches on palette open
  React.useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches());
    } else {
      setRawQuery("");
      setDebouncedQuery("");
    }
  }, [open]);

  // 3. 150ms debounce on search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(rawQuery);
    }, 150);

    return () => clearTimeout(timer);
  }, [rawQuery]);

  // 4. Execute Fuse.js fuzzy search with personalized history blending
  const { results, grouped, totalCount } = React.useMemo(() => {
    return executeFuzzySearch(debouncedQuery);
  }, [debouncedQuery]);

  // 5. Log search query anonymously to /api/enquiries (no PII, no IP)
  React.useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= 2) {
      const timer = setTimeout(() => {
        logSearchQuery(trimmed, totalCount);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery, totalCount]);

  const handleSelect = (link: string, resultId?: string) => {
    if (debouncedQuery.trim()) {
      saveRecentSearch(debouncedQuery.trim(), resultId);
    }
    onOpenChange(false);
    router.navigate({ href: link });
  };

  const handleRecentClick = (term: string) => {
    setRawQuery(term);
    setDebouncedQuery(term);
  };

  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };

  const hasQuery = debouncedQuery.trim().length > 0;
  const noMatches = hasQuery && totalCount === 0;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false}>
      <CommandInput
        value={rawQuery}
        onValueChange={setRawQuery}
        placeholder={
          isBn
            ? "শহর, পাড়া, বাড়ি, বা সেবা খুঁজুন (যেমন: 'নিউ টাউন', 'কিচেন')..."
            : "Search localities, properties, services (e.g. 'New Town', 'kitchen')..."
        }
      />

      <CommandList className="max-h-[75vh] overflow-y-auto p-2">
        {/* EMPTY INPUT STATE: RECENT SEARCHES + POPULAR LOCALITIES */}
        {!hasQuery && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                    <span className="flex items-center gap-1.5">
                      <History className="size-3 text-accent" />
                      <span>{isBn ? "সাম্প্রতিক অনুসন্ধান" : "Recent Searches"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-[10px] text-muted-foreground hover:text-destructive transition-colors font-normal cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="size-2.5" />
                      <span>{isBn ? "মুছুন" : "Clear"}</span>
                    </button>
                  </div>
                }
              >
                {recentSearches.map((rs, idx) => (
                  <CommandItem
                    key={`recent-${idx}`}
                    value={`recent-${rs.term}`}
                    onSelect={() => handleRecentClick(rs.term)}
                    className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs font-medium"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>{rs.term}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      searched recently
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {recentSearches.length > 0 && <CommandSeparator className="my-2" />}

            {/* Popular Localities Fallback */}
            <CommandGroup
              heading={
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                  <MapPin className="size-3 text-accent" />
                  <span>{isBn ? "জনপ্রিয় এলাকা ও পাড়া" : "Popular Localities"}</span>
                </div>
              }
            >
              {POPULAR_LOCALITIES.map((loc, idx) => (
                <CommandItem
                  key={`pop-${idx}`}
                  value={`popular-locality-${loc.name}`}
                  onSelect={() => handleSelect(loc.link, `pop-${loc.name}`)}
                  className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="size-3.5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">{loc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{loc.city}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-accent font-semibold">
                    {loc.avgPrice}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="my-2" />

            {/* Quick Collections */}
            <CommandGroup heading="Browse Capabilities">
              <CommandItem
                value="action-services-interiors"
                onSelect={() => handleSelect("/services/interiors", "service-interiors")}
                className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Paintbrush className="size-3.5 text-accent" />
                  <div>
                    <span className="font-medium text-foreground">Turnkey Interior Design</span>
                    <p className="text-[11px] text-muted-foreground">Marine ply, modular kitchens & lighting</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">From ₹1,250/sq ft</span>
              </CommandItem>

              <CommandItem
                value="action-services-construction"
                onSelect={() => handleSelect("/services/construction", "service-construction")}
                className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Building className="size-3.5 text-accent" />
                  <div>
                    <span className="font-medium text-foreground">Turnkey Plot Construction</span>
                    <p className="text-[11px] text-muted-foreground">Deep piles, seismic frame & sanctions</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">From ₹1,950/sq ft</span>
              </CommandItem>

              <CommandItem
                value="action-shortlist"
                onSelect={() => handleSelect("/shortlist", "quick-shortlist")}
                className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="size-3.5 text-rose-500" />
                  <span className="font-medium text-foreground">View My Saved Shortlist</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Zero login required</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {/* ACTIVE SEARCH: GROUPED RESULTS */}
        {hasQuery && !noMatches && (
          <>
            {/* GROUP 1: LOCALITIES */}
            {grouped.locality.length > 0 && (
              <CommandGroup
                heading={
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                    Neighbourhoods & Localities ({grouped.locality.length})
                  </span>
                }
              >
                {grouped.locality.map((res) => (
                  <CommandItem
                    key={res.item.id}
                    value={`${res.item.id}-${res.item.title}`}
                    onSelect={() => handleSelect(res.item.link, res.item.id)}
                    className="flex items-center justify-between cursor-pointer py-3 px-3 rounded-xs text-xs hover:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid size-7 place-items-center rounded-xs bg-primary/10 text-primary shrink-0">
                        <MapPin className="size-3.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          <HighlightedText text={res.item.title} query={debouncedQuery} />
                          {res.item.bengaliTitle && (
                            <span className="ml-1.5 text-xs text-muted-foreground font-normal" lang="bn">
                              ({res.item.bengaliTitle})
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {res.item.city} · {res.item.description}
                        </p>
                      </div>
                    </div>
                    {res.item.badge && (
                      <span className="ml-2 font-mono text-[11px] text-accent font-semibold shrink-0">
                        {res.item.badge}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* GROUP 2: PROPERTIES */}
            {grouped.property.length > 0 && (
              <CommandGroup
                heading={
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                    Handpicked Residences ({grouped.property.length})
                  </span>
                }
              >
                {grouped.property.map((res) => (
                  <CommandItem
                    key={res.item.id}
                    value={`${res.item.id}-${res.item.title}`}
                    onSelect={() => handleSelect(res.item.link, res.item.id)}
                    className="flex items-center justify-between cursor-pointer py-3 px-3 rounded-xs text-xs hover:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid size-7 place-items-center rounded-xs bg-primary/10 text-primary shrink-0">
                        <Home className="size-3.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          <HighlightedText text={res.item.title} query={debouncedQuery} />
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {res.item.locality} · {res.item.description}
                        </p>
                      </div>
                    </div>
                    {res.item.badge && (
                      <span className="ml-2 font-display text-xs font-bold text-primary shrink-0">
                        {res.item.badge}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* GROUP 3: SERVICES */}
            {grouped.service.length > 0 && (
              <CommandGroup
                heading={
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                    Architectural & Turnkey Services ({grouped.service.length})
                  </span>
                }
              >
                {grouped.service.map((res) => (
                  <CommandItem
                    key={res.item.id}
                    value={`${res.item.id}-${res.item.title}`}
                    onSelect={() => handleSelect(res.item.link, res.item.id)}
                    className="flex items-center justify-between cursor-pointer py-3 px-3 rounded-xs text-xs hover:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid size-7 place-items-center rounded-xs bg-primary/10 text-primary shrink-0">
                        <Sparkles className="size-3.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          <HighlightedText text={res.item.title} query={debouncedQuery} />
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {res.item.description}
                        </p>
                      </div>
                    </div>
                    {res.item.badge && (
                      <span className="ml-2 font-mono text-[11px] text-accent font-semibold shrink-0">
                        {res.item.badge}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* GROUP 4: JOURNAL */}
            {grouped.journal.length > 0 && (
              <CommandGroup
                heading={
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-1">
                    Market Journal & Field Guides ({grouped.journal.length})
                  </span>
                }
              >
                {grouped.journal.map((res) => (
                  <CommandItem
                    key={res.item.id}
                    value={`${res.item.id}-${res.item.title}`}
                    onSelect={() => handleSelect(res.item.link, res.item.id)}
                    className="flex items-center justify-between cursor-pointer py-3 px-3 rounded-xs text-xs hover:bg-accent/10 focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid size-7 place-items-center rounded-xs bg-primary/10 text-primary shrink-0">
                        <BookOpen className="size-3.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          <HighlightedText text={res.item.title} query={debouncedQuery} />
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {res.item.description}
                        </p>
                      </div>
                    </div>
                    {res.item.badge && (
                      <span className="ml-2 font-mono text-[10px] text-muted-foreground shrink-0">
                        {res.item.badge}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}

        {/* NEVER A BLANK EMPTY STATE: FALL BACK TO POPULAR LOCALITIES */}
        {noMatches && (
          <div className="p-4 space-y-4">
            <div className="rounded-xs border border-accent/20 bg-accent/5 p-4 text-center">
              <p className="font-display text-sm font-bold text-foreground">
                No direct matches for "{debouncedQuery}"
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Our inventory is curated by our single-admin team. Here are verified popular localities and recommendations:
              </p>
            </div>

            <CommandGroup heading="Popular Verified Localities">
              {POPULAR_LOCALITIES.map((loc, idx) => (
                <CommandItem
                  key={`fallback-${idx}`}
                  value={`fallback-loc-${loc.name}`}
                  onSelect={() => handleSelect(loc.link, `fallback-${loc.name}`)}
                  className="flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xs text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="size-3.5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">{loc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{loc.city}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-accent font-semibold">
                    {loc.avgPrice}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </CommandList>
    </CommandDialog>
  );
}
