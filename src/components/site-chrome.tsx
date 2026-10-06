import { Link } from "@tanstack/react-router";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { LocalitySearch } from "@/components/locality-search";
import { CitySelector } from "@/components/city-selector";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${
        inverse ? "text-hero-foreground" : "text-primary"
      }`}
      aria-label="BariGhor home"
    >
      <span className="grid size-9 place-items-center rounded-sm border border-current font-display text-xl font-bold leading-none transition-transform group-hover:scale-105">
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
  const { language, toggleLanguage, mobileNavOpen, setMobileNavOpen } = useAppStore();
  const tone = inverse ? "text-hero-foreground" : "text-foreground";
  const headerBg = sticky
    ? "sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-xs"
    : inverse
      ? "absolute inset-x-0 top-0 z-40 border-b border-hero-foreground/15"
      : "relative border-b border-border bg-background";

  return (
    <header className={headerBg}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <Brand inverse={inverse} />
          <CitySelector inverse={inverse} />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden items-center gap-8 text-sm font-medium lg:flex ${tone}`}
          aria-label="Primary navigation"
        >
          <Link
            to="/localities"
            className="transition-colors hover:text-accent"
            activeProps={{ className: "text-accent font-semibold" }}
          >
            {language === "en" ? "Localities" : "পাড়া ও এলাকা"}
          </Link>
          <Link
            to="/properties"
            className="transition-colors hover:text-accent"
            activeProps={{ className: "text-accent font-semibold" }}
          >
            {language === "en" ? "Handpicked homes" : "বাছাই করা বাড়ি"}
          </Link>
          <Link
            to="/journal"
            className="transition-colors hover:text-accent"
            activeProps={{ className: "text-accent font-semibold" }}
          >
            {language === "en" ? "Market journal" : "মার্কেট জার্নাল"}
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LocalitySearch inverse={inverse} />
          <Button
            variant={inverse ? "ghost" : "outline"}
            size="sm"
            onClick={toggleLanguage}
            className={`border-border/60 ${
              inverse ? "text-hero-foreground hover:bg-hero-foreground/15" : ""
            }`}
            aria-label="Switch language"
          >
            {language === "en" ? "বাংলা" : "English"}
          </Button>

          <Link
            to="/sign-in"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors hover:text-accent ${tone}`}
          >
            <User className="size-3.5" />
            {language === "en" ? "Sign in" : "লগইন"}
          </Link>

          <Button
            asChild
            variant={inverse ? "secondary" : "default"}
            size="sm"
            className="font-medium"
          >
            <Link to="/properties/$slug" params={{ slug: "the-verandah-residences" }}>
              Featured Home
              <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LocalitySearch inverse={inverse} />
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className={`text-xs ${tone}`}>
            {language === "en" ? "বাংলা" : "EN"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={tone}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileNavOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="border-t border-border bg-background px-6 py-6 text-foreground shadow-xl lg:hidden">
          <nav className="grid gap-2 text-base font-medium">
            <Link
              to="/localities"
              className="flex items-center justify-between border-b border-border/50 py-3 transition-colors hover:text-accent"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{language === "en" ? "Localities" : "পাড়া ও এলাকা"}</span>
              <span className="text-xs text-muted-foreground">New Town · Salt Lake · Alipore</span>
            </Link>
            <Link
              to="/properties"
              className="flex items-center justify-between border-b border-border/50 py-3 transition-colors hover:text-accent"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{language === "en" ? "Handpicked homes" : "বাছাই করা বাড়ি"}</span>
              <span className="text-xs text-muted-foreground">8 verified residences</span>
            </Link>
            <Link
              to="/journal"
              className="flex items-center justify-between border-b border-border/50 py-3 transition-colors hover:text-accent"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{language === "en" ? "Market journal" : "মার্কেট জার্নাল"}</span>
              <span className="text-xs text-muted-foreground">Field guides & WBRERA</span>
            </Link>
            <Link
              to="/sign-in"
              className="flex items-center justify-between border-b border-border/50 py-3 transition-colors hover:text-accent"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{language === "en" ? "Sign in to Account" : "একাউন্টে লগইন করুন"}</span>
              <User className="size-4 text-muted-foreground" />
            </Link>

            <div className="mt-4 flex gap-2 pt-2">
              <Button asChild className="w-full" onClick={() => setMobileNavOpen(false)}>
                <Link to="/search">Explore All Homes</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { language } = useAppStore();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr_1fr] lg:px-8">
        <div>
          <Brand inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/75">
            {language === "en"
              ? "BariGhor is Kolkata's curated real estate publication and brokerage advisory. Verified properties, honest neighbourhood notes, and zero spam."
              : "কলকাতার নির্বাচিত রিয়েল এস্টেট প্ল্যাটফর্ম। যাচাই করা বাড়ি এবং পাড়ার সঠিক তথ্য।"}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-primary-foreground/60">
            <span className="rounded-sm bg-primary-foreground/10 px-2 py-1">WBRERA Verified</span>
            <span className="rounded-sm bg-primary-foreground/10 px-2 py-1">
              Direct Land Titles
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Cities</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <Link to="/cities/$slug" params={{ slug: "kolkata" }} className="hover:text-accent transition-colors">
                Kolkata
              </Link>
            </li>
            <li>
              <Link to="/cities/$slug" params={{ slug: "new-town" }} className="hover:text-accent transition-colors">
                New Town
              </Link>
            </li>
            <li>
              <Link to="/cities/$slug" params={{ slug: "howrah" }} className="hover:text-accent transition-colors">
                Howrah
              </Link>
            </li>
            <li>
              <Link to="/cities" className="text-accent underline underline-offset-4 hover:opacity-80">
                View All Regions →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Localities</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <Link
                to="/localities/$slug"
                params={{ slug: "new-town" }}
                className="hover:text-accent transition-colors"
              >
                New Town & Rajarhat
              </Link>
            </li>
            <li>
              <Link
                to="/localities/$slug"
                params={{ slug: "salt-lake" }}
                className="hover:text-accent transition-colors"
              >
                Salt Lake (Bidhannagar)
              </Link>
            </li>
            <li>
              <Link
                to="/localities/$slug"
                params={{ slug: "alipore" }}
                className="hover:text-accent transition-colors"
              >
                Alipore & Queens Park
              </Link>
            </li>
            <li>
              <Link
                to="/localities"
                className="text-accent underline underline-offset-4 hover:opacity-80"
              >
                View All Neighbourhoods →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Market Journal
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
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
                WBRERA Rules
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
              <Link
                to="/journal"
                className="text-accent underline underline-offset-4 hover:opacity-80"
              >
                Read All Articles →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <Link to="/properties" className="hover:text-accent transition-colors">
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-accent transition-colors">
                Interactive Search
              </Link>
            </li>
            <li>
              <Link to="/sign-in" className="hover:text-accent transition-colors">
                Sign in / Register
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/919073599355?text=Hi%20BariGhor%2C%20I%20am%20looking%20for%20properties%20in%20Kolkata."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Direct WhatsApp Desk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-5 py-6 text-center text-xs text-primary-foreground/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} BariGhor Real Estate Advisory. All demonstration listings
            verified against WBRERA records.
          </p>
          <p className="text-primary-foreground/45">Built for Kolkata with precision.</p>
        </div>
      </div>
    </footer>
  );
}
