import { expect, test } from "@playwright/test";

test.describe("Step 1-4: Sparse Grids, Availability Lifecycle, Market Benchmarks & QA", () => {
  test("1. Curated Residences & Localities render exactly 6 cards across responsive breakpoints without orphans", async ({
    page,
  }) => {
    // 1a: Desktop viewport (>= 1024px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/kolkata");

    // Curated Kolkata Residences
    const residencesSection = page.locator("section#curated-results");
    await expect(residencesSection).toBeVisible();

    const residenceCards = residencesSection.locator("article");
    await expect(residenceCards).toHaveCount(6);

    // Verify grid class for 3-col on desktop, 2-col on tablet, 1-col on mobile
    const residenceGrid = residencesSection.locator(".grid").first();
    await expect(residenceGrid).toHaveClass(/lg:grid-cols-3/);
    await expect(residenceGrid).toHaveClass(/sm:grid-cols-2/);

    // Kolkata Localities & Paras
    const localitiesSection = page.locator("section#localities-dossier");
    await expect(localitiesSection).toBeVisible();

    const localityCards = localitiesSection.locator(".grid > div, .grid > a");
    await expect(localityCards).toHaveCount(6);

    // 1b: Tablet viewport (640px - 1023px) -> 2 columns (3 clean rows of 2, 0 orphans)
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(residenceCards).toHaveCount(6);
    await expect(localityCards).toHaveCount(6);

    // 1c: Mobile viewport (< 640px) -> 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(residenceCards).toHaveCount(6);
    await expect(localityCards).toHaveCount(6);
  });

  test("2. Availability status chips, image desaturation, and units remaining", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // Go to search / listing with hideSold=false to view sold properties
    await page.goto("/kolkata/properties?hideSold=false");

    // Check multi-unit project remaining count (e.g. "4 of 12 units remaining" or "4 of 24")
    const remainingChip = page.getByText(/units remaining/i).first();
    await expect(remainingChip).toBeVisible();

    // Check sold property card
    const soldChip = page.getByText("Sold").first();
    await expect(soldChip).toBeVisible();

    // The sold card image has desaturation filter applied
    const soldCard = page.locator("article").filter({ hasText: "Sold" }).first();
    const soldImage = soldCard.locator("img").first();
    await expect(soldImage).toBeVisible();
    const filterStyle = await soldImage.getAttribute("style");
    expect(filterStyle).toContain("saturate(0.4)");

    // Sold card CTA replaces Enquire with "Notify me about similar homes"
    const notifyButton = soldCard.getByText("Notify me about similar homes");
    await expect(notifyButton).toBeVisible();
    const href = await notifyButton.getAttribute("href");
    expect(href).toContain("wa.me");
    expect(href).toContain(encodeURIComponent("Please notify me about similar homes"));
  });

  test("3. Hide sold toggle is ON by default and filters sold listings; sold listing reachable via direct URL", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // By default hideSold is ON -> no Sold card visible
    await page.goto("/kolkata/properties");
    const soldChipsDefault = page.locator("article").filter({ hasText: "Sold" });
    await expect(soldChipsDefault).toHaveCount(0);

    // Uncheck "Hide sold"
    const hideSoldCheckbox = page.getByRole("checkbox", { name: /Hide sold/i });
    await expect(hideSoldCheckbox).toBeChecked();
    await hideSoldCheckbox.uncheck();

    // Now sold cards appear
    await expect(page.locator("article").filter({ hasText: "Sold" }).first()).toBeVisible();

    // Direct URL navigation to sold property works (SEO preserved)
    await page.goto("/kolkata/properties/queens-court-manor-alipore");
    await expect(page.getByRole("heading", { name: /Queens Court Manor/i })).toBeVisible();
    await expect(page.getByText("Sold").first()).toBeVisible();
    await expect(page.getByText(/Status updated/i)).toBeVisible();

    const detailNotifyBtn = page.getByRole("link", { name: "Notify me about similar homes" });
    await expect(detailNotifyBtn).toBeVisible();
  });

  test("4. Market price benchmarks: client-side delta computation, source label and as-of date", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/kolkata/properties");

    // Check for benchmark comparison line and source citation on cards
    const benchmarkLine = page.getByText(/average \(₹/i).first();
    await expect(benchmarkLine).toBeVisible();

    const sourceCitation = page.getByText(/as of (Jul|Aug|Sep|Oct) 2026/i).first();
    await expect(sourceCitation).toBeVisible();

    // Property detail page market benchmark context
    await page.goto("/kolkata/properties/the-saltlake-manor");
    await expect(page.getByText(/below the Salt Lake average/i).or(page.getByText(/above the Salt Lake average/i))).toBeVisible();
    await expect(page.getByText("NHB RESIDEX Q2 FY27 · as of Jul 2026")).toBeVisible();
  });

  test("5. Property in locality with NO benchmark renders rate alone without comparison box or empty space", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // Habra has no benchmark
    await page.goto("/kolkata/properties/habra-green-meadows");
    await expect(page.getByRole("heading", { name: /Habra Green Meadows/i })).toBeVisible();

    // Price per sq ft built-up should be visible
    await expect(page.getByText(/₹.*\/ sq ft built-up/i)).toBeVisible();

    // But NO comparison box, no "0%", no average comparison
    await expect(page.getByText(/Habra average/i)).toHaveCount(0);
    await expect(page.getByText(/0% below/i)).toHaveCount(0);
    await expect(page.getByText(/0% above/i)).toHaveCount(0);
  });

  test("6. Market aggregate bar updates instantly with zero network requests", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Monitor network requests
    const outboundRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("99acres") || url.includes("magicbricks") || url.includes("housing.com")) {
        outboundRequests.push(url);
      }
    });

    await page.goto("/kolkata/properties");

    const aggregateBar = page.locator("[data-testid='market-aggregate-bar']");
    await expect(aggregateBar).toBeVisible();
    await expect(aggregateBar).toContainText(/homes · median ₹.*\/sq ft/i);

    // Verify competitor requests is strictly 0
    expect(outboundRequests).toHaveLength(0);
  });

  test("7. Mobile 320px viewport: status chips and benchmark text do not cause horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/kolkata/properties");

    // Evaluate horizontal scroll width vs client width
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for subpixel rendering
  });
});
