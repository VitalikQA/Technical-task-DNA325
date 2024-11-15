import { Page, expect } from '@playwright/test';

export class ContactListPage{
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickCreateNewContactButton() {
        await this.page.locator('[id="contacts-create-contact-button"]').click();
    }

    async enterName(name: string) {
        await this.page.locator('//div[@class="v-text-field__slot"]/label[contains(text(), "Navn *")]').fill(name);
    }

    async clickConfirmCreateButton() {
        await this.page.locator('//button[@type="submit"]/span[contains(text(), " Opprett kontakt ")]').click();
    }

    async checkErrorMessage() {
        const errorMessage = this.page.locator("//div[div[div[div[label[contains(text(), 'Navn *')]]]]] //div[@class='v-messages theme--light error--text']/div/div[contains(text(), 'Vennligst skriv inn navn')]");
        await expect(errorMessage).toBeVisible();
    }

    async checkSuccessMessage() {
        await this.page.waitForSelector('//div[@role="status"]/div[contains(text(), "Ny kontakt lagret.")]');
        const successMessage = this.page.locator('//div[@role="status"]/div[contains(text(), "Ny kontakt lagret.")]');
        await expect(successMessage).toBeVisible();
    }
}