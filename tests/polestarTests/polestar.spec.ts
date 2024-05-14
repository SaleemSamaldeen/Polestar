import test, { expect } from "@playwright/test";


    test('Verify the home page and title', async({page}) => {
        //test.setTimeout(90000);
        await page.goto("https://www.polestar.com/global/developer/get-started/");
        await page.waitForLoadState('load');
        await page.getByRole('button', { name: 'Accept all' }).click();
        await page.getByText('Return Home').click();
        const title = await page.title();
        expect(title).toBe("Polestar – Electric cars | Polestar");
    });

    test('Verify the user allowed to Subscribe Polestar', async({page}) => {
        test.setTimeout(90000);
        await page.goto("https://www.polestar.com/global/developer/get-started/");
        await page.waitForLoadState('load');
        await page.getByRole('button', { name: 'Accept all' }).click();
        await page.getByRole('link', { name: 'Subscribe' }).click();
        await page.getByLabel('Email address *').fill("test@gmail.com");
        await page.locator('.css-9pq9cn').first().click();
        await page.getByRole('option', { name: 'British Indian Ocean Territory' }).click();
        await page.getByLabel('First name *').fill("Test");
        await page.getByLabel('Last name *').fill("Automation");
        await page.getByLabel('I accept that Polestar').click();
        await page.getByRole('button', { name: 'Subscribe' }).click();
    });

    test('Verify footer links', async({page}) => {
        test.setTimeout(90000);
        await page.goto("https://www.polestar.com/global/developer/get-started/");
        await page.waitForLoadState('load');
        await page.getByRole('button', { name: 'Accept all' }).click();
        await page.locator('//nav[@aria-labelledby="FooterDoormat-group-0-header"]').scrollIntoViewIfNeeded();
        const footerLinks = page.locator('//nav[@aria-labelledby="FooterDoormat-group-0-header"]//a');
        for(let i = 0; i< await footerLinks.count(); i++) {
            expect(await footerLinks.nth(i).getAttribute("href")).not.toBeNull();
        }
    });

    test("API GET request tests",async({request}) => {
        const responseBody = await request.get('https://reqres.in/api/unknown/2',
        {
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const body = await responseBody.json();
        expect(responseBody.status()).toBe(200);
        expect(await responseBody.text()).toContain('fuchsia rose');
        console.log(`Response status code: ${responseBody.status()}`);
        console.log('Response Body is :' + JSON.stringify(body));
    });
    
    test("API POST request tests",async({request}) => {
        const responseBody = await request.post('https://reqres.in/api/users',
        {
            data:{
                "name": "Polestar",
                "job": "Automation" 
            },
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const body = await responseBody.json();
        expect(responseBody.status()).toBe(201);
        expect(await responseBody.text()).toContain('Polestar');
        expect(body.id).not.toBeNull();
        console.log(`Response status code: ${responseBody.status()}`);
        console.log('Response Body is :' + JSON.stringify(body));
        console.log('Response body id :' + body.id);
    });
    
    test("API PUT request tests",async({request}) => {
        const responseBody = await request.put('https://reqres.in/api/users/2',
        {
            data:{
                "name": "Polestar Electric",
                "job": "API Automation" 
            },
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const body = await responseBody.json();
        expect(responseBody.status()).toBe(200);
        expect(await responseBody.text()).toContain('Polestar Electric');
        console.log(`Response status code: ${responseBody.status()}`);
        console.log('Response Body is :' + JSON.stringify(body));
    });
    
    
    test("API DELETE request tests", async({request}) => {
        const responseBody = await request.delete('https://reqres.in/api/users/2');
        expect(responseBody.status()).toBe(204);
        console.log(`Response status code: ${responseBody.status()}`);
    });

