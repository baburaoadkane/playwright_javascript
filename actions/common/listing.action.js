import { test } from '@playwright/test';

export class ListingAction {
    constructor(page) {
        this.page = page;
    }

    getColumnFilterInput(columnIndex) {
        return this.page.locator(`input[aria-describedby="dx-col-${columnIndex}"]`);
    }

    /**
     * Clears the filter value entered in a specific listing column.
     *
     * This method is commonly used to reset the listing state
     * after filtering records based on column data.
     *
     * @param {number} columnIndex - Zero-based index of the column filter input
     */
    async clearColumnFilterByIndex(columnIndex) {
        await test.step(`Clear record data from column number: ${columnIndex}`, async () => {
            await this.getColumnFilterInput(columnIndex).clear();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Applies a text filter on a specific listing column.
     *
     * This method enters the given value into the column filter
     * textbox to narrow down the listing results.
     *
     * @param {string} recordInfo - Text value used to filter the listing
     * @param {number} columnIndex - Zero-based index of the column
     */
    async filterRecordByColumnText(text, columnIndex) {
        await test.step(`Filter listing by: ${text}`, async () => {
            const input = this.getColumnFilterInput(columnIndex);
            await input.fill(text);
            // await input.press('Enter');

            await this.page.waitForTimeout(1500);
        });
    }

    /**
     * Verifies whether a record exists in the listing using text search.
     *
     * This method first applies a column filter and then checks
     * if the expected record text is visible in the listing.
     *
     * @param {string} recordInfo - Record text to verify
     * @param {number} columnIndex - Index of the column to filter
     * @returns {Promise<boolean>} 
     * true  → record is visible  
     * false → record not found or not visible
     */
    async isRecordVisibleByText(recordInfo, columnIndex) {
        try {
            await this.filterRecordByColumnText(recordInfo, columnIndex);

            return await this.page
                .locator(`text=${recordInfo}`)
                .first()
                .isVisible({ timeout: 3000 });

        } catch {
            return false;
        }
    }

    /**
     * Verifies whether a record exists in the listing using exact cell matching.
     *
     * This method uses XPath to locate a table cell
     * whose text exactly matches the provided value.
     *
     * @param {string} recordInfo - Exact record text to verify
     * @param {number} columnIndex - Index of the column to filter
     * @returns {Promise<boolean>}
     */
    async isRecordVisibleByExactText(recordInfo, columnIndex) {
        try {
            await this.filterRecordByColumnText(recordInfo, columnIndex);

            const record = this.page.locator(
                `//td[normalize-space()='${recordInfo}']`
            );

            return await record.first().isVisible({ timeout: 3000 });
        } catch {
            return false;
        }
    }

    /**
    * Selects a record from the listing by record name.
    *
    * This method locates the row containing the provided text
    * and performs a click action to select the record.
    *
    * @param {string} recordName - Name of the record to select
    */
    async selectRecordByName(recordName) {
        await test.step(`Select record by name: ${recordName}`, async () => {
            const row = this.page
                .getByRole('row')
                .filter({ hasText: recordName });

            await row.focus();
            await row.click({ position: { x: 10, y: 10 } });
            await this.page.waitForTimeout(500);
        });
    }

}