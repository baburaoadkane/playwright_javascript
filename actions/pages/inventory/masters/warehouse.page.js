import { test } from '@playwright/test';
import { LookupAction } from '../../components/lookup.action';

export class WarehousePage {
    constructor(page) {
        this.page = page;
        this.lookupAction = new LookupAction(page);
        // Locators
        this.skipNegativeStockCheck = page.locator('#Warehouse\\.SkipNegativeStockCheck_S_D');
        this.financialIntegrationTab = page.getByText('Financial Integration');
        this.segmentLookups = {
            1: page.locator('#Warehouse\\.Segment1_B-1Img'),
            2: page.locator('#Warehouse\\.Segment2_B-1Img'),
            3: page.locator('#Warehouse\\.Segment3_B-1Img'),
            4: page.locator('#Warehouse\\.Segment4_B-1Img'),
            5: page.locator('#Warehouse\\.Segment5_B-1Img'),
        };
    }

    /**
     * Enables the "Skip Negative Stock Check" option in the warehouse.
     */
    async enableSkipNegativeStockCheck() {
        await test.step('Enable "Skip Negative Stock Check" checkbox', async () => {
            await this.skipNegativeStockCheck.click();
        });
    }

    /**
     * Navigates to the Financial Integration tab on the warehouse page.
     */
    async expandFinancialIntegrationTab() {
        await test.step('Navigate to "Financial Integration" tab', async () => {
            await this.financialIntegrationTab.click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Opens the lookup dialog for a specific segment (1 to 5).
     * 
     * @param {number} segmentNumber - The segment number to open (1-5)
     * @throws {Error} If an invalid segment number is provided
     */
    async openSegmentLookup(segmentNumber) {
        if (!(segmentNumber in this.segmentLookups)) {
            throw new Error(`Invalid segment number: ${segmentNumber}. Must be between 1 and 5.`);
        }

        await test.step(`Open lookup for Segment ${segmentNumber}`, async () => {
            await this.segmentLookups[segmentNumber].click();
        });
    }

    /**
     * Selects an option by visible text in the lookup dialog for a specific segment.
     * 
     * @param {number} segmentNumber - The segment number (1-5)
     * @param {string} optionText - The visible text of the option to select
     * @throws {Error} If an invalid segment number is provided
     */
    async selectSegmentOptionByText(segmentNumber, optionText) {
        await test.step(`Select "${optionText}" in Segment ${segmentNumber}`, async () => {
            await this.segmentLookups[segmentNumber].click();

            const option = this.page
                .locator(`[id*="Warehouse.Segment${segmentNumber}"]`)
                .getByText(optionText, { exact: true });

            await option.waitFor({ state: 'visible', timeout: 5000 });
            await option.scrollIntoViewIfNeeded();
            await option.click();
        });
    }

}