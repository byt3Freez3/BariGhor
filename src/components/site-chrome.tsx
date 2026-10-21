import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  ChevronDown,
  Compass,
  FileText,
  Heart,
  Home,
  Layers,
  Menu,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/lib/store";
import { CitySelector } from "@/components/city-selector";
import { CommandPalette } from "@/components/command-palette";
import { cities, getCityBySlug } from "@/lib/regions";
import { Reveal, RevealGroup } from "@/components/reveal";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const selectedCity = useAppStore((state) => state.selectedCity);
  return (
    <Link
      to="/$citySlug"
      params={{ citySlug: selectedCity }}
      className={`group inline-flex items-center gap-2.5 ${
        inverse ? "text-hero-foreground" : "text-primary"
      }`}
    >
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-sm border border-current font-display text-xl font-bold leading-none transition-transform group-hover:scale-105">
        ব
      </span>
      <span className="font-display text-2xl font-bold tracking-tight">BariGhor</span>
    </Link>
  );
}

export function SiteHeader({
  inverse = false,
  sticky = false,
}: {
  inverse?: boolean;
  sticky?: boolean;
}) {
  const router = useRouter();
  const {
    language,
    setLanguage,
    mobileNavOpen,
    setMobileNavOpen,
    selectedCity,
    shortlist,
  } = useAppStore();

  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentCityObj = React.useMemo(() => {
    return getCityBySlug(selectedCity) || cities[0];
  }, [selectedCity]);

  // Header background logic:
  // When over hero (inverse): transparent at scrollY 0, transitioning smoothly to solid deep teal (#0A3632) after 80px scroll.
  // Using fixed positioning prevents layout snaps between absolute and sticky.
  const isSolid = sticky || !inverse || scrolled;
  const headerClasses = inverse
    ? scrolled
      ? "fixed inset-x-0 top-0 z-40 bg-[#0A3632] text-white border-b border-white/10 shadow-md backdrop-blur-md site-header transition-[background-color,border-color,box-shadow,color] duration-base ease-premium"
      : "fixed inset-x-0 top-0 z-40 bg-transparent text-hero-foreground border-b border-hero-foreground/15 shadow-none site-header transition-[background-color,border-color,box-shadow,color] duration-base ease-premium"
    : "sticky top-0 z-40 bg-background/95 text-foreground border-b border-border shadow-xs backdrop-blur-md site-header transition-[background-color,border-color,box-shadow,color] duration-base ease-premium";

  const isDarkTone = inverse;

  return (
    <>
      <header
        className={headerClasses}
        data-tone={isDarkTone ? "inverse" : undefined}
        data-site-header="true"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Left: Brand + City Pill */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Brand inverse={isDarkTone} />
            <CitySelector inverse={isDarkTone} />
          </div>

          {/* Desktop Nav: Buy ▾ | Neighbourhoods ▾ | Journal | About ▾ */}
          <nav
            className="hidden items-center gap-7 text-sm font-medium lg:flex"
            aria-label="Primary navigation"
          >
            {/* Buy Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 transition-colors hover:text-accent font-medium outline-none ${
                  isDarkTone ? "text-hero-foreground" : "text-foreground"
                }`}
              >
                <span>{language === "en" ? "Buy" : "ক্রয়"}</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 shadow-xl">
                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {currentCityObj.nameEn} Residences
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    className="flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Home className="size-4 text-accent" />
                    <span>All Handpicked Homes</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/$citySlug/search"
                    params={{ citySlug: selectedCity }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Search className="size-4 text-muted-foreground" />
                    <span>Search & Filters</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/$citySlug/properties/$propertySlug"
                    params={{ citySlug: "new-town", propertySlug: "the-verandah-residences" }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="size-4 text-accent" />
                    <span>Featured Home: The Verandah</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Browse by Budget
                </DropdownMenuLabel>
                <div className="grid grid-cols-2 gap-1 p-1 text-xs">
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    search={{ budget: "under-25l" }}
                    className="rounded-xs px-2 py-1.5 text-muted-foreground hover:bg-accent/15 hover:text-foreground font-medium transition-colors"
                  >
                    Under ₹25L
                  </Link>
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    search={{ budget: "25l-50l" }}
                    className="rounded-xs px-2 py-1.5 text-muted-foreground hover:bg-accent/15 hover:text-foreground font-medium transition-colors"
                  >
                    ₹25 – 50L
                  </Link>
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    search={{ budget: "50l-1cr" }}
                    className="rounded-xs px-2 py-1.5 text-muted-foreground hover:bg-accent/15 hover:text-foreground font-medium transition-colors"
                  >
                    ₹50L – 1Cr
                  </Link>
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    search={{ budget: "1cr-3cr" }}
                    className="rounded-xs px-2 py-1.5 text-muted-foreground hover:bg-accent/15 hover:text-foreground font-medium transition-colors"
                  >
                    ₹1 – 3Cr
                  </Link>
                  <Link
                    to="/$citySlug/properties"
                    params={{ citySlug: selectedCity }}
                    search={{ budget: "3cr-plus" }}
                    className="col-span-2 rounded-xs px-2 py-1.5 text-muted-foreground hover:bg-accent/15 hover:text-foreground font-medium transition-colors"
                  >
                    ₹3Cr+ Ultra Luxury
                  </Link>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Browse by Layout
                </DropdownMenuLabel>
                <div className="flex gap-1.5 p-1 text-xs">
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK+"].map((bhkVal) => (
                    <Link
                      key={bhkVal}
                      to="/$citySlug/properties"
                      params={{ citySlug: selectedCity }}
                      search={{ bhk: bhkVal }}
                      className="flex-1 rounded-xs border border-border py-1 text-center font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      {bhkVal}
                    </Link>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Neighbourhoods Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 transition-colors hover:text-accent font-medium outline-none ${
                  isDarkTone ? "text-hero-foreground" : "text-foreground"
                }`}
              >
                <span>{language === "en" ? "Neighbourhoods" : "পাড়া ও এলাকা"}</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 shadow-xl">
                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {currentCityObj.nameEn} ({currentCityObj.nameBn})
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to="/$citySlug/localities"
                    params={{ citySlug: selectedCity }}
                    className="flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span>All {currentCityObj.nameEn} Localities</span>
                  </Link>
                </DropdownMenuItem>

                {currentCityObj.localities.slice(0, 4).map((loc) => (
                  <DropdownMenuItem key={loc.slug} asChild>
                    <Link
                      to="/$citySlug/localities/$localitySlug"
                      params={{ citySlug: selectedCity, localitySlug: loc.slug }}
                      className="flex items-center justify-between cursor-pointer text-xs"
                    >
                      <span>{loc.name}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {loc.avgPriceSqFt}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/cities" className="flex items-center gap-2 cursor-pointer font-medium">
                    <Compass className="size-4 text-accent" />
                    <span>West Bengal Cities Map</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 transition-colors hover:text-accent font-medium outline-none ${
                  isDarkTone ? "text-hero-foreground" : "text-foreground"
                }`}
              >
                <span>{language === "en" ? "Services" : "সেবা ও নির্মাণ"}</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 shadow-xl">
                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Turnkey Capabilities
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Layers className="size-4 text-accent" />
                    <span>All Architectural Services</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/services/interiors"
                    className="flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Paintbrush className="size-4 text-accent" />
                      <span className="font-medium">Interior Design</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">From ₹1,250/sq ft</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/services/construction"
                    className="flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Building className="size-4 text-accent" />
                      <span className="font-medium">Turnkey Construction</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">From ₹1,950/sq ft</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/about/verification"
                    className="flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>Property Advisory & Land Audit</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Journal */}
            <Link
              to="/journal"
              className={`transition-colors hover:text-accent font-medium ${
                isDarkTone ? "text-hero-foreground" : "text-foreground"
              }`}
              activeProps={{ className: "text-accent font-semibold" }}
            >
              {language === "en" ? "Journal" : "মার্কেট জার্নাল"}
            </Link>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 transition-colors hover:text-accent font-medium outline-none ${
                  isDarkTone ? "text-hero-foreground" : "text-foreground"
                }`}
              >
                <span>{language === "en" ? "About" : "আমাদের কথা"}</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to="/about" hash="story" className="cursor-pointer font-medium">
                    Our Story & Advisory
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" hash="verification" className="cursor-pointer font-medium">
                    <ShieldCheck className="mr-2 size-3.5 text-accent" />
                    4-Pillar Verification
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" hash="licence" className="cursor-pointer font-medium">
                    WBRERA Agent Licence
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" hash="accolades" className="cursor-pointer font-medium">
                    Accolades & Citations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" hash="seminars" className="cursor-pointer font-medium">
                    Free Buyer Seminars
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Actions: [🔍] [EN | বাং] [♡ Shortlist (n)] */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className={`group flex size-9 items-center justify-center rounded-full border transition-all ${
                isDarkTone
                  ? "border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/15 hover:border-hero-foreground/40"
                  : "border-border text-foreground hover:bg-muted hover:border-foreground/30"
              }`}
              aria-label="Open search command palette (Ctrl+K or ⌘K)"
              title="Search (⌘K)"
            >
              <Search className="size-4 transition-transform group-hover:scale-110" />
            </button>

            {/* Compact Segmented Control: [EN | বাং] */}
            <div
              className={`inline-flex items-center rounded-full border p-0.5 text-xs font-medium ${
                isDarkTone
                  ? "border-hero-foreground/20 bg-hero-foreground/10 text-hero-foreground/75"
                  : "border-border bg-muted/60 text-muted-foreground"
              }`}
              role="radiogroup"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  language === "en"
                    ? isDarkTone
                      ? "bg-accent text-primary font-bold shadow-xs"
                      : "bg-background text-foreground font-bold shadow-xs"
                    : "hover:text-foreground"
                }`}
                aria-checked={language === "en"}
                role="radio"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`rounded-full px-2.5 py-1 font-bengali transition-all ${
                  language === "bn"
                    ? isDarkTone
                      ? "bg-accent text-primary font-bold shadow-xs"
                      : "bg-background text-foreground font-bold shadow-xs"
                    : "hover:text-foreground"
                }`}
                aria-checked={language === "bn"}
                role="radio"
              >
                বাং
              </button>
            </div>

            {/* Shortlist Link */}
            <Link
              to="/shortlist"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                shortlist.length > 0
                  ? isDarkTone
                    ? "border-accent/40 bg-accent/15 text-accent hover:bg-accent/25"
                    : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
                  : isDarkTone
                    ? "border-hero-foreground/20 text-hero-foreground/80 hover:bg-hero-foreground/15"
                    : "border-border text-foreground hover:bg-muted"
              }`}
              aria-label={`Shortlist (${shortlist.length} saved)`}
            >
              <Heart
                className={`size-3.5 transition-transform group-hover:scale-110 ${
                  shortlist.length > 0 ? "fill-accent text-accent" : ""
                }`}
              />
              <span className="hidden sm:inline">
                {language === "en" ? "Shortlist" : "শর্টলিস্ট"}
              </span>
              {shortlist.length > 0 && (
                <span className="font-mono text-[11px] font-bold">({shortlist.length})</span>
              )}
            </Link>

            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isDarkTone ? "text-hero-foreground" : "text-foreground"}`}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="border-t border-border bg-background px-6 py-6 text-foreground shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-base ease-premium">
            <nav className="grid gap-2 text-base font-medium">
              <Link
                to="/$citySlug/properties"
                params={{ citySlug: selectedCity }}
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">Handpicked Homes</p>
                  <p className="text-xs text-muted-foreground">বাছাই করা বাড়ি ও নতুন প্রজেক্ট</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/$citySlug/localities"
                params={{ citySlug: selectedCity }}
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">Neighbourhoods & Paras</p>
                  <p className="text-xs text-muted-foreground">পাড়া, ডসিয়ার ও সংযোগ স্কোর</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/cities"
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">West Bengal Price Map</p>
                  <p className="text-xs text-muted-foreground">১১টি শহরের রোলআউট ও স্কোয়ারফুট দর</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/services"
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">Architectural Services</p>
                  <p className="text-xs text-muted-foreground">ইন্টেরিয়র ডিজাইন ও টার্নকি প্লট নির্মাণ</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/journal"
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">Market Journal</p>
                  <p className="text-xs text-muted-foreground">ফিল্ড গাইড, WBRERA ও আইনি তথ্য</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/about"
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">About BariGhor</p>
                  <p className="text-xs text-muted-foreground">একক মালিকানা ও ৪-স্তরের ভেরিফিকেশন</p>
                </div>
                <ArrowRight className="size-4 text-accent" />
              </Link>

              <Link
                to="/shortlist"
                className="flex items-center justify-between border-b border-border/50 py-3.5 transition-colors hover:text-accent"
                onClick={() => setMobileNavOpen(false)}
              >
                <div>
                  <p className="font-display text-lg font-bold">
                    My Shortlist {shortlist.length > 0 && `(${shortlist.length})`}
                  </p>
                  <p className="text-xs text-muted-foreground">সংরক্ষিত বাড়ি ও হোয়াটসঅ্যাপ শেয়ার</p>
                </div>
                <Heart className="size-4 text-accent" />
              </Link>

              <div className="mt-4 pt-2">
                <Button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    setCmdOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold"
                >
                  <Search className="size-4" /> Quick Search & Jump (⌘K)
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}

export function SiteFooter() {
  const { language, selectedCity } = useAppStore();
  const tier1Cities = cities.filter((c) => c.tier === 1);
  const tier2Cities = cities.filter((c) => c.tier === 2);

  return (
    <footer className="bg-primary text-primary-foreground">
      <RevealGroup staggerMs={60} className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1fr_1fr] lg:px-8">
        <Reveal as="div">
          <Brand inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/75">
            {language === "en"
              ? "BariGhor is Bengal's boutique real estate publication and single-owner advisory. 100% physically audited properties, direct land titles, and zero portal spam."
              : "পশ্চিমবঙ্গের নির্বাচিত রিয়েল এস্টেট প্ল্যাটফর্ম। যাচাই করা বাড়ি এবং প্রতিটি শহরের সঠিক তথ্য।"}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-primary-foreground/60">
            <span className="rounded-sm bg-primary-foreground/10 px-2 py-1">WBRERA Verified</span>
            <span className="rounded-sm bg-primary-foreground/10 px-2 py-1">Direct Land Titles</span>
            <span className="rounded-sm bg-primary-foreground/10 px-2 py-1">Physical Site Audits</span>
          </div>
        </Reveal>

        {/* Full Tier-Wise City Sitemap */}
        <Reveal as="div">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              West Bengal City Sitemap
            </p>
            <Link
              to="/cities"
              className="text-[11px] text-accent underline underline-offset-4 hover:opacity-80"
            >
              Full Rollout Map →
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary-foreground/50">
                Tier 1 Metropolises
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-primary-foreground/80">
                {tier1Cities.map((city) => (
                  <li key={city.slug} className="flex items-center justify-between pr-2">
                    <Link
                      to="/$citySlug"
                      params={{ citySlug: city.slug }}
                      className="hover:text-accent transition-colors font-medium"
                    >
                      {city.nameEn} ({city.nameBn})
                    </Link>
                    <span className="text-[10px] text-primary-foreground/50 font-mono">
                      ₹{city.avgPricePerSqft.toLocaleString("en-IN")}/sq ft
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary-foreground/50">
                Tier 2 Growth Corridors
              </p>
              <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-primary-foreground/80">
                {tier2Cities.map((city) => (
                  <Link
                    key={city.slug}
                    to="/$citySlug"
                    params={{ citySlug: city.slug }}
                    className="hover:text-accent transition-colors truncate"
                  >
                    {city.nameEn}{" "}
                    <span className="text-[10px] opacity-60">
                      · ₹{city.avgPricePerSqft.toLocaleString("en-IN")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Localities & Neighbourhoods */}
        <Reveal as="div">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Neighbourhoods
          </p>
          <ul className="mt-4 space-y-2 text-xs text-primary-foreground/80">
            <li>
              <Link
                to="/$citySlug/localities/$localitySlug"
                params={{ citySlug: "new-town", localitySlug: "new-town" }}
                className="hover:text-accent transition-colors"
              >
                New Town & Rajarhat
              </Link>
            </li>
            <li>
              <Link
                to="/$citySlug/localities/$localitySlug"
                params={{ citySlug: "kolkata", localitySlug: "salt-lake" }}
                className="hover:text-accent transition-colors"
              >
                Salt Lake (Bidhannagar)
              </Link>
            </li>
            <li>
              <Link
                to="/$citySlug/localities/$localitySlug"
                params={{ citySlug: "kolkata", localitySlug: "alipore" }}
                className="hover:text-accent transition-colors"
              >
                Alipore & Queens Park
              </Link>
            </li>
            <li>
              <Link
                to="/$citySlug/localities/$localitySlug"
                params={{ citySlug: "howrah", localitySlug: "shibpur" }}
                className="hover:text-accent transition-colors"
              >
                Shibpur Riverfront, Howrah
              </Link>
            </li>
            <li>
              <Link
                to="/$citySlug/localities"
                params={{ citySlug: selectedCity }}
                className="text-accent underline underline-offset-4 hover:opacity-80 block pt-1"
              >
                View{" "}
                {selectedCity
                  ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
                  : "All"}{" "}
                Neighbourhoods →
              </Link>
            </li>
          </ul>
        </Reveal>

        {/* Journal & Legal */}
        <Reveal as="div">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Journal & Direct Desk
          </p>
          <ul className="mt-4 space-y-2 text-xs text-primary-foreground/80">
            <li>
              <Link to="/services" className="hover:text-accent transition-colors font-semibold text-accent">
                Architectural & Turnkey Services
              </Link>
            </li>
            <li>
              <Link to="/services/interiors" className="hover:text-accent transition-colors">
                Interior Design & Furnishing
              </Link>
            </li>
            <li>
              <Link to="/services/construction" className="hover:text-accent transition-colors">
                Turnkey Plot Construction
              </Link>
            </li>
            <li>
              <Link
                to="/journal/$slug"
                params={{ slug: "freehold-leasehold-kolkata" }}
                className="hover:text-accent transition-colors"
              >
                Freehold vs Leasehold
              </Link>
            </li>
            <li>
              <Link
                to="/journal/$slug"
                params={{ slug: "understanding-wbrera" }}
                className="hover:text-accent transition-colors"
              >
                WBRERA Buyer Protection
              </Link>
            </li>
            <li>
              <Link
                to="/journal/$slug"
                params={{ slug: "kolkata-monsoon-drainage-guide" }}
                className="hover:text-accent transition-colors"
              >
                Monsoon Drainage Guide
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent transition-colors">
                Our Story & Verification
              </Link>
            </li>
            <li className="pt-2">
              <a
                href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20am%20looking%20for%20verified%20properties%20in%20West%20Bengal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:underline"
              >
                Direct WhatsApp Advisory (+91 90735 99355)
              </a>
            </li>
          </ul>
        </Reveal>
      </RevealGroup>

      {/* DEEP SEO SITEMAP MATRIX: City × BHK, City × Budget, City × Locality */}
      <div className="border-t border-primary-foreground/15 bg-black/25 py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-primary-foreground/15 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              West Bengal Property Directory & Deep SEO Index
            </p>
            <span className="text-[11px] text-primary-foreground/50">
              Verified Listings & Municipal Land Records
            </span>
          </div>

          <RevealGroup staggerMs={60} className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-xs text-primary-foreground/75">
            {/* Column 1: BHK by City */}
            <Reveal as="div">
              <p className="font-semibold text-primary-foreground text-sm border-b border-primary-foreground/15 pb-2">
                Popular BHK Configurations
              </p>
              <ul className="mt-3 space-y-1.5">
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kolkata" }} search={{ bhk: "2 BHK" }} className="hover:text-accent">2 BHK Flats in Kolkata</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kolkata" }} search={{ bhk: "3 BHK" }} className="hover:text-accent">3 BHK Flats in Kolkata</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "new-town" }} search={{ bhk: "3 BHK" }} className="hover:text-accent">3 BHK Apartments in New Town</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "howrah" }} search={{ bhk: "2 BHK" }} className="hover:text-accent">2 BHK Riverfront Flats in Howrah</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "siliguri" }} search={{ bhk: "3 BHK" }} className="hover:text-accent">3 BHK Luxury Flats in Siliguri</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "durgapur" }} search={{ bhk: "2 BHK" }} className="hover:text-accent">2 BHK Gated Flats in Durgapur</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kolkata" }} search={{ bhk: "4 BHK+" }} className="hover:text-accent">4 BHK Penthouses in South Kolkata</Link></li>
              </ul>
            </Reveal>

            {/* Column 2: Budget Bands */}
            <Reveal as="div">
              <p className="font-semibold text-primary-foreground text-sm border-b border-primary-foreground/15 pb-2">
                Browse by Budget Band
              </p>
              <ul className="mt-3 space-y-1.5">
                <li><Link to="/$citySlug/properties" params={{ citySlug: "habra" }} search={{ budget: "under-25l" }} className="hover:text-accent">Affordable Homes Under ₹25L</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "asansol" }} search={{ budget: "25l-50l" }} className="hover:text-accent">Homes in ₹25 – 50 Lakhs (Tier 2)</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kolkata" }} search={{ budget: "50l-1cr" }} className="hover:text-accent">Kolkata Homes ₹50L – 1.0 Crore</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "new-town" }} search={{ budget: "1cr-3cr" }} className="hover:text-accent">New Town Residences ₹1.0 – 3.0 Cr</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kolkata" }} search={{ budget: "3cr-plus" }} className="hover:text-accent">Ultra Luxury Alipore Homes ₹3 Cr+</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "bardhaman" }} search={{ budget: "25l-50l" }} className="hover:text-accent">Bardhaman Townhouses ₹25 – 50L</Link></li>
                <li><Link to="/$citySlug/properties" params={{ citySlug: "kalyani" }} search={{ budget: "under-25l" }} className="hover:text-accent">Kalyani Smart City Plots & Flats</Link></li>
              </ul>
            </Reveal>

            {/* Column 3: Prime Bengal Localities */}
            <Reveal as="div">
              <p className="font-semibold text-primary-foreground text-sm border-b border-primary-foreground/15 pb-2">
                Prime Bengal Neighbourhoods
              </p>
              <ul className="mt-3 space-y-1.5">
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "kolkata", localitySlug: "alipore" }} className="hover:text-accent">Alipore & Burdwan Road</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "kolkata", localitySlug: "salt-lake" }} className="hover:text-accent">Salt Lake Sector V & Central Park</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "new-town", localitySlug: "new-town" }} className="hover:text-accent">New Town Action Area I & II</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "kolkata", localitySlug: "ballygunge" }} className="hover:text-accent">Ballygunge Circular Road</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "howrah", localitySlug: "shibpur" }} className="hover:text-accent">Shibpur Foreshore Road</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "siliguri", localitySlug: "sevoke-road" }} className="hover:text-accent">Sevoke Road Foothill Belt</Link></li>
                <li><Link to="/$citySlug/localities/$localitySlug" params={{ citySlug: "durgapur", localitySlug: "city-centre" }} className="hover:text-accent">City Centre Durgapur</Link></li>
              </ul>
            </Reveal>

            {/* Column 4: Regulatory & Statutory */}
            <Reveal as="div">
              <p className="font-semibold text-primary-foreground text-sm border-b border-primary-foreground/15 pb-2">
                Statutory & Buyer Protection
              </p>
              <ul className="mt-3 space-y-1.5">
                <li><Link to="/about/verification" className="hover:text-accent">4-Pillar Due Diligence Protocol</Link></li>
                <li><Link to="/about" hash="licence" className="hover:text-accent">WBRERA Licence Details</Link></li>
                <li><Link to="/about" hash="story" className="hover:text-accent">Single-Admin Advisory Model</Link></li>
                <li><Link to="/journal/$slug" params={{ slug: "understanding-wbrera" }} className="hover:text-accent">Escrow & Consumer Remedies</Link></li>
                <li><Link to="/journal/$slug" params={{ slug: "freehold-leasehold-kolkata" }} className="hover:text-accent">Kolkata Freehold vs Leasehold</Link></li>
                <li><Link to="/journal/$slug" params={{ slug: "kolkata-monsoon-drainage-guide" }} className="hover:text-accent">Monsoon High-Tide Drainage Guide</Link></li>
                <li><Link to="/shortlist" className="hover:text-accent">Private Shortlist (Zero Login)</Link></li>
              </ul>
            </Reveal>
          </RevealGroup>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-5 py-6 text-center text-xs text-primary-foreground/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} BariGhor Real Estate Advisory. West Bengal RERA Registered
            Agent: WBRERA/A/KOL/2023/000184.
          </p>
          <p className="text-primary-foreground/45">Boutique Bengal Real Estate Publication & Advisory.</p>
        </div>
      </div>
    </footer>
  );
}
