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