const puppeteer = require("puppeteer");

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: "new" });
  page = await browser.newPage();
  await page.goto("https://www.saucedemo.com");
});

describe("Sauce Demo Login Tests", () => {
  test("standard_user should login with correct username and password", async () => {
    const page = await browser.newPage();
    page.setDefaultTimeout(6000);
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector("#user-name");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector("#contents_wrapper");
  });
  test("standard_user should not login with incorrect password", async () => {
    const page = await browser.newPage();
    page.setDefaultTimeout(6000);
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector("#user-name");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "wrong_password");
    await page.click("#login-button");
    await page.waitForSelector(".error-button");
  });
  test("locked_out_user should not login with correct username and password", async () => {
    const page = await browser.newPage();
    page.setDefaultTimeout(6000);
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector("#user-name");
    await page.type("#user-name", "locked_out_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector(".error-button");
    await page.waitForSelector(".error-message-container");
  });
  test("should fail login without username or password", async () => {
    const page = await browser.newPage();
    page.setDefaultTimeout(6000);
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector("#user-name");
    await page.click("#login-button");
    await page.waitForSelector(".error-button");
    await page.waitForSelector(".error-message-container");
  });
});

afterAll(async () => {
  await browser.close();
});
