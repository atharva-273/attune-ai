import { expect, test } from "@playwright/test";

test.describe("Attune onboarding visual baseline", () => {
  test("onboarding splash", async ({ page }) => {
    await page.goto("/flows/onboarding/splash");
    await expect(page.locator('[data-figma-node-id="2480:17687"]')).toHaveScreenshot(
      "onboarding-splash.png",
      {
        animations: "disabled"
      }
    );
  });

  test("onboarding 4.1", async ({ page }) => {
    await page.goto("/flows/onboarding/4-1");
    await expect(page.locator('[data-figma-node-id="2480:17893"]')).toHaveScreenshot(
      "onboarding-4-1.png",
      {
        animations: "disabled"
      }
    );
  });

  test("onboarding 5.2", async ({ page }) => {
    await page.goto("/flows/onboarding/5-2");
    await expect(page.locator('[data-figma-node-id="2480:17780"]')).toHaveScreenshot(
      "onboarding-5-2.png",
      {
        animations: "disabled"
      }
    );
  });

  test("onboarding 6.2", async ({ page }) => {
    await page.goto("/flows/onboarding/6-2");
    await expect(page.locator('[data-figma-node-id="2480:18255"]')).toHaveScreenshot(
      "onboarding-6-2.png",
      {
        animations: "disabled"
      }
    );
  });

  test("onboarding 8.2", async ({ page }) => {
    await page.goto("/flows/onboarding/8-2");
    await expect(page.locator('[data-figma-node-id="2480:18123"]')).toHaveScreenshot(
      "onboarding-8-2.png",
      {
        animations: "disabled"
      }
    );
  });

  test("onboarding 10", async ({ page }) => {
    await page.goto("/flows/onboarding/10");
    await expect(page.locator('[data-figma-node-id="2480:18168"]')).toHaveScreenshot(
      "onboarding-10.png",
      {
        animations: "disabled"
      }
    );
  });
});
