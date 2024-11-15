import { test, Browser, BrowserContext, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/LogInPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PurchaseDetailsPage } from '../pages/PurchaseDetailsPage';


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

test('Duplicate Invoice Number Handling', async () => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const purchaseDetailsPage = new PurchaseDetailsPage(page);

    await loginPage.navigateToURL();
    await loginPage.fillEmail('joachim+453459@systima.no');
    await loginPage.fillPassword('123456789');
    await loginPage.clickLoginButton();
    await dashboardPage.openMenuButton();
    await dashboardPage.openPurchaseDetails();
    await purchaseDetailsPage.assignContactValue();
    await purchaseDetailsPage.assignAmountValue();
    await purchaseDetailsPage.chooseInvoiseDate();
    await purchaseDetailsPage.chooseDueDate();
    await purchaseDetailsPage.assignInvoiceNumber();
    await purchaseDetailsPage.assignAmountValue();
    await purchaseDetailsPage.pressConfirmButton();
    await purchaseDetailsPage.checkErroreAboveInvoiceNumberField();
    await purchaseDetailsPage.checkErrorMessage();
    await purchaseDetailsPage.checkFormIsNotCleared();
});