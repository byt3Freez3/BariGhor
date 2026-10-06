import { create } from "zustand";

export interface SearchState {
  locality: string;
  budget: string;
  bhk: string;
  language: "en" | "bn";
  selectedCity: string;
  mobileNavOpen: boolean;
  setLocality: (locality: string) => void;
  setBudget: (budget: string) => void;
  setBhk: (bhk: string) => void;
  setLanguage: (lang: "en" | "bn") => void;
  setCity: (city: string) => void;
  toggleLanguage: () => void;
  setMobileNavOpen: (open: boolean) => void;
  resetFilters: () => void;
}

export const useAppStore = create<SearchState>((set) => ({
  locality: "all",
  budget: "all",
  bhk: "all",
  language: "en",
  selectedCity: (() => {
    if (typeof window === "undefined") return "kolkata";
    try {
      return localStorage.getItem("barighor_city") || "kolkata";
    } catch {
      return "kolkata";
    }
  })(),
  mobileNavOpen: false,
  setLocality: (locality) => set({ locality }),
  setBudget: (budget) => set({ budget }),
  setBhk: (bhk) => set({ bhk }),
  setLanguage: (language) => set({ language }),
  setCity: (city) => {
    try {
      localStorage.setItem("barighor_city", city);
    } catch {}
    set({ selectedCity: city });
  },
  toggleLanguage: () => set((state) => ({ language: state.language === "en" ? "bn" : "en" })),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  resetFilters: () => set({ locality: "all", budget: "all", bhk: "all" }),
}));
