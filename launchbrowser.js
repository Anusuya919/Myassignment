import{ Chromium,test} from "@playwright/test"
test('test to launch browser',  (async () => {
    const browser = await firefox.launch({channel:"chrome", headless: false})
    const context = await context.nextpage()
    const page = await context . newpage()
    await page.goto("https://login.salesforce.com/?locale=in")
    const url = page.url()
    console.log("The url of the page is ", +url)
})
