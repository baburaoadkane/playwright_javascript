import { test } from '@playwright/test';

export class MasterDeleteAction {
    constructor(page, listingAction, commonAction, menuAction) {
        this.page = page;
        this.listingAction = listingAction;
        this.commonAction = commonAction;
        this.menuAction = menuAction;
    }

    /**
     * Checks whether a master record exists in the listing
     *
     * @param {string} name
     * @returns {Promise<boolean>}
     */
    // async isRecordExists(name, index) {
    //     try {
    //         await this.listingAction.filterMasterByColumnIndex(name, index);
    //         return await this.page
    //             .locator(`text=${name}`)
    //             .first()
    //             .isVisible({ timeout: 3000 });
    //     } catch {
    //         return false;
    //     }
    // }

    /**
     * Deletes a master record by name
     *
     * @param {string} entityName
     * @param {string} name
     */
    async deleteMasterByName(entityName, name) {
        await test.step(`Delete ${entityName}: ${name}`, async () => {
            await this.listingAction.selectRecordByName(name);
            await this.commonAction.clickMeatballMenu();
            await this.menuAction.clickMenuOptionByText('Delete');
            await this.menuAction.clickMenuOptionByText('Ok');
        });
    }

    /**
     * Safe delete with retry support.
     * - Skips if record does NOT exist
     * - Retries only real failures
     *
     * @param {Object} options
     * @param {string} options.entityName
     * @param {string} options.name
     * @param {number} [options.retries=1]
     *
     * @returns {'deleted'|'skipped'|'failed'}
     */
    async safeDeleteByName({ entityName, name, index, retries = 1 }) {
        // ===== Skip if record does not exist =====
        const exists = await this.listingAction.isRecordExistsAtIndexByName(name,index);

        if (!exists) {
            console.warn(`\n⚠️ Delete skipped because record not found → ${name}`);
            return 'skipped';
        }

        // ===== Try delete with retry =====
        for (let attempt = 1; attempt <= retries + 1; attempt++) {
            try {
                await this.deleteMasterByName(entityName, name);
                await this.page.waitForLoadState('networkidle');
                return 'deleted';
            } catch (error) {
                console.warn(`🔁 Delete attempt ${attempt} failed for ${name}`);

                if (attempt > retries) {
                    console.error(`🔴 Delete failed: ${name}`, error);
                    return 'failed';
                }

                await this.page.waitForTimeout(1000);
            }
        }
        return 'failed';
    }
}