import { test } from '@playwright/test';

export class MasterHeaderAction {
    constructor(page) {
        this.page = page;
    }

    /**
     * Enters the given value into the Code input field.
     *
     * This method locates the Code textbox using a partial ID match
     * and fills it with the provided code value.
     *
     * @param {string} option - The code value to be entered.
     */
    async fillCode(option) {
        await test.step(`Fill Code field with value: ${option}`, async () => {
            await this.page.locator('input[id*="Code"]').fill(option);
        });
    }

    /**
     * Enters the given value into the Code input field.
     *
     * This method locates the Code textbox using a partial ID match
     * and fills it with the provided code value.
     *
     * @param {string} option - The code value to be entered.
     */
    async fillCodeIntoTextBox(option) {
        await test.step(`Fill Code field with value: ${option}`, async () => {
            await this.page.getByRole('textbox', { name: 'Code' }).fill(option);
        });
    }

    /**
     * Enters the given value into the name input field.
     *
     * This method locates the Name textbox using a partial ID match
     * and fills it with the provided name value.
     * 
     * Multiple Name inputs exist in DOM; using first visible one
     *
     * @param {string} option - The name value to be entered.
     */
    async fillName(option) {
        await test.step(`Fill Name field with value: ${option}`, async () => {
            await this.page.locator('input[id*="Name"]').first().fill(option);
        });
    }

    /**
     * Enters the given value into the name arabic input field.
     *
     * This method locates the Name Arabic textbox using a partial ID match
     * and fills it with the provided name arabic value.
     *
     * @param {string} option - The name arabic value to be entered.
     */
    async fillNameArabic(option) {
        await test.step(`Fill Name Arabic field with value: ${option}`, async () => {
            await this.page.locator('input[id*="NameL2"]').fill(option);
        });
    }

    /**
     * Enters the given value into the description textarea field.
     *
     * This method locates the Description textbox using a partial ID match
     * and fills it with the provided description value.
     *
     * @param {string} option - The description value to be entered.
     */
    async fillDescription(option) {
        await test.step(`Fill Description field with value: ${option}`, async () => {
            await this.page.locator('textarea[id*="Description"]').fill(option);
        });
    }
}