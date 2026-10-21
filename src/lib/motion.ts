import { useEffect, useState } from "react";

/**
 * BariGhor Central Motion Token System
 * Strict design rules:
 * - Central config as the ONLY source of durations and easings.
 * - Animate ONLY transform and opacity (no width, height, margin, or layout thrash).
 * - Entry distances stay small: 12–24px (default 20px).
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1) for premium reveals.
 * - Durations: 150–250ms for micro-interactions, 400ms for section reveals, 500ms for route transitions.
 * - Zero spring/bouncy/overshoot effects anywhere.
 */

export const MOTION_DURATIONS = {
  fast: 0.15, // 150ms - hover, focus, press, slider
  base: 0.25, // 250ms - toggles, accordions, card hovers, popovers
  slow: 0.4,  // 400ms - scroll reveals, shared element transitions
  page: 0.5,  // 500ms - route transitions, page cross-fades
  route: 0.3, // 300ms - view transitions
} as const;

export const MOTION_DURATIONS_MS = {
  fast: 150,
  base: 250,
  slow: 400,
  page: 500,
  route: 300,
} as const;

export const MOTION_EASINGS = {
  premium: [0.22, 1, 0.36, 1] as const, // Restrained, calm deceleration curve
  out: [0.16, 1, 0.3, 1] as const,     // Standard entering ease
  in: [0.7, 0, 0.84, 0] as const,      // Standard exiting ease
} as const;

export const MOTION_EASINGS_CSS = {
  premium: "cubic-bezier(0.22, 1, 0.36, 1)",
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  in: "cubic-bezier(0.7, 0, 0.84, 0)",
} as const;

/**
 * Section-type stagger presets (STEP A2)
 * Hard rule: no single stagger chain may exceed ~600ms total.
 */
export const STAGGER_PRESETS_MS = {
  headingGroup: 80, // Section heading + eyebrow + subhead (0ms, 80ms, 80ms)
  sectionHeadingSubhead: 80,
  packageTier: 100, // Package tier cards (3-up): 100ms
  packageTiers: 100,
  cardGrid: 60,     // Add-on / inclusion card grids: 60ms
  addonsGrid: 60,
  portfolio: 120,   // Completed-project cards (2-up): 120ms
  completedProjects: 120,
  processStep: 80,  // Process / lifecycle step cards: 80ms strictly in sequence (01, 02, 03...)
  processSteps: 80,
  faqItem: 50,      // FAQ list items: 50ms
  faqList: 50,
  trustItem: 80,    // Trust strip / stat items: 80ms
  trustStrip: 80,
  footerColumn: 60, // Footer columns: 60ms
  footerColumns: 60,
  maxCumulative: 600, // Cap so the last item never waits noticeably
} as const;

/**
 * Global hook to track user prefers-reduced-motion preference.
 * SSR-safe and reacts immediately if system preferences change.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return prefersReduced;
}

/**
 * Standard Framer-Motion transition presets based on tokens.
 */
export const transitions = {
  micro: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.premium,
  },
  base: {
    duration: MOTION_DURATIONS.base,
    ease: MOTION_EASINGS.premium,
  },
  section: {
    duration: MOTION_DURATIONS.slow,
    ease: MOTION_EASINGS.premium,
  },
  page: {
    duration: MOTION_DURATIONS.page,
    ease: MOTION_EASINGS.premium,
  },
} as const;
