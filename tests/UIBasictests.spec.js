const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser})=> {
 
    const context = await browser.newContext();

    const page = await context.newPage();

    const userName = page.locator('#username');

    const passWord = page.locator('#password');

    const signIn = page.locator('#signInBtn');

    const cardTitles = page.locator(".card-body a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("atk.mail.com");

    await passWord.fill("Atk.1881");

    await signIn.click();

    await expect (page.locator('.alert.alert-danger')).toContainText("Incorrect");

    console.log(await page.locator('.alert.alert-danger').textContent());

    await userName.fill(""); // clears the text field

    await userName.fill("rahulshettyacademy");

    await passWord.fill("");

    await passWord.fill("learning");

    await signIn.click();

    // after logging in

    console.log(await cardTitles.first().textContent());

    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

    //await expect(allTitles).textContent('Nokia');

});

test('Playwright Test with Select', async ({page})=> {
 
    // const context = await browser.newContext();

    // const page = await context.newPage();

    const userName = page.locator('#username');

    const passWord = page.locator('#password');

    const signIn = page.locator('#signInBtn');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await userName.fill("atk@mail.com");

    await passWord.fill("Atk.1881");

    await page.locator(".checkmark").last().click();

    await page .locator("#okayBtn").click();

    console.log( await page.locator(".checkmark").last().isChecked());

    await expect(page.locator(".checkmark").last()).toBeChecked();

    const dropdown = page.locator("select.form-control");

    await dropdown.selectOption("consult");

    await page.locator("[type='checkbox']").click();

    await expect( page.locator("[type='checkbox']")).toBeChecked();

    await page.locator("[type='checkbox']").uncheck();

    expect(await page.locator("[type='checkbox']").isChecked()).toBeFalsy();

    await expect( page.locator(".blinkingText").first()).toHaveAttribute('class',"blinkingText");

    console.log( await page.locator(".blinkingText").last().textContent());

    await page.pause();



});

test.only('Child Window handling with Playwright', async ({browser})=> {
 
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [page2] = await Promise.all( // to handle the child window
        [
            context.waitForEvent('page'),
            await page.locator(".blinkingText").first().click() // opens the child window
        ]
    );

    const text = await page2.locator(".im-para.redr").textContent();

    console.log(text);

    const arrayText = text.split(" ");

    console.log(arrayText[4].trim());

    const email = arrayText[4].trim();

    await page.locator("#username").fill(email);

    console.log( await page.locator("#username").inputValue());

    await page2.pause();


});


test('Page Playwright Test', async ({page})=> {
 
    // const context = await browser.newContext();

    // const page = await context.newPage();

    await page.goto('https://www.google.com/');

    console.log(await page.title());

    await expect(page).toHaveTitle("Google");

});