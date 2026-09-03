const {test,expect,request} = require("@playwright/test")

const loginPayload = {userEmail:"Atk@mail.com",userPassword:"Atk.1881"}
test.beforeAll(async () => {

    const apiContext = await request.newContext();

    //post to the URL
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload})

    //check its 200ok
    expect(loginResponse.ok()).toBeTruthy()

    //obatin the respose json value
    const loginResposeJson = loginResponse.json()

    //fetch the token value
    const token = loginResposeJson.token

})

test.beforeEach(() => {

    
})

test("",async({page}) =>{

})