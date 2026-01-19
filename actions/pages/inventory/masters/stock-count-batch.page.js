import { test, expect } from '@playwright/test';
import { LookupAction } from "../../components/lookup.action";

export class StockCountBatchPage {
    constructor(page) {
        this.page = page;
        this.lookAction = new LookupAction(page);

        // Locators 
        this.warehouse = page.locator('[id*="WarehouseIdLookup_B-1Img"]');
        this.freezedDate = page.locator('[id*="StockFreezeDate_I"]');
        this.adjustmentMethod = page.locator('[id*="AdjustmentMethod_B-1Img"]');
    }

    /**
     * Opens the warehouse lookup popup/window
     */
    async openWarehouseLookup() {
        await this.warehouse.click();
        await this.page
            .locator('.lookup-text')
            .first()
            .waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Opens the warehouse lookup popup/window
     */
    async selectWarehouse(optionText) {
        await test.step(`Open warehouse lookup and select warehouse: ${optionText}`, async () => {
            await this.warehouse.click();
            await this.page
                .locator('.lookup-text')
                .first()
                .waitFor({ state: 'visible', timeout: 10000 });
            await this.lookAction.selectLookupText(optionText)
        });
    }

    /**
     * Fills the Freeze Date field
     */
    async fillFreezedDate(value) {
        const input = this.freezedDate;

        await expect(input).toBeVisible();
        await expect(input).toBeEnabled();

        await input.clear();
        await input.fill(value);
    }

    /**
     * Opens the Adjustment Method lookup
     */
    async openAdjustmentMethodLookup() {
        await this.adjustmentMethod.click();
    }
}