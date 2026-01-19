import { test } from '@playwright/test';

export class MasterHeaderAction {
    constructor(page) {
        this.page = page;
    }

    /**
     * Enters value into Code field.
     * Tries accessible textbox first, falls back to ID match.
     *
     * @param {string} code - Code value to be entered.
     */
    async fillCode(code) {
        await test.step(`Fill Code field with value: ${code}`, async () => {
            const codeField = this.page.getByRole('textbox', { name: 'Code' });

            if (await codeField.isVisible().catch(() => false)) {
                await codeField.fill(code);
            } else {
                await this.page.locator('input[id*="Code"]').fill(code);
            }
        });
    }

    /**
     * Enters value into Name field.
     * Uses the first visible Name input.
     *
     * @param {string} name - Name value to be entered.
     */
    async fillName(name) {
        await test.step(`Fill Name field with value: ${name}`, async () => {
            const nameField = this.page.getByRole('textbox', { name: 'Name' });

            if (await nameField.isVisible().catch(() => false)) {
                await nameField.fill(name);
            } else {
                await this.page.locator('input[id*="Name"]').first().fill(name);
            }
        });
    }

    /**
     * Enters value into Name Arabic field.
     *
     * @param {string} nameArabic - Arabic name value.
     */
    async fillNameArabic(nameArabic) {
        await test.step(`Fill Name Arabic field with value: ${nameArabic}`, async () => {
            await this.page.locator('input[id*="NameL2"]').fill(nameArabic);
        });
    }

    /**
     * Enters value into Description field.
     *
     * @param {string} description - Description text.
     */
    async fillDescription(description) {
        await test.step(`Fill Description field with value: ${description}`, async () => {
            await this.page.locator('textarea[id*="Description"]').fill(description);
        });
    }
}