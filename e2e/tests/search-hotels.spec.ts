import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test.beforeEach(
  async ({ page }) => {
    await page.goto(UI_URL);

    // get the Login in Button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("aaaa@gmail.com");
    await page.locator("[name=password]").fill("123456");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Login Success!")).toBeVisible();
  }
);

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Dublin");

  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels Found in Dublin")).toBeVisible();
  await expect(page.getByText("Dublin Getaways").first()).toBeVisible();

})

test("Should show hotel details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Dublin Getaways").click();
  await expect(page).toHaveURL(/detail/);

  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();

})

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Brazil");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Rio de Janeiro Bliss").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost : ₹17397.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Rio de Janeiro Bliss")).toBeVisible();
});
