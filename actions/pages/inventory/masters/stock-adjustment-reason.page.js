import { expect } from '@playwright/test';

// NOTE:
// This page handles ONLY Stock Adjustment Reason–specific fields.
// Common master header fields (code, name, description, save, etc.)
// are handled by app.header.

/**
 * StockAdjustmentReasonPage
 *
 * Encapsulates all UI interactions that are specific to the
 * Stock Adjustment Reason master screen.
 *
 * Responsibilities:
 * - Open lookups related to document type and adjustment accounts
 * - Provide reusable, readable actions for Stock Adjustment Reason–specific fields
 *
 * Non-responsibilities:
 * - Common header fields (code, name, description)
 * - Save, edit, delete actions
 * - Generic listing or menu operations
 */
export class StockAdjustmentReasonPage {

    /**
     * @param {import('@playwright/test').Page} page
     * Playwright page instance
     */
    constructor(page) {
        this.page = page;

        // ===== Lookup icon locators =====
        this.documentType = page.locator('[id*="DocumentType_B-1Img"]');
        this.adjustmentType = page.locator('[id*="AdjustmentType_B-1Img"]');
        this.positiveAdjustmentAccount = page.locator('[id*="PositiveAdjustmentMainAccountIdLookup_B-1Img"]');
        this.negativeAdjustmentAccount = page.locator('[id*="NegativeAdjustmentMainAccountIdLookup_B-1Img"]');
    }

    /**
     * Opens a lookup by clicking on its lookup icon.
     * Ensures the lookup is visible before interaction.
     *
     * @param {import('@playwright/test').Locator} locator
     * Lookup icon locator to be clicked
     */
    async openLookup(locator) {
        await expect(locator).toBeVisible({ timeout: 5000 });
        await locator.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Opens the Document Type lookup.
     */
    async openDocumentType() {
        await this.openLookup(this.documentType);
    }

    /**
     * Opens the Adjustment Type lookup.
     */
    async openAdjustmentType() {
        await this.openLookup(this.adjustmentType);
    }

    /**
     * Opens the Positive Adjustment Account lookup.
     */
    async openPositiveAdjustmentAccount() {
        await this.openLookup(this.positiveAdjustmentAccount);
    }

    /**
     * Opens the Negative Adjustment Account lookup.
     */
    async openNegativeAdjustmentAccount() {
        await this.openLookup(this.negativeAdjustmentAccount);
    }
}