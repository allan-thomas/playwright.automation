const {test,expect} = require("@playwright/test");

const url = "https://eventhub.rahulshettyacademy.com";

test("Assignment", async ({page}) => {

    await page.goto(`${url}/login`);

    const email = "Atk@mail.com";
    const password = "Atk.1881";

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button",{name:"Sign In"}).click();

    //logged in and asserting browser events

    await expect(page.getByRole("link",{name: "Browse Events →"})).toBeVisible()

    //navigating to admin/events

    await page.getByRole("button",{name:"Admin"}).click()
    await page.locator("div.absolute").getByRole("link",{name:"Manage Events"}).click()

    //adding an event and recoring the date and time

    const myEventName = `PUBG Room ${Date.now()}`;
    await page.getByLabel("Title").fill(myEventName);
    await page.getByLabel("Category").selectOption("Sports")
    await page.getByLabel("City").fill("Trivandrum")
    await page.getByLabel("Venue").fill("Tharavaddu")
    await page.getByLabel("Event Date & Time").fill("2027-12-31T10:00");
    await page.getByLabel("Price").fill("88");
    const seats= "50"
    await page.getByLabel("Seats").fill(seats);
    await page.getByRole("button",{name:"+ Add Event"}).click()

    //go back to events pags

    await page.goto(`${url}/events`);

    //in the event page

    const allEvents = page.locator("#event-card");
    await expect(allEvents.first()).toBeVisible();
    await expect (allEvents.filter({hasText:myEventName})).toBeVisible();

    //getting the seat count

    const seatsBeforeBooking = (await allEvents.locator("span.text-xs").filter({hasText:" seats available"}).first().textContent()).split(" ")[0];

    console.log(seatsBeforeBooking);

    //from quest lap

    

    await page.pause();
})