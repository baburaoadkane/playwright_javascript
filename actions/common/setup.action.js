import { test } from '@playwright/test';

export class SetupAction {
    constructor(page) {
        this.page = page;
    }

    getMasterLink(masterName) {
        return this.page.getByRole('link', { name: masterName, exact: true });
    }

    /**
     * Navigates to the specified master by visible link text.
     *
     * This method clicks on the navigation link
     * that matches the provided master name.
     *
     * @param {string} masterName - The name of the master to navigate to.
     */
    async navigateToMasterByText(masterName) {
        await test.step(`Navigate to listing of ${masterName}`, async () => {
            const link = this.getMasterLink(masterName);
            await link.waitFor({ state: 'visible' });
            await link.click();
        });
    }

    /**
     * Navigates to the specified master by visible text and index.
     *
     * This method clicks on the navigation link
     * that matches the provided master name and index.
     *
     * @param {string} masterName - The name of the master.
     * @param {number} index - Index of the link to click.
     */
    async navigateToMasterByTextAtIndex(masterName, index) {
        await test.step(`Navigate to listing of ${masterName} at index ${index}`, async () => {
            const link = this.getMasterLink(masterName).nth(index);
            await link.waitFor({ state: 'visible' });
            await link.click();
        });
    }

    /**
     * Opens a specific setting option under Purchase setup.
     *
     * This method clicks on the settings link based on
     * the provided option name.
     *
     * @param {string} option - The setting option to open.
     */
    async openSettingByText(option) {
        await test.step(`Open setting option: ${option}`, async () => {
            await this.page
                .getByRole('link', { name: option, exact: true })
                .click();
        });
    }
}