
import {test, expect} from "@playwright/test"
import path from "path";

const UI_URL = "http://localhost:5173/"

test.beforeEach(async({page})=> {
    await page.goto(UI_URL);
    // get the sign in button
    await page.getByRole("link", {name: "Sign In"}).click();
    await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("Deepak@gmail.com");
    await page.locator("[name=password]").fill("123456");
    await page.getByRole("button", {name: "Login"}).click();
  
    await expect(page.getByText("Sign in is Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({page})=> {
    await page.goto(`${UI_URL}add-hotel`)

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is description for the test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3")

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").click();
    await page.getByLabel("Parking").click();
    
    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")

await page.setInputFiles('[name="imageFiles"]',[
    path.join(__dirname,"files", "img1.png"),
    path.join(__dirname,"files", "img2.png"),

])

await page.getByRole('button',{name: "Save"}).click();
await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });

})

test("should display hotels", async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Rooms")).toBeVisible();
    await expect(page.getByText("this is test room")).toBeVisible();

    await expect(page.getByText("chennai,india")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("₹ 151 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 1 children")).toBeVisible();
    await expect(page.getByText("4 Star Rating")).toBeVisible();

    await expect(page.getByRole("link", {name: "View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();  
})

test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
//    await page.locator('a:has-text("View Details")').nth(0).click();
      await page.getByRole("link", {name: "view Details"}).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" });

    await expect(page.locator('[name="name"]')).toHaveValue("test uuu");
    await page.locator('[name="name"]').fill("Sk Rooms UPDATED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();
    await expect(page.locator('[name="name"]')).toHaveValue("Sk Rooms UPDATED");
    await page.locator('[name="name"]').fill("Sk Rooms kk");
    await page.getByRole("button", {name: "Save"}).click();
});
