const {test, expect} = require('@playwright/test');

test.only('Shopping cart Playwright Test', async ({browser})=> {
 
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator(".btn1").click();

    await page.locator("#firstName").fill("Zach");

    await page.locator("#lastName").fill("Thomas");

    await page.locator("#userEmail").fill("Atk@mail.com");

    await page.locator("#userMobile").fill("1234567890");

    await page.locator("#userPassword").fill("Atk.1881");

    await page.locator("#confirmPassword").fill("Atk.1881");

    await page.locator("[type='checkbox']").click();

    await page.locator("#login").click();

    await page.locator(".text-reset").click() // because i have already created an account, i just going back to login page

    await page.locator("#userEmail").fill("Atk@mail.com");

    await page.locator("#userPassword").fill("Atk.1881");

    await page.locator("#login").click();

    //await page.waitForLoadState('networkidle');

    await page.locator("div > h5").first().waitFor();

    const titles = await page.locator("div > h5").allTextContents();

    console.log(titles);

    console.log(await page.locator("div > h5").first().textContent());

});
