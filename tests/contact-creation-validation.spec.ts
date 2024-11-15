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

test('Contact Creation - Validation', async () => {
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
    await contactListPage.clickConfirmCreateButton();
    await contactListPage.checkErrorMessage();
});