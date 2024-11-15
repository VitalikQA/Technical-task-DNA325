import { Page, expect } from '@playwright/test';

export class PurchaseDetailsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assignContactValue() {
        await this.page.getByRole('button', { name: 'Kontakt (valgfri ved' }).click();
        await this.page.locator('//div[@class="v-list-item__title" and contains (text(), "Systima AS")]').click();
    }

    async assignAmountValue() {
        await this.page.getByLabel('Totalt beløp inkl. mva. *').click();
        await this.page.getByLabel('Totalt beløp inkl. mva. *').fill('100');
    }

    async chooseInvoiseDate() {
        await this.page.getByLabel('Fakturadato *').click();
        await this.page.locator('//div[@class="date-picker-helper-text"]/a[contains (text(), "Klikk for måned og år")]').click();
        await this.page.getByRole('button', { name: 'jan' }).click();
        await this.page.getByRole('button', { name: '1.' }).first().click();
    }

    async chooseDueDate() {
        await this.page.getByLabel('Forfallsdato').click();
        await this.page.locator('(//div[@class="date-picker-helper-text"]/a[contains (text(), "Klikk for måned og år")])[2]').click();
        await this.page.locator('//div[@class="v-btn__content" and contains (text(), "jan")]').click();
        await this.page.locator('(//div[@class="v-btn__content" and contains (text(), "15.")])[2]').click();
    }

    async assignInvoiceNumber() {
        await this.page.locator('//div/label[contains (text(), "Fakturanr.")]').fill('1');
    }

    async selectAccount() {
        await this.page.locator('//div[@label="Konto *"]').click();
        await this.page.locator('//div[@class="v-list-item__title" and contains (text(), "1000 Utvikling, ervervet")]').click();
    }

    async pressConfirmButton() {
        await this.page.getByRole('button', { name: 'Bokfør', exact: true }).click();
    }

    async checkSuccessMessage() {
        await this.page.waitForSelector('//div[@role="status"]/div[contains (text(), "Bilag opprettet med bilagsnr. ")]');
        const successMessage = this.page.locator('//div[@role="status"]/div[contains (text(), "Bilag opprettet med bilagsnr. ")]');
        await expect(successMessage).toBeVisible();
    }

    async closeSuccessMessage() {
        await this.page.locator('.v-snack__action > .v-btn').click();
    }

    async checkFormIsCleared() {
        const contactField = this.page.locator('//div[label] //div[@class="v-select__selection v-select__selection--comma" and contains (text(), "Systima AS")]');
        await expect(contactField).toBeHidden();
    
        const amountPlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Totalt beløp inkl. mva. *")]');
        await expect(amountPlaceholder).toBeHidden();
    
        const invoiceDatePlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Fakturadato *")]');
        await expect(invoiceDatePlaceholder).toBeHidden();
    
        const dueDatePlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Forfallsdato")]');
        await expect(dueDatePlaceholder).toBeHidden();
    
        const accountPlaceholder = this.page.locator('//div[@class="v-select__selection v-select__selection--comma" and contains (text(), "1000 Utvikling, ervervet")]');
        await expect(accountPlaceholder).toBeHidden();
    }

    async checkErroreAboveInvoiceNumberField() {
        const errorUnderField = this.page.locator('//div/label[@class="v-label v-label--active theme--light error--text" and contains (text(), "Fakturanr.")]');
        await expect(errorUnderField).toBeVisible();
    }

    async checkErrorMessage() {
        const errorMessage = this.page.locator('//div[@class="v-messages theme--light error--text"]/div/div/span[contains (text(), " Fakturanr. er allerede bokført ")]');
        await expect(errorMessage).toBeVisible();
    }

    async checkFormIsNotCleared() {
        const contactField = this.page.locator('//div[label] //div[@class="v-select__selection v-select__selection--comma" and contains (text(), "Systima AS")]');
        await expect(contactField).toBeVisible();

        const amountPlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Totalt beløp inkl. mva. *")]');
        await expect(amountPlaceholder).toBeVisible();

        const invoiceDatePlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Fakturadato *")]');
        await expect(invoiceDatePlaceholder).toBeVisible();

        const dueDatePlaceholder = this.page.locator('//div/label[@class="v-label v-label--active theme--light" and contains (text(), "Forfallsdato")]');
        await expect(dueDatePlaceholder).toBeVisible();

        const accountPlaceholder = this.page.locator('//div[@class="v-select__selection v-select__selection--comma" and contains (text(), "1000 Utvikling, ervervet")]');
        await expect(accountPlaceholder).toBeVisible();
    }
}