import { test } from '@playwright/test';
import { LookupAction } from './lookup.action';

export class CommonAction {
    constructor(page) {
        this.page = page;
        this.lookupAction = new LookupAction(page);
    }

    /**
     * Navigates to the application URL.
     *
     * This method opens the given path in the browser
     * and waits until the DOM content is fully loaded.
     *
     * @param {string} path - Application path to navigate (default: '/')
     */
    async navigateToApp(path = '/') {
        await test.step(`Navigate to application: ${path}`, async () => {
            await this.page.goto(path);
            await this.page.waitForLoadState('domcontentloaded');
            // await this.page.waitForLoadState('networkidle');
        });
    }

    /**
     * Clicks on the meatball (three-dot) menu.
     *
     * This method locates the meatball menu icon
     * and clicks it to open additional options.
     */
    async clickMeatballMenu() {
        await test.step('Click meatball menu', async () => {
            await this.page.locator('.dxm-popOut:has(img[alt="..."])').click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Clicks the Save button in a popup dialog.
     *
     * This method clicks the Save button
     * and waits for the save action to complete.
     */
    async clickPopupSave() {
        await test.step('Click Save button in popup', async () => {
            await this.page.getByRole('button', { name: 'Save', exact: true }).click();
            await this.page.waitForTimeout(2000);
        });
    }

    /**
     * Clicks the "Add a row" button.
     *
     * This method is used to add a new row
     * in grid or table-based screens.
     */
    async clickAddRow() {
        await test.step('Click Add a row button', async () => {
            await this.page.getByRole('button', { name: 'Add a row' }).click();
        });
    }

    /**
 * Fill email by position (first, second, etc.)
 * @param {string} email - Email to fill
 * @param {number} index - Index of the field (0-based)
 */
    async fillEmailByIndex(email, index = 0) {
        await test.step(`Fill Email field ${index + 1}: ${email}`, async () => {
            await this.page.locator("input[id*='Email']").nth(index).fill(email);
        });
    }

    /**
     * Fill mobile number by position (first, second, etc.)
     * @param {string} mobile - Mobile number to fill
     * @param {number} index - Index of the field (0-based)
     */
    async fillMobileByIndex(mobile, index = 0) {
        await test.step(`Fill Mobile field ${index + 1}: ${mobile}`, async () => {
            await this.page.locator("input[id*='Mobile']").nth(index).fill(mobile);
        });
    }

    /**
     * Fill telephone number by position (first, second, etc.)
     * @param {string} telephone - Telephone number to fill
     * @param {number} index - Index of the field (0-based)
     */
    async fillTelephoneByIndex(telephone, index = 0) {
        await test.step(`Fill Telephone field ${index + 1}: ${telephone}`, async () => {
            await this.page.locator("input[id*='TelNumber']").nth(index).fill(telephone);
        });
    }

    /**
     * Fill fax number by position (first, second, etc.)
     * @param {string} fax - Fax number to fill
     * @param {number} index - Index of the field (0-based)
     */
    async fillFaxByIndex(fax, index = 0) {
        await test.step(`Fill Fax Number field ${index + 1}: ${fax}`, async () => {
            await this.page.locator("input[id*='FaxNumber']").nth(index).fill(fax);
        });
    }

    async selectMainAccount(mainAccount) {
        await this.page.locator("[id*='MainAccountIdLookup_B']").first().click();
        // await this.page.locator("input[id*='MainAccountIdLookup_I']").fill(mainAccount);
        await this.page.waitForTimeout(1000);
        await this.lookupAction.selectLookupText(mainAccount);
    }

}
