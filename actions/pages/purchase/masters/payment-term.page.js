import { test, expect } from '@playwright/test';

export class PaymentTermPage {
    constructor(page) {
        this.page = page;

        this.paymentTerm = page.getByRole("link", { name: "Payment Term", exact: true });
        this.code = page.getByRole('textbox', { name: 'Code' });
        this.dueDays = page.getByLabel('Due Days');
        this.autoInsertCustomer = page.locator('#PaymentTerm\\.AutoInsertWhileCreatingCustomer_S_D');
        this.autoInsertSupplier = page.locator('#PaymentTerm\\.AutoInsertWhileCreatingSupplier_S_D');
    }

    /** Click on the payment term navigation link */
    async clickPaymentTerm() {
        await this.paymentTerm.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForURL('**/PaymentTerm/Listing**');
    }

    /** Fill Due Days */
    async fillCode(value) {
        await test.step(`Fill Code: ${value}`, async () => {
            await this.code.fill(value);
        });
    }

    /** Fill Due Days */
    async fillDueDays(value) {
        await test.step(`Fill Due Days: ${value}`, async () => {
            await this.dueDays.fill(String(value));
        });
    }

    /** Enable auto insert while creating customer */
    async enableAutoInsertToCustomer() {
        await test.step('Click auto insert to customer', async () => {
            await this.autoInsertCustomer.click();
        });
    }

    /** Enable auto insert while creating supplier */
    async enableAutoInsertToSupplier() {
        await test.step('Click auto insert to supplier', async () => {
            await this.autoInsertSupplier.click();
        });
    }
}
