//POSTMAN data :

//endpoint
//Authorization
//Headers
//Request Body 


import {expect, test } from "@playwright/test";

let id : any

test.describe.serial(`Service Now`,async () => {
    
test(`Creating Incident using Playwright with API`, async ({ request }) => {

    const response = await request.post("https://dev209980.service-now.com/api/now/table/incident",

        {
            headers: {
                "Authorization": "Basic QWRtaW46L3lhSDUkZUFMY0o5", // Base64 encoding
                "Content-Type": "application/json"
            },
            data: {
                "short_description": "Network Issue Created through Playwright",
                "description": "Network Issue"
            }
        }
    )


const reponseBody = await response.json() //→ JSON string ➜ object
//console.log(reponseBody);

//Assert status code
expect(response.status()).toBe(201);

//Assert status text
expect(response.statusText()).toBe("Created");

id =   reponseBody.result.sys_id
console.log(`The incident id is ${id}`);
})



//Fetch created lead


//test.describe.serial('Service Now', async( )=>{
test(`Fetch the Created Incident using Playwright with API`, async ({ request }) => {

    const response = await request.get(`https://dev209980.service-now.com/api/now/table/incident/${id}`,

        {
            headers: {
                "Authorization": "Basic QWRtaW46L3lhSDUkZUFMY0o5", // Base64 encoding
                "Content-Type": "application/json"
            }
        }
    )
})

//update the lead
//test.describe.serial('Service Now', async( )=>{
test(`update the Created Incident using Playwright with API`, async ({ request }) => {

    const response = await request.patch(`https://dev209980.service-now.com/api/now/table/incident/${id}`,

        {
            headers: {
                "Authorization": "Basic QWRtaW46L3lhSDUkZUFMY0o5", // Base64 encoding
                "Content-Type": "application/json"
            },
        
    
    data:{
        "short_description": "Network issue",
        "description":"Network type saved"
    }

})

const responsePatch = await response.json()
console.log(responsePatch);
})



//delete
//test.describe.serial('Service Now', async( )=>{
test(`Delete the Created Incident using Playwright with API`, async ({ request }) => {

    const response = await request.patch(`https://dev209980.service-now.com/api/now/table/incident/${id}`,

        {
            headers: {
                "Authorization": "Basic QWRtaW46L3lhSDUkZUFMY0o5", // Base64 encoding
                "Content-Type": "application/json"
            },
        }
    )
    })
})