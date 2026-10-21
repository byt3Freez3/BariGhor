import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealGroup } from "./reveal";
import { useReducedMotion } from "@/lib/motion";

export interface FaqItem {
  q: string;
  a: string | React.ReactNode;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
  /** Allow multiple items open simultaneously (default: true) */
  allowMultiple?: boolean;
}

/**
 * GPU-Friendly Accordion Component (STEP A4)
 * - Height transition driven by grid-template-rows: 0fr -> 1fr (never animates height, zero layout thrashing)
 * - 250ms duration, --ease-premium
 * - Chevron rotates 180deg over 250ms
 * - Internal answer content fades in with a 50ms offset
 * - Full WAI-ARIA keyboard accessibility (Enter/Space toggle, aria-expanded, aria-controls)
 * - Staggered entrance via RevealGroup (50ms stagger per item)
 */
export function FaqAccordion({
  items,
  className = "",
  allowMultiple = true,
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const prefersReduced = useReducedMotion();

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return allowMultiple ? [...prev, index] : [index];
    });
  };

  return (
    <RevealGroup staggerMs={50} className={`space-y-4 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        const headingId = `faq-trigger-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <Reveal key={idx} index={idx} as="div">
            <div className="rounded-xs border border-border bg-card shadow-xs transition-[box-shadow,border-color] duration-base ease-premium hover:border-accent/40">
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xs"
              >
                <span className="font-display text-base font-bold text-foreground pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform duration-base ease-premium ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: prefersReduced
                    ? "none"
                    : "grid-template-rows var(--duration-base) var(--ease-premium)",
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transition: prefersReduced
                        ? "none"
                        : "opacity var(--duration-base) var(--ease-premium) 50ms",
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </RevealGroup>
  );
}
