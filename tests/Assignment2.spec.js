const {test,expect}= require("@playwright/test");

const url = "https://eventhub.rahulshettyacademy.com";

const email = "Atk@mail.com";
const password = "Atk.1881";

async function loginAndGoToBooking(page)  {
    await page.goto(`${url}/login`);
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button",{name:"Sign In"}).click();
    
    //logged in and asserting browser events

    await expect(page.getByRole("link",{name: "Browse Events →"})).toBeVisible()
}

test("Single ticket booking is eligible for refund", async ({page}) => {

    loginAndGoToBooking(page);

    //Book first event with 1 ticket

    await page.locator("#event-card").first().getByRole("link",{name:"Book Now"}).click()

    //in booking page,
    await page.getByLabel("Full Name").fill("zachOG");
    await page.locator("#customer-email").fill(email);
    await page.getByPlaceholder("+91 98765 43210").fill("8888888888");
    await page.locator(".confirm-booking-btn").click();

    //clicking mybookings link
    await page.locator("nav").getByRole("link",{name:"My Bookings"}).click();

    // step 39 is not asserting due to flakiness hence, we are giving for wait for
    await page.locator("#booking-card").first().waitFor();
    //Assert URL is /bookings
    expect(await page.url()).toBe(`${url}/bookings`);
    await page.locator("#booking-card").first().getByRole("button",{name:"View Details"}).click()

    //Assert booking details is available in details page
    await expect(page.getByText("Booking Information")).toBeVisible();

    //reading reference number from details page
    const referenceFirstLetter = await page.locator(".py-1.text-sm").textContent()

    //reading title name h1 from details page
    const titleNameFirstLetter = await page.locator("h1").first().textContent()

    //asserting first character of booking ref equals first character of event title
    expect(referenceFirstLetter.split("-")[0]).toBe(titleNameFirstLetter.split(" ")[0].split("")[0])

    //Click the Check Refund Eligibility button
    await page.getByRole("button",{name:"Check eligibility for refund?"}).click()

    //Assert: spinner element (#refund-spinner) is immediately visible
    await expect(page.locator("#refund-spinner")).toBeVisible()

    await page.pause();

    

})