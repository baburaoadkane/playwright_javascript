import { test } from '@playwright/test';

export class ListingAction {
    constructor(page) {
        this.page = page;
    }

    /**
     * Filters the master listing by column index.
     *
     * This method enters the provided value into the
     * column filter textbox to narrow down the results.
     *
     * @param {string} masterInfo - The master details used for filtering the record
     * @param {number} columnIndex - Index of the column
     */
    async filterMasterByColumnIndex(masterInfo, columnIndex) {
        await test.step(`Filter record on listing by text: ${masterInfo}`, async () => {
            await this.page
                .locator(`input[aria-describedby="dx-col-${columnIndex}"]`)
                .fill(masterInfo);
            await this.page.waitForTimeout(2000);
        });
    }

    /**
     * Checks whether a master record exists in the listing with master details
     *
     * @param {string} masterInfo - The master details used for filtering the record
     * @param {number} columnIndex - Index of the column
     * @returns {Promise<boolean>}
     */
    async isRecordExists(masterInfo, columnIndex) {
        try {
            await this.filterMasterByColumnIndex(masterInfo, columnIndex);

            return await this.page
                .locator(`text=${masterInfo}`)
                .first()
                .isVisible({ timeout: 3000 });

        } catch {
            return false;
        }
    }

    /**
     * Checks whether a master record exists in the listing
     *
     * @param {string} masterInfo
     * @returns {Promise<boolean>}
     */
    async isRecordExistsWithDetails(masterInfo, columnIndex) {
        try {
            await this.filterMasterByColumnIndex(masterInfo, columnIndex);

            const record = this.page.locator(
                `//td[normalize-space()='${masterInfo}']`
            );

            return await record.first().isVisible({ timeout: 3000 });
        } catch {
            return false;
        }
    }

    /**
     * Filters the master listing by the given code.
     *
     * This method enters the provided value into the
     * Code column filter textbox to narrow down the results.
     *
     * @param {string} option - The master code used for filtering.
     */
    async filterMasterByCode(option) {
        await test.step(`Filter master list by code: ${option}`, async () => {
            await this.page
                .locator('input[aria-describedby="dx-col-2"]')
                .fill(option);
            await this.page.waitForTimeout(2000);
        });
    }

    /**
     * Filters the master listing by the given name.
     *
     * This method enters the provided value into the
     * Name column filter textbox to narrow down the results.
     *
     * @param {string} option - The master name used for filtering.
     */
    async filterMasterByName(option) {
        await test.step(`Filter master list by name: ${option}`, async () => {
            await this.page
                .locator('input[aria-describedby="dx-col-3"]')
                .fill(option);
            await this.page.waitForTimeout(2000);
        });
    }

    /**
     * Selects a master row from the listing by name.
     *
     * This method locates the row containing the given name,
     * focuses on it, and performs a click to select the record.
     *
     * @param {string} option - The master name to be selected.
     */
    async selectMasterRowByName(option) {
        await test.step(`Select master row with name: ${option}`, async () => {
            const row = this.page
                .getByRole('row')
                .filter({ hasText: option });

            await row.focus();
            await row.click({ position: { x: 10, y: 10 } });
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Selects a record from the listing by provided text.
     *
     * This method locates the row containing the given text,
     * focuses on it, and performs a click to select the record.
     *
     * @param {string} option - The master record to be selected.
     */
    async selectRecordByText(option) {
        await test.step(`Select record by name: ${option}`, async () => {
            const row = this.page
                .getByRole('row')
                .filter({ hasText: option });

            await row.focus();
            await row.click({ position: { x: 10, y: 10 } });
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Checks whether a master record exists in the listing
     *
     * @param {string} code
     * @returns {Promise<boolean>}
     */
    async isRecordExistsWithCode(code) {
        try {
            await this.filterMasterByCode(code);
            return await this.page
                .locator(`text=${code}`)
                .first()
                .isVisible({ timeout: 3000 });
        } catch {
            return false;
        }
    }

    /**
     * Checks whether a master record exists in the listing
     *
     * @param {string} name
     * @returns {Promise<boolean>}
     */
    async isRecordExistsWithName(name) {
        try {
            await this.filterMasterByName(name);
            return await this.page
                .locator(`text=${name}`)
                .first()
                .isVisible({ timeout: 3000 });
        } catch {
            return false;
        }
    }

    /**
     * Clears the Name column filter in the master listing.
     *
     * This method removes the applied filter value
     * to reset the listing view.
     */
    async clearMasterNameColumnFilter() {
        await test.step('Clear master name column filter', async () => {
            await this.page
                .locator('input[aria-describedby="dx-col-3"]')
                .clear();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Clears the column data used to filter in listing.
     *
     * This method removes the applied filter value
     * to reset the listing view.
     */
    async clearFilterDataFromColumnIndex(columnIndex) {
        await test.step(`Clear filter Data from column number: ${columnIndex}`, async () => {
            await this.page
                .locator(`input[aria-describedby="dx-col-${columnIndex}"]`)
                .clear();
            await this.page.waitForTimeout(500);
        });
    }
}