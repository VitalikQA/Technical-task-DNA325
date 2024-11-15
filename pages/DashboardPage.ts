import { Page, expect } from '@playwright/test';

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isUserLoggedIn(overview: string): Promise<void> {
        const pageTitle = this.page.locator('span[class="page-title"]');
        await expect(pageTitle).toContainText(overview);
    }

    async openMenuButton () {
        await this.page.getByRole('link', { name: 'Systima AS' }).click();
    }

    async openPurchaseDetails () {
        await this.page.getByRole('button', { name: 'Bokføring' }).click();
        await this.page.getByRole('link', { name: 'Bokfør andre filer' }).click();
    }

    async openContactList () {
        await this.page.locator('//div[@class="v-list-item__content"]/div[contains (text(), "Kontakter")]').click();
    }
}