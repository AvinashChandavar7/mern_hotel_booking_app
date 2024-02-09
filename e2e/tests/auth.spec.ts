import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";



test('should allow the user to register ', async ({ page }) => {

  const randomFiveDigitsNumber = (Math.floor(Math.random() * 90000) + 10000);
  const testEmail = `test_register_${randomFiveDigitsNumber}@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill("aaaaa");
  await page.locator("[name=lastName]").fill("aaaaa");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SignOut" })).toBeVisible();

});



test('should allow the user to sign in ', async ({ page }) => {
  await page.goto(UI_URL);

  // get the Login in Button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("aaaa@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Success!")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SignOut" })).toBeVisible();

});

