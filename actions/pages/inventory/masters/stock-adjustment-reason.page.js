import { expect } from '@playwright/test';

export class StockAdjustmentReasonPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.documentType = page.locator('[id*="DocumentType_B-1Img"]');
        this.adjustmentType = page.locator('[id*="AdjustmentType_B-1Img"]');
        this.positiveAdjustmentAccount = page.locator('[id*="PositiveAdjustmentMainAccountIdLookup_B-1Img"]');
        this.newLookup = page.locator('[id="StockAdjustmentReason.NegativeAdjustmentMainAccountIdLookup_DDD_gv_DXMainTable"]');
        this.negativeAdjustmentAccount = page.locator('[id*="NegativeAdjustmentMainAccountIdLookup_B-1Img"]');
    }

    async openLookup(locator) {
        await expect(locator).toBeVisible({ timeout: 5000 });
        await locator.click();
        await this.page.waitForTimeout(500);
    }

    async openDocumentType() {
        await this.openLookup(this.documentType);
    }

    async openAdjustmentType() {
        await this.openLookup(this.adjustmentType);
    }

    async openPositiveAdjustmentAccount() {
        await this.openLookup(this.positiveAdjustmentAccount);
    }

    async openNegativeAdjustmentAccount() {
        await this.openLookup(this.negativeAdjustmentAccount);
    }
}
