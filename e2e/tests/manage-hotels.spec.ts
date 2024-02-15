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

    await page.locator("[name=name]").fill("Dublin Getaways");
    await page.locator("[name=city]").fill("Dublin");
    await page.locator("[name=country]").fill("Ireland");
    await page.locator("[name=description]").fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

    await page.locator("[name=pricePerNight]").fill("4998 ");
    await page.selectOption("select[name=starRating]", "2");


    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Spa").check();
    await page.getByLabel("Airport Shuttle").check();

    await page.locator("[name=adultCount]").fill("5");
    await page.locator("[name=childCount]").fill("2");

    await page.setInputFiles("[name=imageFiles]",
      [
        path.join(__dirname, "../public", "1.jpg"),
        path.join(__dirname, "../public", "2.jpg")
      ]
    );

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 30000 });
  }
)

test("should display hotels",
  async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Dublin Getaways").first()).toBeVisible();
    await expect(page.getByText("Dublin, Ireland").first()).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).toBeVisible();
    await expect(page.getByText("₹4998 & All Inclusive")).toBeVisible();
    await expect(page.getByText("2 adults, 3 children")).toBeVisible();
    await expect(page.getByText("2 Star rating")).toBeVisible();
    await expect(page.getByText("Spa, Free WiFi, Family Rooms, Airport Shuttle")).toBeVisible();


    await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  }
)

test("should edit hotels",
  async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector("[name=name]", { state: "attached" });
    await expect(page.locator("[name=name]")).toHaveValue("Dublin Getaways");
    await page.locator("[name=name]").fill("Dublin Getaways Updated");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Updated Success!")).toBeVisible({ timeout: 30000 });

    await page.reload();

    await expect(page.locator("[name=name]")).toHaveValue("Dublin Getaways Updated");
    await page.locator("[name=name]").fill("Dublin Getaways");
    await page.getByRole("button", { name: "Save" }).click();
  }
)