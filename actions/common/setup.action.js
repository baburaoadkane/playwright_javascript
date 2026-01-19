import { test } from '@playwright/test';

export class SetupAction {
    constructor(page) {
        this.page = page;
    }

    getMasterLink(masterName) {
        return this.page.getByRole('link', { name: masterName, exact: true });
    }

    /**
     * Navigate to master listing by name.
     *
     * @param {string} masterName - Master name to navigate
     * @param {number} [index=0] - Optional index when multiple links exist
     */
    async navigateToMaster(masterName, index = 0) {
        await test.step(`Navigate to listing of ${masterName}`, async () => {
            const link = this.getMasterLink(masterName).nth(index);

            await link.waitFor({ state: 'visible' });
            await link.click();
        });
    }

    /**
     * Opens a specific setting under setup screens.
     *
     * @param {string} settingName - Setting name to open
     */
    async openSettingByText(settingName) {
        await test.step(`Open setting option: ${settingName}`, async () => {
            const settingLink = this.page.getByRole('link', {
                name: settingName,
                exact: true
            });

            await settingLink.waitFor({ state: 'visible' });
            await settingLink.click();
        });
    }
}