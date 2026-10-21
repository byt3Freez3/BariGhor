import * as React from "react";

export interface VideoBackdropProps {
  /**
   * Path to the poster fallback image (exact 1st frame of video loop).
   * @default "/video/hero-poster.jpg"
   */
  posterSrc?: string;
  /**
   * Path to H.264 MP4 video.
   * @default "/video/hero-loop.mp4"
   */
  mp4Src?: string;
  /**
   * Path to VP9 WebM video.
   * @default "/video/hero-loop.webm"
   */
  webmSrc?: string;
  /**
   * Flat wash opacity (0 to 1). Default 0.72.
   * @default 0.72
   */
  overlayOpacity?: number;
  /**
   * Optional wrapper class name.
   */
  className?: string;
}

/**
 * High-performance, accessible looping video backdrop ("live wallpaper")
 * for BariGhor architectural hero sections.
 *
 * Performance Gates:
 * 1. preload="none" — never delays first paint or LCP.
 * 2. Does NOT load video when:
 *    - prefers-reduced-motion: reduce
 *    - navigator.connection.saveData === true
 *    - navigator.connection.effectiveType in ['2g', 'slow-2g']
 *    - viewport width < 768px (mobile displays poster image only)
 * 3. Auto-pauses on scroll-out (IntersectionObserver) & tab visibility hidden.
 * 4. Fades poster -> video over 600ms on `canplaythrough` with zero layout shift.
 */
export function VideoBackdrop({
  posterSrc = "/video/hero-poster.jpg",
  mp4Src = "/video/hero-loop.mp4",
  webmSrc = "/video/hero-loop.webm",
  overlayOpacity = 0.72,
  className = "",
}: VideoBackdropProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const isInViewRef = React.useRef(true);

  // 1. Performance gating check after initial paint
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Check Data Saver / slow network
    const navConn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    if (navConn?.saveData === true) return;
    if (navConn?.effectiveType === "2g" || navConn?.effectiveType === "slow-2g") return;

    // Gate out mobile viewport (< 768px) to prevent Android/iOS mobile data and battery drain
    const isMobile = window.innerWidth < 768 || window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    // Trigger video load during idle time after initial paint so LCP is not delayed
    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => number }).requestIdleCallback(cb, { timeout: 1200 })
        : (cb: () => void) => setTimeout(cb, 100);

    const timer = schedule(() => {
      setShouldLoadVideo(true);
    });

    return () => {
      if (typeof timer === "number") clearTimeout(timer);
    };
  }, []);

  // 2. Explicitly trigger load when video is permitted to mount
  React.useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.setAttribute("muted", "");
      videoRef.current.load();
    }
  }, [shouldLoadVideo]);

  // 3. IntersectionObserver: pause video when scrolled out of view, resume on return
  React.useEffect(() => {
    if (!shouldLoadVideo || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          if (!document.hidden && video.paused) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  // 4. Page Visibility API: pause when document hidden, resume when visible
  React.useEffect(() => {
    if (!shouldLoadVideo) return;

    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        if (!video.paused) video.pause();
      } else if (isInViewRef.current) {
        if (video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shouldLoadVideo]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Real <img> poster layer (renders behind video, maintains perfect 0 CLS) */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        width={1280}
        height={720}
        loading="eager"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />

      {/* 2. Seamless looping video element (conditionally loaded after gates pass) */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          width={1280}
          height={720}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onLoadedData={() => {
            // Instant readiness check if browser had cached it
            if (videoRef.current && videoRef.current.readyState >= 3) {
              setIsVideoLoaded(true);
            }
          }}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[600ms] ease-out pointer-events-none ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* 3. Legibility Overlays */}
      {/* a) Base wash: preserves brand teal foundation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(10, 54, 50, ${Math.min(overlayOpacity, 0.45)})` }}
        aria-hidden="true"
      />

      {/* b) Directional gradient: 0.90 on left/bottom (calm text column) fading to 0.18 on right (lively motion) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 54, 50, 0.90) 0%, rgba(10, 54, 50, 0.72) 48%, rgba(10, 54, 50, 0.18) 100%), linear-gradient(to top, rgba(10, 54, 50, 0.85) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* c) Restrained architectural grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
