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

    page.locator("#event-card").first().getByRole("link",{name:"Book Now"}).click()

    //in booking page,
    await page.getByLabel("Full Name").fill("zachOG");
    await page.locator("#customer-email").fill(email);
    await page.getByPlaceholder("+91 98765 43210").fill("8888888888");
    await page.locator(".confirm-booking-btn").click();

    //clicking mybookings link
    await page.locator("nav").getByRole("link",{name:"My Bookings"}).click();

    //Assert URL is /bookings
    expect( await page.url()).toBe(`${url}/bookings`);
    await page.locator("#booking-card").first().getByRole("button",{name:"View Details"}).click()

    await page.pause();

    

})