import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://app.staging.systima.no/systimaas7/dashboard';
    }

    async navigateToURL() {
        await this.page.goto(this.url);
    }

    async fillEmail(email: string) {
        await this.page.fill('input[name="email"]', email);
    }

    async fillPassword(password: string) {
        await this.page.fill('input[name="password"]', password);
    }

    async clickLoginButton() {
        await this.page.click('button[type="submit"]');
    }

    async expectErrorMessage(errorText: string): Promise<void> {
        const error = this.page.locator('div[class="v-alert__content"]');
        await expect(error).toContainText(errorText);
    }
}