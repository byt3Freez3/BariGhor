import Fuse, { type IFuseOptions } from "fuse.js";
import { properties, localities, journalArticles, type Property, type Locality, type JournalArticle } from "./data";
import { cities, type City } from "./regions";
import { logSearchQuery } from "./enquiries";

export type SearchResultType = "locality" | "property" | "journal" | "service";

export interface SearchCatalogItem {
  id: string;
  type: SearchResultType;
  title: string;
  bengaliTitle?: string;
  locality?: string;
  city?: string;
  citySlug?: string;
  description: string;
  badge?: string;
  link: string;
  raw?: Property | Locality | JournalArticle | City;
}

export interface RecentSearchEntry {
  term: string;
  timestamp: number;
  resultClickedId?: string;
}

export interface SearchMatchRange {
  indices: readonly [number, number][];
  key?: string;
  value?: string;
}

export interface RankedSearchResult {
  item: SearchCatalogItem;
  score: number;
  matches?: readonly SearchMatchRange[];
}

/**
 * Extract and build the full unified catalog across properties, localities,
 * cities, journal posts, and architectural services.
 */
export function buildSearchCatalog(): SearchCatalogItem[] {
  const items: SearchCatalogItem[] = [];

  // 1. Localities (from cities & data.ts)
  cities.forEach((c) => {
    c.localities.forEach((l) => {
      items.push({
        id: `loc-${c.slug}-${l.slug}`,
        type: "locality",
        title: l.name,
        bengaliTitle: l.bengali,
        locality: l.name,
        city: c.nameEn,
        citySlug: c.slug,
        description: `${l.tagline || ""} Planned Bengal neighbourhood. Avg rate ${l.avgPriceSqFt}.`,
        badge: l.avgPriceSqFt,
        link: `/${c.slug}/localities/${l.slug}`,
      });
    });
  });

  // 2. Properties
  properties.forEach((p) => {
    const citySlug = p.citySlug || (p.localitySlug === "new-town" ? "new-town" : "kolkata");
    items.push({
      id: `prop-${p.id}`,
      type: "property",
      title: p.title,
      bengaliTitle: p.bengaliTitle,
      locality: p.locality,
      city: p.citySlug || "Kolkata",
      citySlug,
      description: `${p.bhk} · ${p.sqft.toLocaleString("en-IN")} sq ft · ${p.developer} · ${p.description}`,
      badge: p.price,
      link: `/${citySlug}/properties/${p.slug}`,
      raw: p,
    });
  });

  // 3. Journal Articles
  journalArticles.forEach((j) => {
    items.push({
      id: `journal-${j.slug}`,
      type: "journal",
      title: j.title,
      bengaliTitle: j.bengaliTitle,
      description: `${j.category} · ${j.excerpt}`,
      badge: j.category,
      link: `/journal/${j.slug}`,
      raw: j,
    });
  });

  // 4. Architectural Services
  items.push(
    {
      id: "service-interiors",
      type: "service",
      title: "Bespoke Interior Design & Furnishing",
      bengaliTitle: "টার্নকি ইন্টেরিয়র ডিজাইন ও ফার্নিশিং",
      description: "IS-710 marine ply, modular kitchens, custom wardrobes, false ceilings, and smart scene lighting.",
      badge: "From ₹1,250/sq ft (indicative)",
      link: "/services/interiors",
    },
    {
      id: "service-construction",
      type: "service",
      title: "Turnkey Residential Plot Construction",
      bengaliTitle: "টার্নকি প্লট নির্মাণ ও সিভিল ইঞ্জিনিয়ারিং",
      description: "Bored pile foundations, Seismic Zone IV engineering, HIDCO/KMC sanctions, and 10-year structural warranty.",
      badge: "From ₹1,950/sq ft (indicative)",
      link: "/services/construction",
    },
    {
      id: "service-overview",
      type: "service",
      title: "All Architectural & Construction Services",
      bengaliTitle: "সকল আর্কিটেকচারাল ও নির্মাণ সেবা",
      description: "One accountable team from physical site audit to turnkey keys. One integrated master warranty.",
      badge: "Unified House",
      link: "/services",
    },
    {
      id: "service-advisory",
      type: "service",
      title: "4-Pillar Due Diligence & Title Verification",
      bengaliTitle: "৪-স্তরের আইনি ও দলিল পরীক্ষা",
      description: "Physical site inspection, 30-year chain of title, WBRERA escrow, and sanctioned municipal drawing audit.",
      badge: "Single-Admin Audit",
      link: "/about/verification",
    }
  );

  return items;
}

/**
 * Fuse.js configuration with required weights:
 * locality name highest (0.4), then property title (0.3), then city (0.2), then description (0.1).
 */
const FUSE_OPTIONS: IFuseOptions<SearchCatalogItem> = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.38, // Typo tolerance: "newtwon" -> "New Town", "alipor" -> "Alipore"
  minMatchCharLength: 2,
  ignoreLocation: true,
  keys: [
    { name: "locality", weight: 0.4 },
    { name: "title", weight: 0.3 },
    { name: "city", weight: 0.2 },
    { name: "description", weight: 0.1 },
    { name: "bengaliTitle", weight: 0.1 },
  ],
};

let cachedFuseInstance: Fuse<SearchCatalogItem> | null = null;
let cachedCatalog: SearchCatalogItem[] | null = null;

export function getFuseInstance(): { fuse: Fuse<SearchCatalogItem>; catalog: SearchCatalogItem[] } {
  if (!cachedFuseInstance || !cachedCatalog) {
    cachedCatalog = buildSearchCatalog();
    cachedFuseInstance = new Fuse(cachedCatalog, FUSE_OPTIONS);
  }
  return { fuse: cachedFuseInstance, catalog: cachedCatalog };
}

// ---------------- LOCAL STORAGE RECENT SEARCHES ----------------
const RECENT_SEARCHES_KEY = "barighor_recent_searches";
const MAX_RECENT_SEARCHES = 10;

export function getRecentSearches(): RecentSearchEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(term: string, resultClickedId?: string): void {
  if (typeof window === "undefined" || !term.trim()) return;
  try {
    const trimmed = term.trim().toLowerCase();
    const existing = getRecentSearches().filter((s) => s.term.toLowerCase() !== trimmed);
    const updated: RecentSearchEntry[] = [
      { term: term.trim(), timestamp: Date.now(), resultClickedId },
      ...existing,
    ].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Private browsing resilience
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {}
}

/**
 * Blend personalized history into ranking:
 * Score formula: (frequency × 2) + recencyWeight
 * Lower score in Fuse.js means better match (0.0 is exact).
 */
export function executeFuzzySearch(query: string): {
  results: RankedSearchResult[];
  grouped: Record<SearchResultType, RankedSearchResult[]>;
  totalCount: number;
} {
  const { fuse, catalog } = getFuseInstance();
  const trimmed = query.trim();

  const emptyGrouped: Record<SearchResultType, RankedSearchResult[]> = {
    locality: [],
    property: [],
    service: [],
    journal: [],
  };

  if (!trimmed) {
    return { results: [], grouped: emptyGrouped, totalCount: 0 };
  }

  const fuseResults = fuse.search(trimmed);
  const recentSearches = getRecentSearches();

  // Calculate history weights for each recent search
  const historyStats = new Map<string, number>();
  const now = Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

  recentSearches.forEach((rs) => {
    const key = rs.term.toLowerCase();
    const age = now - rs.timestamp;
    const recencyWeight = Math.max(0, 1 - age / SEVEN_DAYS_MS);
    const current = historyStats.get(key) || 0;
    // frequency * 2 + recencyWeight
    historyStats.set(key, current + 2 + recencyWeight);
  });

  // Re-rank fuse results blending history
  const ranked: RankedSearchResult[] = fuseResults.map((res) => {
    const rawScore = res.score ?? 0.5;
    const itemTitle = res.item.title.toLowerCase();
    const itemLocality = (res.item.locality || "").toLowerCase();

    // Check if user has previously searched for this item
    let historyBonus = 0;
    for (const [searchedTerm, bonus] of historyStats.entries()) {
      if (itemTitle.includes(searchedTerm) || itemLocality.includes(searchedTerm) || res.item.id === searchedTerm) {
        historyBonus = Math.max(historyBonus, bonus);
      }
    }

    // Boost score: smaller is better
    const finalScore = rawScore / (1 + historyBonus * 0.25);

    return {
      item: res.item,
      score: finalScore,
      matches: res.matches as SearchMatchRange[] | undefined,
    };
  });

  // Sort by final blended score ascending
  ranked.sort((a, b) => a.score - b.score);

  // Group by type: Localities / Properties / Services / Journal
  const grouped: Record<SearchResultType, RankedSearchResult[]> = {
    locality: [],
    property: [],
    service: [],
    journal: [],
  };

  ranked.forEach((r) => {
    grouped[r.item.type].push(r);
  });

  return {
    results: ranked,
    grouped,
    totalCount: ranked.length,
  };
}

/**
 * Popular localities fallback (never a blank state)
 */
export const POPULAR_LOCALITIES = [
  { name: "New Town", city: "New Town", avgPrice: "₹7,800–12,400 / sq ft", link: "/new-town/localities/new-town" },
  { name: "Salt Lake (Bidhannagar)", city: "Kolkata", avgPrice: "₹9,500–15,200 / sq ft", link: "/kolkata/localities/salt-lake" },
  { name: "Alipore & Queens Park", city: "Kolkata", avgPrice: "₹18,000–31,000 / sq ft", link: "/kolkata/localities/alipore" },
  { name: "Shibpur Riverfront", city: "Howrah", avgPrice: "₹5,200–8,400 / sq ft", link: "/howrah/localities/shibpur" },
];
