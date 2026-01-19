export class PaymentMethodPage {
    constructor(page) {
        this.page = page;
        this.paymentMethod = page.getByRole("link", { name: "Payment Method", exact: true });
        this.type = page.getByLabel("Type");
        this.bankAccount = page.locator("[id*='BankAccountIdLookup_B']");
        this.mainAccount = page.locator("[id*='MainAccountIdLookup_B']");
    }

    async clickOnPaymentMethod() {
        await this.paymentMethod.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnType() {
        await this.type.click();
    }

    async clickOnBankAccount() {
        await this.bankAccount.first().click();
        await this.page.waitForTimeout(500);
    }

    async clickOnMainAccount() {
        await this.mainAccount.first().click();
        await this.page.waitForTimeout(500);
    }
}