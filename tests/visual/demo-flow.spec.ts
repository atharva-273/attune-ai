import { expect, test } from "@playwright/test";

test.describe("Attune demo flow visual baseline", () => {
  test("welcome screen", async ({ page }) => {
    await page.goto("/flows/demo/welcome");
    await expect(page.locator('[data-figma-node-id="100:200"]')).toHaveScreenshot(
      "demo-welcome.png",
      {
        animations: "disabled"
      }
    );
  });

  test("preferences screen", async ({ page }) => {
    await page.goto("/flows/demo/preferences");
    await expect(page.locator('[data-figma-node-id="100:240"]')).toHaveScreenshot(
      "demo-preferences.png",
      {
        animations: "disabled"
      }
    );
  });
});
