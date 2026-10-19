import { useEffect, useState } from "react";

/**
 * BariGhor Central Motion Token System
 * Strict design rules:
 * - Animate ONLY transform and opacity.
 * - Entry distances stay small: 12–24px.
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1) for premium reveals.
 * - Durations: 150–250ms for micro-interactions, 300–500ms for sections/pages.
 * - Zero spring/bouncy/overshoot effects.
 */

export const MOTION_DURATIONS = {
  fast: 0.15, // 150ms - micro-interactions, button presses, focus rings
  base: 0.25, // 250ms - card hovers, popovers, dropdowns
  slow: 0.4,  // 400ms - section reveals, shared element transitions
  page: 0.5,  // 500ms - view transitions, page cross-fades
} as const;

export const MOTION_DURATIONS_MS = {
  fast: 150,
  base: 250,
  slow: 400,
  page: 500,
} as const;

export const MOTION_EASINGS = {
  premium: [0.22, 1, 0.36, 1] as const, // Calm, restrained deceleration curve
  out: [0.16, 1, 0.3, 1] as const,     // Standard entering ease
  in: [0.7, 0, 0.84, 0] as const,      // Standard exiting ease
} as const;

export const MOTION_EASINGS_CSS = {
  premium: "cubic-bezier(0.22, 1, 0.36, 1)",
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  in: "cubic-bezier(0.7, 0, 0.84, 0)",
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
