import { test } from '@playwright/test';
import { LookupAction } from './lookup.action';

export class DocumentAction {
    constructor(page) {
        this.page = page;

        this.lookup = new LookupAction(page);
    }

    /**
     * Clicks on the Document Type dropdown.
     */
    async clickDocumentType() {
        await test.step('Click on Document Type dropdown', async () => {
            await this.page.locator("[id*='DocumentTypeId']").click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Select the Document Type.
     */
    async selectDocumentType(value) {
        await test.step(`Select Document Type: ${value}`, async () => {
            await this.page.locator("[id*='DocumentTypeId']").click();
            // await this.page.waitForTimeout(1000);
            await this.lookup.selectLookupOption(value);
        });
    }

    /**
     * Fills the Document Number field with the provided value.
     *
     * @param {string} value - The document number to enter.
     */
    async fillDocumentNumber(value) {
        await test.step(`Fill Document Number with value: ${value}`, async () => {
            await this.page.locator('input[id*="DocumentNumber"]').fill(value);
        });
    }

    /**
     * Fills the Date of Issue field with the provided value.
     *
     * @param {string} value - The date of issue to enter (format: DD-MMM-YYYY).
     */
    async fillDateOfIssue(value) {
        await test.step(`Fill Date of Issue with value: ${value}`, async () => {
            await this.page.locator('input[id*="DateOfIssue"]').fill(value);
        });
    }

    /**
     * Fills the Place of Issue field with the provided value.
     *
     * @param {string} value - The place of issue to enter.
     */
    async fillPlaceOfIssue(value) {
        await test.step(`Fill Place of Issue with value: ${value}`, async () => {
            await this.page.locator('input[id*="PlaceOfIssue"]').fill(value);
        });
    }

    /**
     * Fills the Date of Expiry field with the provided value.
     *
     * @param {string} value - The expiry date to enter (format: DD-MMM-YYYY).
     */
    async fillDateOfExpiry(value) {
        await test.step(`Fill Date of Expiry with value: ${value}`, async () => {
            await this.page.locator('input[id*="DateOfExpiry"]').fill(value);
        });
    }

    /**
     * Clicks on the 'Add Attachment' button to add a new document attachment.
     */
    async clickOnAddAttachment() {
        await test.step('Click on Add Attachment button', async () => {
            await this.page.getByRole('button', { name: 'Add Attachment…' }).click();
        });
    }
}