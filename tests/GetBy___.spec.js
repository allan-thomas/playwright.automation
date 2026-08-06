const{test,expect} = require("@playwright/test");

test('test', async ({page}) => {

    test.setTimeout(60000); //test level timeout

    const slowExpect = expect.configure({timeout:6000}); //test level timeout for assertion

    page.setDefaultTimeout(9000); // test level timeout for action

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("password").fill("XXX")
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText(" The Form has been submitted successfully!. ").isVisible(); //returns you false or true, and doesnt stop the execution even though its false

    await expect(page.getByText(" The Form has been submitted successfully!. ")).toBeVisible({timeout : 10000 }); //if its false. it fails the test -- step level timeout for assertion

    await page.getByRole("link",{name:"shop"}).click({timeout:15000}); //if the link takes more than default actiontimeout timeout value. Step level timeout for action

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name")
    await page.locator("app-card").filter({hasText : "Blackberry"}).getByRole("button").click(); //help me skip the for loops
    await page.pause();
})
