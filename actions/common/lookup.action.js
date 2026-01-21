import { test } from '@playwright/test';

export class LookupAction {
    constructor(page) {
        this.page = page;
    }

    /**
     * Selects an option by visible text from the currently open DevExpress dropdown/lookup list.
     * 
     * @param {string} optionText - The exact visible text to select (e.g., "Account", "Sales")
     */
    async selectDropdownOptionByText(optionText) {
        await test.step(`Select dropdown option: "${optionText}"`, async () => {
            // Target the visible text inside the DevExpress listbox items
            const optionRow = this.page.getByRole('row').locator('td').getByText(optionText, { exact: true });

            // Wait for it to be visible (in case of animation/loading)
            await optionRow.waitFor({ state: 'visible', timeout: 5000 });

            // Optional: Scroll into view if needed
            await optionRow.scrollIntoViewIfNeeded();

            // Click the option
            await optionRow.click();

            // Optional: Small wait to let selection apply (helps with some DevExpress behaviors)
            await this.page.waitForTimeout(300);
        });
    }

    /**
   * Selects a value from a lookup list box based on visible text.
   *
   * This method finds the first lookup row containing the given text
   * and clicks on it.
   *
   * @param {string} option - The lookup option to be selected.
   */

    async selectLookupBoxItemRow(option) {
        await test.step(`Select lookup item option: ${option}`, async () => {
            const rows = this.page.locator("tr.dxeListBoxItemRow_Office365");

            const count = await rows.count();

            for (let i = 0; i < count; i++) {
                const row = rows.nth(i);
                const text = (await row.innerText()).trim();

                if (text.includes(option)) {
                    await row.click();
                    await this.page.waitForTimeout(500);
                    return;
                }
            }
            throw new Error(`Lookup option not found: ${option}`);
        });
    }

    /**
     * Selects a lookup value based on plain text elements.
     *
     * Iterates through elements with class 'lookup-text'
     * and selects the matching option.
     *
     * @param {string} optionText - The lookup text to select.
     */

    async selectLookupText(optionText) {
        await test.step(`Select lookup text option: ${optionText}`, async () => {

            while (true) {
                const rows = this.page.locator(".lookup-text");

                const count = await rows.count();

                for (let i = 0; i < count; i++) {
                    const row = rows.nth(i);
                    const text = (await row.innerText()).trim();

                    if (text.includes(optionText)) {
                        await row.click({ force: true });
                        await this.page.waitForTimeout(500);
                        return;
                    }
                }
                await this.page.getByRole('button', { name: 'next-icon', exact: true }).click();
                await this.page.waitForTimeout(500);
            }
        });
    }

    /**
     * Selects an item from a DevExtreme list.
     *
     * Ensures the item is visible and not already selected
     * before clicking it.
     *
     * @param {string} optionText - The list item text to select.
     */

    async selectListItem(optionText) {
        await test.step(`Select lookup list option: ${optionText}`, async () => {
            const option = this.page
                .locator('div.dx-item.dx-list-item')
                .filter({ hasText: optionText })
                .first();

            await option.waitFor({ state: 'visible', timeout: 7000 });
            const isSelected = await option.getAttribute('aria-selected');
            if (isSelected === 'true') {
                return;
            }
            await option.scrollIntoViewIfNeeded();
            await option.click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Selects an option element with role="option".
     *
     * Avoids re-selecting if the option is already selected.
     *
     * @param {string} optionText - The option text to select.
     */

    async selectOption(optionText) {
        await test.step(`Select lookup option value: ${optionText}`, async () => {
            const option = this.page
                .locator('[role="option"]')
                .filter({ hasText: optionText })
                .first();

            await option.waitFor({ state: 'visible', timeout: 5000 });
            const isSelected = await option.getAttribute('aria-selected');
            if (isSelected === 'true') {
                return;
            }
            await option.scrollIntoViewIfNeeded();
            await option.click();
        });
    }

    /**
     * Selects a lookup option from a virtualized list with scrolling.
     *
     * Scrolls the list multiple times to load virtual items
     * and selects the matching lookup value.
     *
     * @param {string} optionText - The lookup value to be selected.
     */

    async selectLookupOption(optionText) {
        await test.step(`Select lookup option text: ${optionText}`, async () => {

            // Locate the lookup list container
            // const list = page.locator('div.dx-list-items').nth(1);
            const list = this.page.getByRole("listbox", { name: 'Items' }).nth(0);

            // Locate all lookup list items
            const items = this.page.locator('div.dx-item.dx-list-item');

            // Maximum number of scroll attempts to load virtual items
            const maxScrolls = 10;

            // Loop through the list multiple times
            for (let scroll = 0; scroll < maxScrolls; scroll++) {

                // Get the count of currently rendered items
                const count = await items.count();

                // Iterate through each visible item
                for (let i = 0; i < count; i++) {

                    // Get the individual lookup item
                    const item = items.nth(i);

                    // Get the text content container inside the item
                    const content = item.locator('.dx-item-content');

                    // Skip the item if it is not visible
                    if (!(await content.isVisible())) continue;

                    // Read and trim the displayed text
                    const text = (await content.innerText()).trim();

                    // Check if the item text matches
                    if (text.includes(optionText)) {

                        // Ensure the matched item is inside the viewport
                        await content.scrollIntoViewIfNeeded();

                        // Hover over the item
                        await content.hover();

                        // Click the matched lookup value
                        await content.click();

                        // Exit once the option is selected
                        return;
                    }
                }

                // Scroll the lookup list to load more items
                await list.evaluate(el => el.scrollBy(0, 300));

                // Small wait to allow new items to render
                await this.page.waitForTimeout(300);
            }

            // Throw error if lookup value is not found after all scroll attempts
            throw new Error(`Lookup value not found: ${optionText}`);
        });
    }

    async openLookupAndSelectValue(lookupLabel, value) {
        try{
        const lookupButton = this.page.locator(`[id*="${lookupLabel}IdLookup_B-1Img"]`);
        await lookupButton.click();
        await this.page.waitForTimeout(500);
        // 2. Handle the input field
        const inputField = this.page.locator(`input[id*="${lookupLabel}IdLookup_I"]`);
        await inputField.click();
        await inputField.clear();

        await inputField.pressSequentially(value, { delay: 30 });
        await this.page.waitForTimeout(500);

        const targetCell = this.page.locator('td[id*="tcrow0"]')
            .filter({ hasText: value })
            .first();

        await targetCell.waitFor({ state: 'visible', timeout: 3000 });
        await targetCell.click();
        await this.page.waitForTimeout(500);
        }catch(error){
            throw new Error(`Value not found in lookup: '${value}'`);
        }
    }

    async openLookupAndSelectItem(lookupLabel, value) {
        try{
        const lookupButton = this.page.locator(`[id*="${lookupLabel}_B-1Img"]`);
        await lookupButton.click();
        await this.page.waitForTimeout(500);

        const item = this.page.locator('tr.dxeListBoxItemRow_Office365')
        .filter({ hasText: value })
        .first();

        // Ensure the item is visible before clicking
        await item.waitFor({ state: 'visible', timeout: 3000 });
        await item.click();
        await this.page.waitForTimeout(500);
        }catch(error){
            throw new Error(`Value not found in lookup: '${value}'`);
        }
    }
    
}