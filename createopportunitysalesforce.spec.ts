import{test} from "@playwright/test";
import { request } from "http";
let token: any
let inst_url: any
let tokenType: any
let id : any

test.describe.serial(`Salesforce API Testing`,async () => {
    
test(`Generate a token `, async ({ request }) => {

    const reponse = await request.post('https://login.salesforce.com/services/oauth2/token',

        {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            form: {
                "client_id": "3MVG9dAEux2v1sLvYLaPG.4pYVX2823wDD2vEHL.ONpuMbn_VYABxqgjPBbsxn_d90j9NAL3NmdKYvZHFx9Hw",
                "client_secret": "D7DE0AEA8B78C0FE7098ADAEB8266A6B3733012404C98EC792535A56958B4155",
                "username": "meenureshee97821@agentforce.com",
                "password": "Kutta@290122",
                "grant_type": "password"
            }

        }
    )

    const reponseBody = await reponse.json()
    console.log(reponseBody);

    console.log(reponse.status());
    console.log(reponse.statusText());

    token = reponseBody.access_token

    inst_url = reponseBody.instance_url

    tokenType = reponseBody.token_type


})

test(`Create a opportunity in Salesforce`, async ({ request }) => {

   const response =  await request.post(`${inst_url}/services/data/v65.0/sobjects/Opportunity/`,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":` ${tokenType} ${token}`
            },
            data: {
  "Name": "Test Opportunity",
  "CloseDate": "2025-11-15",
  "StageName": "Prospecting"
}

        }
    )

    const responseBodyPost = await response.json()
  //  console.log(responseBodyPost);

    id = responseBodyPost.id
    console.log(id);
    


    
})

//Fetch the created opportunity
test(`Fetch a specific Lead in Salesforce`, async ({ request }) => {

   const res =  await request.get(`${inst_url}/services/data/v65.0/sobjects/Opportunity/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token} `
            }
        }
    )

    const responseBodyGet = await res.json() 
// Here "responseBodyGet" JavaScript Object not a value and cannot be used inside Template literal which habndles onlt string datatype
    console.log(responseBodyGet);

    console.log(res.status());
    console.log(res.statusText());
    
    
})


//Update the type dropdown to ‘New Customer’ and stage dropdown to ‘Prospect
test(`pdate the type dropdown to New Customer and stage dropdown to Prospect`, async ({ request }) => {

   const response =  await request.patch(`${inst_url}/services/data/v65.0/sobjects/Lead/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":` ${tokenType} ${token}`
            },
            data: {
                "Name": "Testanu",
                  "CloseDate": "2025-11-15",
                "StageName":"Prospecting",
  
                   "Type":"NewCustomer"
            }

        }
    )

   console.log(response.status());
    console.log(response.statusText());
    

})

//Get all instance
test(`update the dropdown to New Customer and stage dropdown to Prospect`, async ({ request }) => {

   const response =  await request.patch(`https://orgfarm-986c701ef0-dev-ed.develop.my.salesforce.com/services/data/v59.0/query?q=SELECT+Id,Name,StageName+FROM+Opportunity`,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":` ${tokenType} ${token}`
            },
           

        }
    )

   console.log(response.status());
    console.log(response.statusText());
    

})

//delete the first record
test(`Delete the created lead on salesfor`, async({request})=>{
const reponse=await request.delete('https://orgfarm-986c701ef0-dev-ed.develop.my.salesforce.com/services/data/v59.0/sobjects/Opportunity/006gL00000Dby8zQAB')
{
            headers: {
                "Content-Type"; "application/json"
                "Authorization";" ${tokenType} ${token}"
            }
        }
})

})