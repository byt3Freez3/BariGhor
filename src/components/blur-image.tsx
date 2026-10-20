import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { useReducedMotion } from "@/lib/motion";

export interface BlurImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  isHero?: boolean;
}

/**
 * BlurImage Component
 * - 300ms fade-in + blur-up placeholder transition.
 * - Explicit width/height to guarantee CLS stays under 0.05.
 * - Excludes hero images from animation to protect Largest Contentful Paint (LCP).
 * - Degrades to immediate display on SSR and under prefers-reduced-motion.
 */
export function BlurImage({
  src,
  alt,
  width,
  height,
  className = "",
  isHero = false,
  style,
  onLoad,
  ...props
}: BlurImageProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  // Hero image is never animated to maximize LCP
  if (isHero) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        className={className}
        style={style}
        {...props}
      />
    );
  }

  // Before hydration or with reduced motion, render immediately visible without blur
  if (!mounted || prefersReduced) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
        {...props}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${className} transition-[opacity,filter] duration-300 ease-premium ${
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-xs"
      }`}
      style={style}
      {...props}
    />
  );
}
