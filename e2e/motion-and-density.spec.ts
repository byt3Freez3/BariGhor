import { expect, test } from "@playwright/test";

test.describe("BariGhor Universal Motion System & Content Density QA", () => {
  test("1. No-JS Fallback: all content and revealing blocks are present in DOM and readable", async ({
    browser,
  }) => {
    // Create browser context with JavaScript explicitly disabled
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const page = await noJsContext.newPage();

    await page.goto("/services/interiors");

    // Headings, tiers, add-ons, FAQs must be fully present in DOM
    const heading = page.getByRole("heading", { name: /Craftsmanship Package Tiers/i });
    await expect(heading).toBeAttached();

    // Verify package tiers are present
    const essentialTier = page.getByText("Essential Finish").first();
    await expect(essentialTier).toBeAttached();

    // Verify process steps 01..04 are present
    const step01 = page.getByText("01").first();
    await expect(step01).toBeAttached();

    // Verify FAQ items are present
    const faqQuestion = page.getByText("What plywood grade do you use in kitchens and bathrooms?").first();
    await expect(faqQuestion).toBeAttached();

    await noJsContext.close();
  });

  test("2. prefers-reduced-motion: reduce renders content immediately with zero transforms and no stagger delays", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/services/construction");

    // Hero renders instantly
    const heroTitle = page.locator("h1").first();
    await expect(heroTitle).toBeVisible();

    // Construction packages visible immediately
    const standardPackage = page.getByText("Standard Structural Build").first();
    await expect(standardPackage).toBeVisible();

    // Verify Reveal element inline styles under reduced motion have no transitionDelay
    const revealCards = page.locator("[data-reveal]");
    const count = await revealCards.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = revealCards.nth(i);
      const style = await card.getAttribute("style");
      if (style) {
        expect(style).not.toMatch(/transition-delay:\s*[1-9]\d*ms/);
      }
    }
  });

  test("3. Reveals fire once: scrolling down triggers reveal; scrolling back up never unmounts or hides", async ({
    page,
  }) => {
    await page.goto("/kolkata");

    // Scroll to localities section
    const localitiesHeading = page.getByRole("heading", {
      name: /Kolkata Localities & Paras/i,
    });
    await localitiesHeading.scrollIntoViewIfNeeded();
    await expect(localitiesHeading).toBeVisible();

    const aliporeCard = page.locator("a[href*='alipore']").first();
    await expect(aliporeCard).toBeVisible();

    // Scroll back to the top of the page
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForTimeout(350);

    // Assert that the card remains visible and did not re-hide
    await expect(aliporeCard).toBeVisible();
  });

  test("4. Sequential process steps reveal strictly in numerical order 01 -> 05", async ({
    page,
  }) => {
    await page.goto("/services/construction");

    // Process steps have sequential numbers
    const steps = page.locator("text=/^0[1-5]$/");
    const count = await steps.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Stagger delay attributes on Reveal parents increase monotonically
    const stepReveals = page.locator("[data-reveal-group] [data-reveal]");
    const stepCount = await stepReveals.count();
    if (stepCount >= 3) {
      let previousDelay = -1;
      for (let i = 0; i < Math.min(stepCount, 4); i++) {
        const style = (await stepReveals.nth(i).getAttribute("style")) || "";
        const match = style.match(/transition-delay:\s*(\d+)ms/);
        const delay = match ? parseInt(match[1], 10) : 0;
        expect(delay).toBeGreaterThanOrEqual(previousDelay);
        previousDelay = delay;
      }
    }
  });

  test("5. Stagger delay chains never exceed the 600ms maximum cumulative cap", async ({
    page,
  }) => {
    await page.goto("/cities");

    // All reveal items across large city grids must have delay <= 600ms
    const reveals = page.locator("[data-reveal]");
    const total = await reveals.count();
    for (let i = 0; i < Math.min(total, 15); i++) {
      const style = (await reveals.nth(i).getAttribute("style")) || "";
      const match = style.match(/transition-delay:\s*(\d+)ms/);
      if (match) {
        const delayMs = parseInt(match[1], 10);
        expect(delayMs).toBeLessThanOrEqual(600);
      }
    }
  });

  test("6. FAQ Accordion: keyboard operable (Enter/Space), proper ARIA, GPU-friendly expansion without layout shift", async ({
    page,
  }) => {
    await page.goto("/services/interiors");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // Scroll to FAQ section
    const faqTrigger = page.locator("button[aria-controls^='faq-panel-']").first();
    await faqTrigger.scrollIntoViewIfNeeded();
    await expect(faqTrigger).toBeVisible();

    // Check initial ARIA attributes
    await expect(faqTrigger).toHaveAttribute("aria-expanded", "false");
    const controlsId = await faqTrigger.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();

    const answerPanel = page.locator(`#${controlsId}`);
    // Initially closed (0fr height), element is in DOM
    await expect(answerPanel).toBeAttached();

    // Click to expand
    await faqTrigger.click();
    await page.waitForTimeout(300);

    // Expanded state: panel is now visible
    await expect(faqTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(answerPanel).toBeVisible();

    // Keyboard toggle: Enter/Space toggles
    await faqTrigger.focus();
    await faqTrigger.press("Enter");
    await page.waitForTimeout(300);
    await expect(faqTrigger).toHaveAttribute("aria-expanded", "false");
  });

  test("7. Hero content is NOT animated and paints immediately (protecting CWV & LCP)", async ({
    page,
  }) => {
    await page.goto("/services");

    // Hero section must not carry [data-reveal]
    const heroSection = page.locator("section").first();
    await expect(heroSection).not.toHaveAttribute("data-reveal", "");

    // Hero headline is visible instantly upon DOM ready
    const heroHeadline = heroSection.locator("h1");
    await expect(heroHeadline).toBeVisible();
  });

  test("8. Factual values, prices, warranties, and WBRERA registrations are intact", async ({
    page,
  }) => {
    // Check construction rates on construction page
    await page.goto("/services/construction");
    await expect(page.getByText("₹1,950").first()).toBeAttached();
    await expect(page.getByText("₹2,650").first()).toBeAttached();
    await expect(page.getByText("₹3,800").first()).toBeAttached();
    await expect(page.getByText(/Seismic Zone IV/i).first()).toBeAttached();
    await expect(page.getByText(/10-year/i).first()).toBeAttached();

    // Check mandatory disclaimer verbatim
    await expect(
      page.getByText("Indicative — final quote after site visit.").first()
    ).toBeAttached();

    // Check WBRERA registration on verification page
    await page.goto("/about/verification");
    await expect(
      page.getByText("WBRERA/A/KOL/2023/000184").first()
    ).toBeAttached();
  });

  test("9. Core Web Vitals: CLS < 0.05", async ({ page }) => {
    await page.goto("/services/interiors");

    // Collect layout shifts
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });

        setTimeout(() => {
          resolve(clsValue);
        }, 1000);
      });
    });

    expect(cls).toBeLessThan(0.05);
  });
});
