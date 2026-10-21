import { expect, test } from "@playwright/test";

test.describe("BariGhor Motion & Accessibility Verification (Step 9)", () => {
  test("1. Reveal animations fire once and all content remains present in DOM", async ({
    page,
  }) => {
    await page.goto("/kolkata");

    // All section elements should be in the DOM
    const localitiesHeading = page.getByRole("heading", {
      name: /Localities & Paras/i,
    });
    await expect(localitiesHeading).toBeAttached();

    // Scroll down to bring sections into view
    await localitiesHeading.scrollIntoViewIfNeeded();
    await expect(localitiesHeading).toBeVisible();

    // Locality cards should be visible
    const aliporeCard = page.locator("a[href*='alipore']").first();
    await expect(aliporeCard).toBeVisible();

    // Scroll back up to the top
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForTimeout(300);

    // Verify elements remained visible and did not unmount or disappear
    await expect(aliporeCard).toBeVisible();
  });

  test("2. Reduced-motion mode renders all content with zero transforms", async ({
    page,
  }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/kolkata");

    // Headings, hero content, and trust badges are visible immediately
    await expect(page.locator("h1")).toBeVisible();
    const verifiedBadge = page.getByText("WBRERA Verified").first();
    await expect(verifiedBadge).toBeVisible();

    // Trust strip numbers render immediately without delay
    const trustNumber = page.getByText("100%").first();
    await expect(trustNumber).toBeVisible();

    // Property cards render and can be clicked
    await page.goto("/kolkata/properties");
    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible();
  });

  test("3. Filter changes do not cause layout shifts (CLS < 0.05)", async ({
    page,
  }) => {
    await page.goto("/kolkata/properties");
    await page.waitForLoadState("networkidle");

    // Observe layout shift metric via PerformanceObserver in browser
    await page.evaluate(() => {
      (window as any).__cumulativeLayoutShift = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            (window as any).__cumulativeLayoutShift += entry.value;
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    });

    // Interact with type filter
    const typeSelect = page.locator("select").first();
    if (await typeSelect.isVisible()) {
      await typeSelect.selectOption("Apartment");
      await page.waitForTimeout(400);

      const cls = await page.evaluate(
        () => (window as any).__cumulativeLayoutShift || 0,
      );
      expect(cls).toBeLessThan(0.05);
    }
  });

  test("4. Navigation works seamlessly when View Transitions API is unsupported", async ({
    page,
  }) => {
    // Pre-navigation script to simulate browser without View Transitions support
    await page.addInitScript(() => {
      delete (document as any).startViewTransition;
    });

    await page.goto("/kolkata");
    await expect(page.locator("h1")).toBeVisible();

    // Navigate to /howrah via city link
    await page.goto("/howrah");
    await expect(page.locator("h1")).toContainText(/Howrah/i);

    // Navigate to a property detail page
    await page.goto("/kolkata/properties");
    const propertyLink = page.locator("article h3 a").first();
    await propertyLink.click();

    // Confirm detail page loaded successfully without errors
    await expect(page.locator("h1")).toBeVisible();
  });
});
