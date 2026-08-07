const {test, expect} = require('@playwright/test');

test('Shopping cart Playwright Test', async ({browser})=> {
 
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
    await page.getByPlaceholder("email@example.com").fill(userName);
    await page.getByPlaceholder("enter your passsword").fill(passWord);
    await page.getByRole("button",{name:"Login"}).click();

    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const productWebelements = page.locator(".card-body");
    const count = await productWebelements.count();
    const productName = "ZARA COAT 3";
    
    await productWebelements.filter({hasText : productName}).getByRole("button",{name: " Add To Cart"}).click(); // removed the entire for loop with just 1 line of code with help of playwright
    
    await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click(); //updated

    //on Cart Page

    await page.locator("div.cart li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible(); //updated
    await page.getByRole("button",{name:"Checkout"}).click(); //updated
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
    
    await page.getByRole("button",{name:"Apply"}).click(); //updated
    await expect(page.getByText("* Invalid Coupon")).toBeVisible(); //updated
    await page.locator(".input.txt.text-validated").nth(1).fill(""); //for clearing the mail feild above country selection
    await page.locator(".input.txt.text-validated").nth(1).fill(userName);

    //select country from dropdown

    await page.locator(".input.txt.text-validated").last().pressSequentially("ind"); //pressSequentially() is a new method in playwright 1.35.0, it is used to type text into an input field one character at a time, simulating the way a user would type. It is useful for testing scenarios where the application responds to each keystroke, such as autocomplete or search suggestions.
    await page.locator(".ta-results").waitFor();
    const countryElements = page.locator("button.ta-item");
    await page.getByText("India").last().click(); //updated

    // await page.locator(".ta-item:has-text('India')").last().waitFor(); //if flaky test, use this line to wait for the element to be visible before clicking it
    // await page.locator(".ta-item:has-text('India')").last().click();

    //validate email id
    await expect(page.locator("label[type$='text']")).toHaveText(userName);

    //click on place order button
    await page.locator(".btnn").click();

    // validate order confirmation
    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();

    //print the order ID from the confirmation page
    const orderId =await page.locator('label.ng-star-inserted').textContent();
    console.log(orderId.split(" |")[1].trim());
    console.log("Order ID: " + orderId.split(" |")[1].trim());

    //going to order page
    await page.locator(".btn[routerlink$='myorders']").click();
    const rows = page.locator("tr.ng-star-inserted");
    await rows.first().waitFor();
    const rowsCount = await rows.count();
    console.log(rowsCount);
    for (let i = 0; i < rowsCount; i++) {
        if(await rows.nth(i).locator("th").first().textContent() == orderId.split(" |")[1].trim()) {
            await rows.nth(i).locator(".btn.btn-primary").click();
            console.log("Order ID is present in the order page");
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orderIdDetails.includes(orderId.split(" |")[1].trim())).toBeTruthy();

    await page.pause();
});
