import React from "react";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  inverse?: boolean;
}

/**
 * Section Heading with Standard Top-Down Unit Reveal (STEP A2)
 * Stagger sequence:
 * - Eyebrow: 0ms
 * - Title: 80ms
 * - Subhead / Description: 160ms (80ms after title)
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  titleClassName = "",
  inverse = false,
}: SectionHeadingProps) {
  const alignmentClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  return (
    <div className={`max-w-3xl ${alignmentClass} ${className}`}>
      {eyebrow && (
        <Reveal delay={0} as="p">
          <span
            className={`inline-block text-xs font-bold uppercase tracking-[0.2em] ${
              inverse ? "text-accent-foreground" : "text-accent"
            }`}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={eyebrow ? 80 : 0} as="h2">
        <span
          className={`block font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
            eyebrow ? "mt-2" : ""
          } ${inverse ? "text-white" : "text-foreground"} ${titleClassName}`}
        >
          {title}
        </span>
      </Reveal>

      {description && (
        <Reveal delay={eyebrow ? 160 : 80} as="p">
          <span
            className={`block mt-3 text-sm sm:text-base leading-relaxed max-w-prose ${
              align === "center" ? "mx-auto" : ""
            } ${inverse ? "text-[#C2D1CF]" : "text-muted-foreground"}`}
          >
            {description}
          </span>
        </Reveal>
      )}
    </div>
  );
}
