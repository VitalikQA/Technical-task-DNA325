import { test, Browser, BrowserContext, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/LogInPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ContactListPage } from '../pages/ContactListPage';


let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
});
  
test.afterAll(async () => {
    await browser.close();
});

test('Contact Creation - Success', async () => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const contactListPage = new ContactListPage(page);

    await loginPage.navigateToURL();
    await loginPage.fillEmail('joachim+453459@systima.no');
    await loginPage.fillPassword('123456789');
    await loginPage.clickLoginButton();
    await dashboardPage.openMenuButton();
    await dashboardPage.openContactList();
    await contactListPage.clickCreateNewContactButton();
    await contactListPage.enterName('Test');
    await contactListPage.clickConfirmCreateButton();
    await contactListPage.checkSuccessMessage();
    
    //The test task requires checking that the user has been created. It also states that the username should be 'Test'. Since there are a very large number of users with that name in the table, it is impossible to check this accurately. It is also not possible to retrieve any user ID without using an API request. And your search does not work with any user ID. Therefore, it would be best to apply a randomizer to the name (using 'faker' for example), and then search for it through the search field after creation.
});