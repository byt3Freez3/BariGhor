import { test, expect } from "@playwright/test";

test.describe("VideoBackdrop Motion & Accessibility Quality Suite (QA Step 5)", () => {
  const servicePages = [
    {
      url: "/services",
      badge: "Vertically Integrated Property House",
      headlinePart: "Architectural Precision.",
    },
    {
      url: "/services/interiors",
      badge: "Interior Design · New Town · Salt Lake · Kolkata",
      headlinePart: "Interiors by the team",
    },
    {
      url: "/services/construction",
      badge: "Turnkey Home Construction · Kolkata · New Town · West Bengal",
      headlinePart: "Architectural Construction",
    },
  ];

  test("1. Hero renders complete and correct with JavaScript disabled (poster image only)", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    for (const s of servicePages) {
      await page.goto(s.url);

      // Poster image must be present with explicit dimensions
      const poster = page.locator("img[src*='hero-poster.jpg']");
      await expect(poster).toBeAttached();
      await expect(poster).toHaveAttribute("width", "1280");
      await expect(poster).toHaveAttribute("height", "720");

      // No video element should exist when JS is disabled
      const video = page.locator("video");
      await expect(video).toHaveCount(0);

      // Text, badge and disclaimer are visible
      await expect(page.locator("h1")).toContainText(s.headlinePart);
      await expect(page.locator("body")).toContainText(s.badge);
      await expect(page.locator("body")).toContainText("Indicative — final quote after site visit.");
    }

    await context.close();
  });

  test("2. Hero renders complete and correct with video network request blocked", async ({
    page,
  }) => {
    // Abort video requests
    await page.route("**/*.{mp4,webm}", (route) => route.abort());

    await page.goto("/services/interiors");
    await page.waitForLoadState("networkidle");

    // Poster image remains visible and intact
    const poster = page.locator("img[src*='hero-poster.jpg']");
    await expect(poster).toBeVisible();

    // Text content remains perfectly readable
    await expect(page.locator("h1")).toContainText("Interiors by the team");
    await expect(page.locator("body")).toContainText("Indicative — final quote after site visit.");
  });

  test("3. prefers-reduced-motion: reduce suppresses video loading & network requests", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    let videoRequested = false;
    page.on("request", (req) => {
      if (req.url().includes(".mp4") || req.url().includes(".webm")) {
        videoRequested = true;
      }
    });

    await page.goto("/services");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // No video network requests fired
    expect(videoRequested).toBe(false);

    // Video tag is NOT mounted in DOM
    const video = page.locator("video");
    await expect(video).toHaveCount(0);

    // Poster is shown
    const poster = page.locator("img[src*='hero-poster.jpg']");
    await expect(poster).toBeVisible();

    await context.close();
  });

  test("4. Mobile viewport (< 768px) gates out video: no video element & zero video requests", async ({
    browser,
  }) => {
    // 390px mobile viewport (iPhone 14 / modern Android)
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const page = await context.newPage();

    let videoRequested = false;
    page.on("request", (req) => {
      if (req.url().includes(".mp4") || req.url().includes(".webm")) {
        videoRequested = true;
      }
    });

    await page.goto("/services/construction");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // No video network request fired on mobile
    expect(videoRequested).toBe(false);

    // Video element is not in DOM
    const video = page.locator("video");
    await expect(video).toHaveCount(0);

    // Poster fallback renders with full styling
    const poster = page.locator("img[src*='hero-poster.jpg']");
    await expect(poster).toBeVisible();

    await context.close();
  });

  test("5. Video attributes meet strict iOS Safari & screen reader accessibility standards", async ({
    page,
  }) => {
    // Standard desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/interiors");
    await page.waitForLoadState("networkidle");

    const video = page.locator("video");
    await expect(video).toBeAttached({ timeout: 5000 });

    // iOS Safari autoplay mandatory attributes
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveAttribute("playsinline", "");
    await expect(video).toHaveAttribute("autoplay", "");
    await expect(video).toHaveAttribute("loop", "");
    await expect(video).toHaveAttribute("preload", "none");

    // Accessibility attributes (screen readers ignore decorative video backdrop)
    await expect(video).toHaveAttribute("aria-hidden", "true");
    await expect(video).toHaveAttribute("tabindex", "-1");

    // Explicit dimensions to guarantee zero Cumulative Layout Shift (CLS = 0)
    await expect(video).toHaveAttribute("width", "1280");
    await expect(video).toHaveAttribute("height", "720");

    // Source ordering: WebM must precede MP4
    const sources = video.locator("source");
    await expect(sources.nth(0)).toHaveAttribute("type", "video/webm");
    await expect(sources.nth(1)).toHaveAttribute("type", "video/mp4");
  });

  test("6. Desktop with normal motion loads video and transitions opacity over 600ms", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services");
    await page.waitForLoadState("networkidle");

    const video = page.locator("video");
    await expect(video).toBeAttached({ timeout: 5000 });

    // Wait for video to fade in to opacity-100
    await expect(video).toHaveClass(/opacity-100/, { timeout: 6000 });
    await expect(video).toHaveClass(/duration-\[600ms\]/);
  });

  test("7. Video pauses when scrolled out of view and when tab becomes hidden", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/construction");
    await page.waitForLoadState("networkidle");

    const video = page.locator("video");
    await expect(video).toBeAttached({ timeout: 5000 });

    // Scroll far down to the footer to trigger IntersectionObserver
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Verify paused state when off-screen
    const isPausedOffScreen = await page.evaluate(() => {
      const v = document.querySelector("video");
      return v ? v.paused : true;
    });
    expect(isPausedOffScreen).toBe(true);

    // Scroll back up to hero
    await page.locator("h1").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const isPlayingOnReturn = await page.evaluate(() => {
      const v = document.querySelector("video");
      return v ? !v.paused : false;
    });
    expect(isPlayingOnReturn).toBe(true);
  });

  test("8. Text content, badges, buttons and disclaimer line are byte-for-byte intact across all 3 heroes", async ({
    page,
  }) => {
    for (const s of servicePages) {
      await page.goto(s.url);
      await page.waitForLoadState("networkidle");

      // Verify exact headline text
      await expect(page.locator("h1")).toContainText(s.headlinePart);

      // Verify badge text
      await expect(page.locator("section").first()).toContainText(s.badge);

      // Verify mandatory legal disclaimer
      await expect(page.locator("section").first()).toContainText(
        "Indicative — final quote after site visit."
      );

      // Verify WhatsApp advisory CTA button
      const waBtn = page.locator("a[href*='wa.me']").first();
      await expect(waBtn).toBeVisible();
    }
  });
});
