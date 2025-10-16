const {test, expect} = require('@playwright/test');

test.only('Shopping cart Playwright Test', async ({browser})=> {
 
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = "Atk@mail.com";
    const passWord = "Atk.1881";

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator(".btn1").click();
    await page.locator("#firstName").fill("Zach");
    await page.locator("#lastName").fill("Thomas");
    await page.locator("#userEmail").fill(userName);
    await page.locator("#userMobile").fill("1234567890");
    await page.locator("#userPassword").fill(passWord);
    await page.locator("#confirmPassword").fill(passWord);

    await page.locator("[type='checkbox']").click();
    await page.locator("#login").click();
    await page.locator(".text-reset").click() // because i have already created an account, i WILL just going back to login page
    await page.locator("#userEmail").fill(userName);
    await page.locator("#userPassword").fill(passWord);
    await page.locator("#login").click();

    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const productWebelements = page.locator(".card-body");
    const count = await productWebelements.count();
    const productName = "ZARA COAT 3";
    for (let i = 0; i < count; i++) {
        console.log(await productWebelements.nth(i).locator("b").textContent());
        if ( await productWebelements.nth(i).locator("b").textContent() == productName) {
             await productWebelements.nth(i).locator(".btn.w-10").click();
             console.log("found it");
             break;
        }
    }
    await page.locator("[routerlink*='cart']").click();

    //on Cart Page

    await page.locator("div.cart li").first().waitFor();
    // const cartProducts = page.locator("div.cart li");
    // const cartProductsCount = await cartProducts.count();
    // for (let i = 0; i < cartProductsCount; i++) {
    //     if ( await cartProducts.nth(i).locator("h3").textContent() == productName) {
    //         console.log("product is present in the cart");
    //         break;
    //     }       
    // }

    //OR

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator(".btn.btn-primary:has-text('Checkout')").click();
    //await page.locator("text='Checkout'").click();

    // on Payment Page

    const expiryDateMonthSelctor = page.locator(".input.ddl").first();
    await expiryDateMonthSelctor.selectOption("09");
    const expiryDateDaySelctor = page.locator(".input.ddl").last();
    await expiryDateDaySelctor.selectOption("29");
    let dataforPaymentPage = ["719", userName, "yy"];
    for(let i=1;i<=3;i++){
        await page.locator(".input.txt").nth(i).fill(dataforPaymentPage[i-1]);
    }
    
    await page.locator(".btn.mt-1").click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Invalid Coupon");
    await page.locator(".input.txt.text-validated").last().fill("ind");
    await page.pause();
});
