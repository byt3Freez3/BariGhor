import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${inverse ? "text-hero-foreground" : "text-primary"}`} aria-label="BariGhor home">
      <span className="grid size-9 place-items-center border border-current font-display text-xl leading-none">ব</span>
      <span className="font-display text-2xl">BariGhor</span>
    </Link>
  );
}

export function SiteHeader({ language, onLanguage, inverse = false }: { language: "en" | "bn"; onLanguage: () => void; inverse?: boolean }) {
  const [open, setOpen] = useState(false);
  const tone = inverse ? "text-hero-foreground" : "text-foreground";
  return (
    <header className={`absolute inset-x-0 top-0 z-40 border-b ${inverse ? "border-hero-foreground/20" : "border-border bg-background"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand inverse={inverse} />
        <nav className={`hidden items-center gap-8 text-sm font-medium lg:flex ${tone}`} aria-label="Primary navigation">
          <a href="/#localities" className="transition-opacity hover:opacity-65">Localities</a>
          <a href="/#homes" className="transition-opacity hover:opacity-65">Handpicked homes</a>
          <a href="/#insights" className="transition-opacity hover:opacity-65">Market journal</a>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant={inverse ? "ghost" : "secondary"} size="sm" onClick={onLanguage} className={inverse ? "text-hero-foreground hover:bg-hero-foreground/10" : ""} aria-label="Switch language">
            {language === "en" ? "বাংলা" : "English"}
          </Button>
          <Button asChild variant={inverse ? "light" : "primary"} size="sm"><Link to="/property/$slug" params={{ slug: "verandah-residences-new-town" }}>View a home</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className={`lg:hidden ${tone}`} onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open ? (
        <div className="border-t border-border bg-background px-5 py-5 text-foreground lg:hidden">
          <nav className="grid gap-1 text-sm font-medium">
            <a href="/#localities" className="py-3" onClick={() => setOpen(false)}>Localities</a>
            <a href="/#homes" className="py-3" onClick={() => setOpen(false)}>Handpicked homes</a>
            <a href="/#insights" className="py-3" onClick={() => setOpen(false)}>Market journal</a>
            <Button variant="secondary" className="mt-2 justify-between" onClick={onLanguage}>{language === "en" ? "বাংলা" : "English"}<span aria-hidden>↗</span></Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div><Brand inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/70">Curated homes and honest neighbourhood intelligence for Kolkata and West Bengal.</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-widest text-accent">Explore Kolkata</p><div className="mt-4 grid gap-2 text-sm text-primary-foreground/75"><span>New Town & Rajarhat</span><span>Salt Lake & EM Bypass</span><span>Alipore & Ballygunge</span></div></div>
        <div><p className="text-xs font-semibold uppercase tracking-widest text-accent">Know before you buy</p><div className="mt-4 grid gap-2 text-sm text-primary-foreground/75"><span>WBHIRA explained</span><span>Freehold vs co-operative</span><span>Flood-risk guide</span></div></div>
      </div>
      <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/55">© 2026 BariGhor. Demonstration listings for product preview.</div>
    </footer>
  );
}
