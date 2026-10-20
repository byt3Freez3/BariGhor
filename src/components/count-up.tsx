import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

interface CountUpProps {
  value: string | number;
  duration?: number;
  className?: string;
}

/**
 * CountUp Component
 * - Counts up numeric stats over 1200ms with ease-out when scrolled into view.
 * - Fires ONCE only per session.
 * - Skips entirely under prefers-reduced-motion: reduce (instant value).
 * - Safe for strings containing prefixes/suffixes (e.g. "100%", "143", "12 min").
 */
export function CountUp({ value, duration = 1200, className = "" }: CountUpProps) {
  const prefersReduced = useReducedMotion();
  const rawStr = String(value);
  const [displayValue, setDisplayValue] = useState<string>(rawStr);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setDisplayValue(rawStr);
      return;
    }

    const match = rawStr.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(rawStr);
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3] || "";

    const node = ref.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);

            const startTime = performance.now();

            const frame = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic curve
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(targetNumber * easeOut);

              setDisplayValue(`${prefix}${current}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(frame);
              } else {
                setDisplayValue(rawStr);
              }
            };

            requestAnimationFrame(frame);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rawStr, duration, prefersReduced, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
