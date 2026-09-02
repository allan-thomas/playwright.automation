const {test,expect} = require("@playwright/test")

test("Popup Validations",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/",{timeout:40000})

    //check the feild is invisible
    await expect(page.locator("#displayed-text")).toBeVisible()

    //click on hide button
    await page.locator("#hide-textbox").click()

    //check the field is invisible
    await expect(page.locator("#displayed-text")).toBeHidden()

    //click on confirm button
    await page.locator("#confirmbtn").click()

    //accept the JS Browser pop up // no need to give await
    page.on('dialog', dialog => dialog.accept())

    //hover over element
    await page.locator("#mousehover").hover()

    //switching inside a frame
    const framesPage = page.frameLocator("#courses-iframe")

    //for clicking on All access plan link inside the frame
    await framesPage.locator("li a[href*='lifetime-access']:visible").click()

    await page.pause()
})