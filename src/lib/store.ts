import { create } from "zustand";

export interface SearchState {
  locality: string;
  budget: string;
  bhk: string;
  listingType: "buy" | "rent" | "new_launch";
  propertyType: string;
  language: "en" | "bn";
  selectedCity: string;
  mobileNavOpen: boolean;
  shortlist: string[];
  recentlyViewed: string[];
  setLocality: (locality: string) => void;
  setBudget: (budget: string) => void;
  setBhk: (bhk: string) => void;
  setListingType: (listingType: "buy" | "rent" | "new_launch") => void;
  setPropertyType: (propertyType: string) => void;
  setLanguage: (lang: "en" | "bn") => void;
  setCity: (city: string) => void;
  toggleLanguage: () => void;
  setMobileNavOpen: (open: boolean) => void;
  toggleShortlist: (propertyId: string) => void;
  clearShortlist: () => void;
  isShortlisted: (propertyId: string) => boolean;
  addRecentlyViewed: (propertyId: string) => void;
  clearRecentlyViewed: () => void;
  resetFilters: () => void;
}

function getStoredShortlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("barighor_shortlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getStoredRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("barighor_recently_viewed");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getStoredLanguage(): "en" | "bn" {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("barighor_lang");
    return stored === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

function getStoredCity(): string {
  if (typeof window === "undefined") return "kolkata";
  try {
    return localStorage.getItem("barighor_city") || "kolkata";
  } catch {
    return "kolkata";
  }
}

export const useAppStore = create<SearchState>((set, get) => ({
  locality: "all",
  budget: "all",
  bhk: "all",
  listingType: "buy",
  propertyType: "all",
  language: getStoredLanguage(),
  selectedCity: getStoredCity(),
  mobileNavOpen: false,
  shortlist: getStoredShortlist(),
  recentlyViewed: getStoredRecentlyViewed(),

  setLocality: (locality) => set({ locality }),
  setBudget: (budget) => set({ budget }),
  setBhk: (bhk) => set({ bhk }),
  setListingType: (listingType) => set({ listingType }),
  setPropertyType: (propertyType) => set({ propertyType }),

  setLanguage: (language) => {
    try {
      localStorage.setItem("barighor_lang", language);
    } catch {}
    set({ language });
  },

  setCity: (city) => {
    try {
      localStorage.setItem("barighor_city", city);
    } catch {}
    set({ selectedCity: city });
  },

  toggleLanguage: () => {
    const nextLang = get().language === "en" ? "bn" : "en";
    try {
      localStorage.setItem("barighor_lang", nextLang);
    } catch {}
    set({ language: nextLang });
  },

  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),

  toggleShortlist: (propertyId: string) => {
    const current = get().shortlist;
    const exists = current.includes(propertyId);
    const updated = exists
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];
    try {
      localStorage.setItem("barighor_shortlist", JSON.stringify(updated));
    } catch {}
    set({ shortlist: updated });
  },

  clearShortlist: () => {
    try {
      localStorage.removeItem("barighor_shortlist");
    } catch {}
    set({ shortlist: [] });
  },

  isShortlisted: (propertyId: string) => {
    return get().shortlist.includes(propertyId);
  },

  addRecentlyViewed: (propertyId: string) => {
    const current = get().recentlyViewed.filter((id) => id !== propertyId);
    const updated = [propertyId, ...current].slice(0, 6);
    try {
      localStorage.setItem("barighor_recently_viewed", JSON.stringify(updated));
    } catch {}
    set({ recentlyViewed: updated });
  },

  clearRecentlyViewed: () => {
    try {
      localStorage.removeItem("barighor_recently_viewed");
    } catch {}
    set({ recentlyViewed: [] });
  },

  resetFilters: () =>
    set({
      locality: "all",
      budget: "all",
      bhk: "all",
      listingType: "buy",
      propertyType: "all",
    }),
}));
