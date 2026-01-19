import Messages from '../constants/toast-messages.js';
import { expect } from '@playwright/test';

const TOAST_TIMEOUT = 5000;

export class ToastHelper {
    constructor(page) {
        this.page = page;
        this.successToast = page.locator('.dx-toast-success');
        this.messageToast = page.locator('.dx-toast-message');
        this.validationSummary = page.locator('#ValidationSummary');
    }

    getMessage(entity, action) {
        const message = Messages?.[entity]?.[action];
        if (!message) {
            throw new Error(`Toast message not defined for ${entity}.${action}`);
        }
        return message;
    }

    async assertTextToast(entity, action) {
        const expectedMessage = this.getMessage(entity, action);
        await expect(
            this.page.getByText(expectedMessage, { exact: false }).first()
        ).toBeVisible({ timeout: TOAST_TIMEOUT });
    }

    async assertSuccessToast(entity, action) {
        const expectedMessage = this.getMessage(entity, action);
        const toast = this.successToast.first();
        await expect(toast).toBeVisible({ timeout: TOAST_TIMEOUT });
        await expect(toast).toContainText(expectedMessage);
    }

    async assertMessageToast(entity, action) {
        const expectedMessage = this.getMessage(entity, action);
        const toast = this.messageToast.first();
        await expect(toast).toBeVisible({ timeout: TOAST_TIMEOUT });
        await expect(toast).toContainText(expectedMessage);
    }

    async assertValidationMessage(message) {
        try {
            await expect(
                this.validationSummary.filter({ hasText: new RegExp(message, 'i') })
            ).toBeVisible({ timeout: TOAST_TIMEOUT });
        } catch (err) {
            throw new Error(`Validation message not found: ${message}`);
        }
    }
}