import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import {
  MOTION_DURATIONS_MS,
  MOTION_EASINGS_CSS,
  STAGGER_PRESETS_MS,
  useReducedMotion,
} from "@/lib/motion";

// Context for groups to coordinate stagger sequences
interface RevealGroupContextValue {
  isInGroup: boolean;
  staggerMs: number;
  baseDelay: number;
  maxDelay: number;
  order?: "sequential" | "recommended-last";
  getNextDelay: (explicitIndex?: number) => number;
}

const RevealGroupContext = createContext<RevealGroupContextValue>({
  isInGroup: false,
  staggerMs: 80,
  baseDelay: 0,
  maxDelay: STAGGER_PRESETS_MS.maxCumulative,
  getNextDelay: () => 0,
});

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Explicit delay in milliseconds. Overrides group stagger if provided. */
  delay?: number;
  /** Stagger index relative to group or manual sequence */
  index?: number;
  /** Entry distance in pixels (strictly 20px per specification: translateY(20px -> 0)) */
  distance?: number;
}

/**
 * Universal Scroll Reveal Primitive
 * - Base animation: opacity 0 -> 1 and translateY(20px -> 0)
 * - Duration: 400ms, timing: --ease-premium
 * - Trigger: ~15% into viewport
 * - Fires ONCE: never re-animates on scroll-up
 * - Animates ONLY transform and opacity (GPU composited, zero layout thrash)
 * - SSR & reduced-motion safe: renders 100% visible immediately without transforms
 */
export function Reveal({
  children,
  as: Component = "div",
  className = "",
  style,
  delay,
  index,
  distance = 20,
  ...restProps
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();
  const group = useContext(RevealGroupContext);

  // Calculate delay based on explicit prop, group sequence, or fallback
  const calculatedDelay = React.useMemo(() => {
    if (prefersReduced) return 0;
    if (delay !== undefined) return delay;
    if (group.isInGroup) {
      return group.getNextDelay(index);
    }
    if (index !== undefined) {
      return Math.min(index * 80, STAGGER_PRESETS_MS.maxCumulative);
    }
    return 0;
  }, [delay, index, group, prefersReduced]);

  useEffect(() => {
    // If reduced-motion is active or IntersectionObserver is unavailable, display immediately
    if (prefersReduced || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setMounted(true);
      setIsVisible(true);
      return;
    }

    setMounted(true);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Strict rule: Fire ONCE only. Never replay when scrolling back up.
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.15, // Trigger when ~15% into viewport
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReduced]);

  // Before hydration or when reduced-motion is requested, render standard static markup
  if (!mounted || prefersReduced) {
    return (
      <Component ref={ref} className={className} style={style} {...restProps}>
        {children}
      </Component>
    );
  }

  const animationStyle: CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
    transitionProperty: "opacity, transform",
    transitionDuration: `${MOTION_DURATIONS_MS.slow}ms`, // 400ms
    transitionTimingFunction: MOTION_EASINGS_CSS.premium,
    transitionDelay: `${calculatedDelay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <Component ref={ref} className={className} style={animationStyle} {...restProps}>
      {children}
    </Component>
  );
}

export interface RevealGroupProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger interval in milliseconds between children */
  staggerMs?: number;
  /** Base delay before the first child starts revealing */
  baseDelay?: number;
  /** Maximum cumulative delay cap (hard rule: ~600ms) */
  maxDelay?: number;
  /** Special ordering, e.g. "recommended-last" for 3-tier cards where middle settles last */
  order?: "sequential" | "recommended-last";
}

/**
 * Sibling Stagger Coordination Primitive
 * Coordinates automatic stagger timing across child <Reveal> elements.
 * Enforces hard rule: maximum total stagger delay cap of ~600ms.
 */
export function RevealGroup({
  children,
  as: Component = "div",
  className = "",
  style,
  staggerMs = 80,
  baseDelay = 0,
  maxDelay = STAGGER_PRESETS_MS.maxCumulative,
  order = "sequential",
  ...restProps
}: RevealGroupProps) {
  const counterRef = useRef(0);

  // Reset item counter on each render pass
  counterRef.current = 0;

  const getNextDelay = (explicitIndex?: number) => {
    const itemIndex = explicitIndex !== undefined ? explicitIndex : counterRef.current++;
    
    if (order === "recommended-last") {
      // 3-up tier cards: 0 (left) -> 0ms, 2 (right) -> 100ms, 1 (recommended middle) -> 200ms
      let mappedIndex = itemIndex;
      if (itemIndex === 1) mappedIndex = 2; // middle card gets last delay
      else if (itemIndex === 2) mappedIndex = 1; // right card gets middle delay
      
      const computed = baseDelay + mappedIndex * staggerMs;
      return Math.min(computed, maxDelay);
    }

    const computed = baseDelay + itemIndex * staggerMs;
    return Math.min(computed, maxDelay);
  };

  const contextValue: RevealGroupContextValue = {
    isInGroup: true,
    staggerMs,
    baseDelay,
    maxDelay,
    order,
    getNextDelay,
  };

  return (
    <RevealGroupContext.Provider value={contextValue}>
      <Component className={className} style={style} {...restProps}>
        {children}
      </Component>
    </RevealGroupContext.Provider>
  );
}
