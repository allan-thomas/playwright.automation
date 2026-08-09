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

    const seatsBeforeBooking = parseInt((await allEvents.locator("span.text-xs").filter({hasText:" seats available"}).first().textContent()).split(" ")[0]);
    console.log(seatsBeforeBooking);

    //clicking the book now button
    allEvents.filter({hasText:myEventName}).getByRole("link",{name:"Book Now"}).click({timeout:5000});

    //in booking page,

    expect(await page.locator("#ticket-count").textContent()).toBe("1")
    await page.getByLabel("Full Name").fill("zachOG");
    await page.locator("#customer-email").fill(email);
    await page.getByPlaceholder("+91 98765 43210").fill("8888888888");
    await page.locator(".confirm-booking-btn").click();

    //assert to check whether the booking is done

    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = (await page.locator(".booking-ref").textContent()).trim();
    console.log(bookingRef);

    //clicking mybookings link
    await page.locator("nav").getByRole("link",{name:"My Bookings"}).click();
    await expect(page.url()).toBe(`${url}/bookings`)
    console.log(page.url());
    const bookingCards = page.locator('#booking-card')
    await expect(bookingCards.first()).toBeVisible()
    expect(await bookingCards.locator(".booking-ref").filter({hasText:bookingRef}).textContent()).toBe(bookingRef);
    await expect( bookingCards.locator(".truncate.mb-1").filter({hasText:myEventName})).toBeVisible();
    
    //navigate back to events page

    await page.locator("nav").getByRole("link",{name:"Events"}).click();
    const eventCards = page.locator("#event-card")
    await expect(eventCards.first()).toBeVisible();
    // Find the same event by title
    const updatedCard       = eventCards.filter({ hasText: myEventName }).first();
    await expect(updatedCard).toBeVisible();

    const seatsAfterBooking = parseInt((await updatedCard.locator(".text-xs").filter({hasText:" seats available"}).textContent()).split(" ")[0].trim());
    await page.pause()
    console.log(`Seats after booking: ${seatsAfterBooking}`);

    // Booked 1 ticket — count must drop by exactly 1
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
    await page.pause();
})