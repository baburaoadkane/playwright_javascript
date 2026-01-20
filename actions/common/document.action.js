import { LookupAction } from './lookup.action';

export class DocumentAction {
    constructor(page) {
        this.page = page;
        this.lookupAction = new LookupAction(page);

        // Locators
        this.documentType = this.page.locator("[id*='DocumentTypeId']");
        this.documentNumber = this.page.locator('input[id*="DocumentNumber"]');
        this.dateOfIssue = this.page.locator('input[id*="DateOfIssue"]');
        this.placeOfIssue = this.page.locator('input[id*="PlaceOfIssue"]');
        this.dateOfExpiry = this.page.locator('input[id*="DateOfExpiry"]');
        this.addAttachmentBtn = this.page.getByRole('button', { name: 'Add Attachment…' });
    }

    async clickDocumentType() {
        await this.documentType.click();
        await this.page.waitForTimeout(1000);
    }

    async selectDocumentType(value) {
        await this.clickDocumentType();
        await this.lookupAction.selectLookupOption(value);
    }

    async fillDocumentNumber(value) {
        await this.documentNumber.fill(value);
    }

    async fillDateOfIssue(value) {
        await this.dateOfIssue.fill(value);
    }

    async fillPlaceOfIssue(value) {
        await this.placeOfIssue.fill(value);
    }

    async fillDateOfExpiry(value) {
        await this.dateOfExpiry.fill(value);
    }

    async clickOnAddAttachment() {
        await this.addAttachmentBtn.click();
    }
}