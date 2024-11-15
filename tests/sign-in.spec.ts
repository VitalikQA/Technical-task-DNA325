import { test, Browser, BrowserContext, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/LogInPage';
import { DashboardPage } from '../pages/DashboardPage';


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

test('Successful Login', async () => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToURL();
    await loginPage.fillEmail('joachim+453459@systima.no');
    await loginPage.fillPassword('123456789');
    await loginPage.clickLoginButton();
    await dashboardPage.isUserLoggedIn('Oversikt');  
});

test('Failed Login', async () => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToURL();
    await loginPage.fillEmail('joachim+453459@systima.no');
    await loginPage.fillPassword('111111111');
    await loginPage.clickLoginButton();
    await loginPage.expectErrorMessage('Feil brukernavn / passord');
});