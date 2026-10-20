import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MOTION_DURATIONS_MS,
  MOTION_EASINGS_CSS,
  useReducedMotion,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger index (multiplied by 70ms) */
  index?: number;
  /** Explicit delay in milliseconds */
  delay?: number;
  /** Entry distance in pixels (spec: 12-24px, default: 16px) */
  distance?: number;
}

/**
 * High-performance, IntersectionObserver-based scroll reveal component.
 * - Animates ONLY transform (translateY) and opacity.
 * - Fires ONCE per session. Never re-animates on scroll up.
 * - Visible by default if IntersectionObserver is unsupported or JS fails.
 * - Degrades to instant reveal under prefers-reduced-motion.
 */
export function Reveal({
  children,
  as: Component = "div",
  className = "",
  style,
  index = 0,
  delay,
  distance = 16,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested or in SSR/unsupported environments, show immediately
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
            observer.unobserve(entry.target); // Unobserve immediately: fire ONCE only
          }
        });
      },
      {
        threshold: 0.15, // Trigger when ~15% into viewport
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReduced]);

  const computedDelay = prefersReduced
    ? 0
    : delay !== undefined
    ? delay
    : Math.min(index * 70, 350); // 70ms stagger step, capped at 350ms

  // If not yet hydrated or prefers-reduced-motion, render fully visible without transforms
  if (!mounted || prefersReduced) {
    return (
      <Component ref={ref} className={className} style={style}>
        {children}
      </Component>
    );
  }

  const animationStyle: CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
    transitionProperty: "opacity, transform",
    transitionDuration: `${MOTION_DURATIONS_MS.slow}ms`,
    transitionTimingFunction: MOTION_EASINGS_CSS.premium,
    transitionDelay: `${computedDelay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <Component ref={ref} className={className} style={animationStyle}>
      {children}
    </Component>
  );
}
