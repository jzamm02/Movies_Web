import { test, expect } from "@playwright/test";

test("Homepage loads successfully", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Movie Collection/i);
});

test("Notification toast is appearing", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "About page" }).click();
  await page.getByText("Feature coming soon...").click();
});

test("Test user path to movie", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByLabel("View all movies").click();
  await page.getByText("Genres").click();
  await page.getByLabel("Movie filter and search").getByText("Drama").click();
  await page.getByLabel("Selected genres").getByText("Drama").click();
  await page
    .getByRole("region", { name: "Movie filter and search" })
    .locator("div")
    .nth(1)
    .click();
  await page
    .getByRole("textbox", { name: "Search for a movie..." })
    .fill("dark");
  await page.getByRole("button", { name: "Learn more about The Dark" }).click();
  await page.getByRole("link", { name: "Back to home" }).click();
});
