import { useEffect, useState } from "react";
import { ChevronDown, MessageCircle, Sparkles, X } from "lucide-react";
import type { Property } from "@/lib/data";
import {
  getServicePackages,
  getServiceTypeForCategory,
  getDiscoveryCopy,
  INDICATIVE_PRICE_DISCLAIMER,
} from "@/data/services";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

interface PropertyDiscoveryProps {
  property: Property;
}

/**
 * c) IN-FLOW TEASER:
 * Thin editorial strip placed immediately after the property description.
 */
export function InFlowTeaser({ property }: { property: Property }) {
  const { language } = useAppStore();
  const isBn = language === "bn";
  const serviceType = getServiceTypeForCategory(property.propertyCategory);
  const isConstruction = serviceType === "construction";
  const copy = getDiscoveryCopy(serviceType);

  const scrollToConfigurator = () => {
    const el = document.getElementById("configurator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="my-6 rounded-xs border border-accent/25 bg-accent/5 p-4 sm:p-5 transition-colors hover:bg-accent/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-xs bg-[#0A3632] text-[#E5B869]">
            <Sparkles className="size-4" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-foreground sm:text-base">
              {copy.teaserHeadline}
            </p>
            {isBn && (
              <p className="text-xs text-muted-foreground mt-0.5" lang="bn">
                {copy.teaserHeadlineBn}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToConfigurator}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xs bg-[#0A3632] px-3.5 py-2 text-xs font-semibold text-[#F9F7F1] shadow-xs transition-colors hover:bg-[#124B45] focus-visible:ring-2 focus-visible:ring-accent shrink-0 cursor-pointer"
        >
          <span>{copy.teaserCta}</span>
          <span aria-hidden="true">↓</span>
        </button>
      </div>
    </div>
  );
}

/**
 * b) SCROLL-AWARE NUDGE:
 * If user has not scrolled past 200px after 4 seconds, a small chevron + one-line
 * label fades in (NO bounce, NO loop — gentle 8px fade-up, once).
 * Disappears permanently on first scroll. Shows at most once per session.
 * Never shows under prefers-reduced-motion. Dismissible.
 */
export function ScrollAwareNudge({ property }: { property: Property }) {
  const [visible, setVisible] = useState(false);
  const serviceType = getServiceTypeForCategory(property.propertyCategory);
  const copy = getDiscoveryCopy(serviceType);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // 2. Check sessionStorage
    try {
      const alreadyShown = sessionStorage.getItem("barighor_scroll_nudge_shown");
      if (alreadyShown === "true") return;
    } catch {
      return;
    }

    // 3. Set timer for 4 seconds
    const timer = setTimeout(() => {
      // If user hasn't scrolled past 200px, show nudge
      if (window.scrollY < 200) {
        setVisible(true);
        try {
          sessionStorage.setItem("barighor_scroll_nudge_shown", "true");
        } catch {}
      }
    }, 4000);

    // 4. Scroll listener: disappears permanently on first scroll past 200px (or any active scroll)
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  const scrollToConfigurator = () => {
    setVisible(false);
    document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Discovery hint"
      className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 w-[90%] max-w-sm transition-opacity duration-base ease-premium animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-[#D4A373]/40 bg-[#0A3632]/95 px-4 py-2.5 text-xs text-[#F9F7F1] shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={scrollToConfigurator}
          className="flex items-center gap-2 text-left cursor-pointer hover:text-[#E5B869] transition-colors flex-1"
        >
          <ChevronDown className="size-4 shrink-0 text-[#E5B869]" />
          <span className="font-sans font-medium text-xs leading-tight">
            {copy.nudgeLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="p-1 text-[#C2D1CF] hover:text-white transition-colors cursor-pointer rounded-full"
          aria-label="Dismiss discovery hint"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </aside>
  );
}

/**
 * a) STICKY BOTTOM BAR (Primary mechanism):
 * Slim, always present. Managed in one unified cluster with WhatsApp so
 * they NEVER collide at any viewport width.
 */
export function StickyDiscoveryBar({ property }: PropertyDiscoveryProps) {
  const serviceType = getServiceTypeForCategory(property.propertyCategory);
  const isConstruction = serviceType === "construction";
  const packages = getServicePackages(serviceType);
  const startingRate = packages[0]?.indicativePricePerSqft || (isConstruction ? 1950 : 1250);
  const copy = getDiscoveryCopy(serviceType);

  const scrollToConfigurator = () => {
    document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
  };

  const waUrl = `https://wa.me/919073599355?text=${encodeURIComponent(
    `Hi BariGhor, I am interested in ${property.title} in ${property.locality}. Reference: ${property.id}`
  )}`;

  return (
    <div
      aria-label="Property Action Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A3632]/95 text-[#F9F7F1] border-t border-[#164D47] shadow-2xl backdrop-blur-md py-3 px-4 sm:px-6 safe-bottom transition-transform duration-base"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-6">
        {/* Left: Headline & Starting Rate (Click scrolls to configurator) */}
        <button
          type="button"
          onClick={scrollToConfigurator}
          className="flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer group flex-1 min-w-0"
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-xs bg-[#124B45] text-[#E5B869] group-hover:bg-[#1A5E57] transition-colors">
            <Sparkles className="size-4" />
          </div>

          <div className="truncate">
            <p className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-[#E5B869] transition-colors truncate">
              {copy.stickyHeadline(startingRate)}
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono text-[#D4A373]/80 truncate">
              {INDICATIVE_PRICE_DISCLAIMER}
            </p>
          </div>
        </button>

        {/* Right: Integrated WhatsApp Action (Eliminates floating FAB collision) */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            onClick={scrollToConfigurator}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex border-[#236860] bg-transparent text-[#F9F7F1] hover:bg-[#0E4944] text-xs font-semibold rounded-xs"
          >
            Configure
          </Button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xs bg-[#25D366] px-3.5 py-2 sm:px-4 sm:py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#128C7E] focus-visible:ring-2 focus-visible:ring-white shrink-0"
            aria-label="WhatsApp enquiry for this property"
          >
            <MessageCircle className="size-3.5 sm:size-4 fill-white" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
