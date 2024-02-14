import { test, expect } from '@playwright/test';
import path from "path";

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


test("should allow user to add a hotel",
  async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test city");
    await page.locator("[name=country]").fill("Test country ");
    await page.locator("[name=description]").fill("Test description for the Test Hotel");

    await page.locator("[name=pricePerNight]").fill("1000 ");
    await page.selectOption("select[name=starRating]", "3");


    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Spa").check();

    await page.locator("[name=adultCount]").fill("5");
    await page.locator("[name=childCount]").fill("2");

    await page.setInputFiles("[name=imageFiles]",
      [
        path.join(__dirname, "../public", "1.jpg"),
        path.join(__dirname, "../public", "2.jpg")
      ]
    );

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 20000 });
  }
)

test("should display hotels",
  async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).toBeVisible();
    await expect(page.getByText("₹4998 & All Inclusive")).toBeVisible();
    await expect(page.getByText("2 adults, 3 children")).toBeVisible();
    await expect(page.getByText("2 Star rating")).toBeVisible();
    await expect(page.getByText("Spa, Free WiFi, Family Rooms, Airport Shuttle")).toBeVisible();


    await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  }
)