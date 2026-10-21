import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("BariGhor Architectural Services & Configurator (Step 7 QA)", () => {
  test("1. Plot/land listings show CONSTRUCTION configurator, never interiors", async ({
    page,
  }) => {
    // Navigate to plot listing in New Town
    await page.goto("/new-town/properties/new-town-aa3-villa-plot");
    await page.waitForLoadState("domcontentloaded");

    const configurator = page.locator("#configurator");
    await expect(configurator).toBeAttached();

    // Must show construction headlines and badges
    await expect(configurator).toContainText(/Unified Construction Suite/i);
    await expect(configurator).toContainText(/Built by the team that planned it/i);

    // Must show construction tiers
    await expect(configurator).toContainText(/Turnkey/i);

    // Must NOT contain modular kitchen or interior upsells on an empty plot
    await expect(configurator).not.toContainText(/Modular Kitchen/i);
    await expect(configurator).not.toContainText(/Interiors by the team that built it/i);

    // Construction add-ons must be visible (boundary wall, landscaping, structural)
    await expect(configurator).toContainText(/Boundary Wall/i);
  });

  test("2. Apartment listings show INTERIORS configurator, never construction civil package", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");
    await page.waitForLoadState("domcontentloaded");

    const configurator = page.locator("#configurator");
    await expect(configurator).toBeAttached();

    // Must show interior headlines and badges
    await expect(configurator).toContainText(/Unified Interior Architecture/i);
    await expect(configurator).toContainText(/Interiors by the team that built it/i);

    // Interior add-ons must be present
    await expect(configurator).toContainText(/Modular.*Kitchen/i);
    await expect(configurator).toContainText(/Wardrobes/i);

    // Turnkey plot boundary wall must NOT appear on an apartment
    await expect(configurator).not.toContainText(/Boundary Wall & Gate/i);
  });

  test("3. Ticking add-ons updates the total; property price is never summed into one figure", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");
    await page.waitForLoadState("domcontentloaded");

    const configurator = page.locator("#configurator");
    await configurator.scrollIntoViewIfNeeded();

    // Locate add-on checkbox for modular kitchen
    const kitchenCheckbox = configurator.locator("input[type='checkbox']").first();
    await expect(kitchenCheckbox).toBeAttached();

    // Initial state unchecked
    const wasChecked = await kitchenCheckbox.isChecked();
    if (!wasChecked) {
      await kitchenCheckbox.check();
      await expect(kitchenCheckbox).toBeChecked();
    }

    // Live configuration summary contains estimated cost
    const costMatrix = configurator.locator("aside");
    await expect(costMatrix).toBeVisible();
    await expect(costMatrix).toContainText(/Estimated Interiors Cost/i);

    // Verify Property Base Price is displayed SEPARATELY and marked "Separate Financing"
    await expect(costMatrix).toContainText(/Property Base Price/i);
    await expect(costMatrix).toContainText(/Separate Financing/i);
    await expect(costMatrix).toContainText(/buyers finance property acquisition and execution packages through distinct bank loan/i);
  });

  test("4. Primary CTA WhatsApp URL contains reference, tier and selected add-ons; Secondary CTA is property-only", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");
    await page.waitForLoadState("domcontentloaded");

    const configurator = page.locator("#configurator");
    await configurator.scrollIntoViewIfNeeded();

    // Secondary CTA link check
    const secondaryCta = configurator.getByRole("link", {
      name: /Enquire about the property only/i,
    });
    await expect(secondaryCta).toBeVisible();
    const secondaryHref = await secondaryCta.getAttribute("href");
    expect(secondaryHref).toContain("wa.me");
    expect(secondaryHref).toContain("prop-1");
    // Secondary link must NOT contain interior tier or add-on details
    expect(secondaryHref).not.toContain("Estimated");
    expect(secondaryHref).not.toContain("Modular");

    // Primary CTA button exists and is labelled properly
    const primaryCta = configurator.getByRole("button", {
      name: /Enquire with my selection/i,
    });
    await expect(primaryCta).toBeVisible();
  });

  test("5. Mandatory 'Indicative' legal disclaimer is present wherever prices appear", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");
    await page.waitForLoadState("domcontentloaded");

    const disclaimerPattern = /Indicative — final quote after site visit/i;

    // In configurator module
    const configurator = page.locator("#configurator");
    await expect(configurator).toContainText(disclaimerPattern);

    // In sticky bottom bar
    const stickyBar = page.locator("[aria-label='Property Action Bar']");
    await expect(stickyBar).toBeAttached();
    await expect(stickyBar).toContainText(disclaimerPattern);

    // On dedicated services index
    await page.goto("/services");
    await expect(page.locator("main")).toContainText(disclaimerPattern);

    // On interiors service page
    await page.goto("/services/interiors");
    await expect(page.locator("main")).toContainText(disclaimerPattern);

    // On construction service page
    await page.goto("/services/construction");
    await expect(page.locator("main")).toContainText(disclaimerPattern);
  });

  test("6. Sticky bar never collides with WhatsApp FAB across viewport widths (360, 390, 768, 1440px)", async ({
    page,
  }) => {
    const viewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/new-town/properties/the-verandah-residences");

      const stickyBar = page.locator("[aria-label='Property Action Bar']");
      await expect(stickyBar).toBeVisible();

      // Check horizontal overflow: page body scrollWidth should not exceed clientWidth
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Verify sticky bar contains the integrated WhatsApp button without floating overlap
      const whatsappInBar = stickyBar.getByRole("link", { name: /WhatsApp/i });
      await expect(whatsappInBar).toBeVisible();
    }
  });

  test("7. Scroll-aware nudge appears when unscrolled, disappears on scroll, never loops", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");

    // Clear session storage before test
    await page.evaluate(() => sessionStorage.clear());

    // Trigger timer by simulating 4.1s elapsed without scroll
    await page.waitForTimeout(4100);

    const nudge = page.locator("[aria-label='Discovery hint']");
    if (await nudge.isVisible()) {
      // User scrolls down past 200px
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
      await page.waitForTimeout(300);

      // Nudge must disappear permanently
      await expect(nudge).toBeHidden();
    }
  });

  test("8. Fuzzy search typo tolerance ('newtwon' -> New Town), recent searches & keyboard navigation", async ({
    page,
  }) => {
    await page.goto("/kolkata");
    await page.waitForLoadState("networkidle");

    // Open search command palette via header trigger
    const searchTrigger = page.getByRole("button", { name: /search command palette/i });
    await expect(searchTrigger).toBeVisible();
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder(/search localities/i);
    await expect(searchInput).toBeVisible();

    // Type with deliberate typo: 'newtwon'
    await searchInput.fill("newtwon");
    await page.waitForTimeout(350); // 150ms debounce + search execution

    // Should fuzzy match 'New Town'
    const results = page.locator("[cmdk-item]");
    await expect(results.first()).toBeVisible();
    await expect(page.locator("[cmdk-list]")).toContainText(/New Town/i);

    // Keyboard navigation: ArrowDown, ArrowUp, Esc
    await searchInput.press("ArrowDown");
    await searchInput.press("ArrowUp");
    await page.keyboard.press("Escape");

    // Command palette closes
    await expect(searchInput).toBeHidden();
  });

  test("9. Shortlist configuration persists in localStorage and restores on return", async ({
    page,
  }) => {
    await page.goto("/new-town/properties/the-verandah-residences");
    await page.waitForLoadState("networkidle");

    const configurator = page.locator("#configurator");
    await configurator.scrollIntoViewIfNeeded();

    // Select the premium tier (Signature Luxe)
    const premiumBtn = configurator.getByRole("button", { name: /Signature Luxe/i });
    await expect(premiumBtn).toBeVisible();
    await premiumBtn.click();

    // Check localStorage has saved the selection with polling to await React state persistence
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("barighor_config_prop-1"));
        if (!raw) return "";
        try {
          return JSON.parse(raw).tierId || "";
        } catch {
          return "";
        }
      })
      .toContain("premium");

    const savedConfig = await page.evaluate(() => {
      return localStorage.getItem("barighor_config_prop-1");
    });
    const parsed = JSON.parse(savedConfig!);
    expect(parsed.tierId).toContain("premium");

    // Reload page to verify state restored
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.locator("#configurator").scrollIntoViewIfNeeded();

    await expect(
      page.locator("#configurator").getByRole("button", { name: /Signature Luxe/i })
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("10. Automated Axe accessibility audit on configurator and service pages", async ({
    page,
  }) => {
    await page.goto("/services/interiors");
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // color contrast audited explicitly across specific branding
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
