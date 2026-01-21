import { test, expect } from '../../../hooks/test.hooks.js';
import { ENTITY } from '../../../constants/entities.js';
import { LISTING_COLUMN_INDEX } from '../../../constants/listing-columns.js';
import { ValidationHelper } from '../../../utils/validation.util.js';
import { SummaryHelper } from '../../../utils/summary.util.js';
import { DocumentTypePage } from '../../../actions/pages/inventory/masters/document-type.page.js';
import documentTypeData from '../../../test-data/inventory/masters/document-type.json';

// ===== Constants =====
const ENTITY_NAME = ENTITY.DOCUMENT_TYPE;

test.describe(`${ENTITY_NAME} | CRUD Operations`, () => {

    let documentTypePage;

    test.beforeEach(async ({ app, inventoryModule }) => {
        documentTypePage = new DocumentTypePage(app.page);
        await app.menu.clickLeftMenuOption('Setups');
        await app.setup.navigateToMaster(ENTITY_NAME);
    });    

    test.describe(`${ENTITY_NAME} | Validate`, () => {
        test.skip(
            !documentTypeData.feature?.allowCodeManual,
            'Setting → Allow code manual is OFF.'
        );

        test.skip(
            !documentTypeData.validate?.code || !documentTypeData.validate?.name,
            'Validation data missing: code or name.'
        );

        test(
            'Duplicate code -> Validation error displayed',
            { tag: ['@inventory', '@document-type', '@validation', '@negative'] },
            async ({ app }) => {

                const documentType = documentTypeData.validate;

                try {
                    await test.step('Open form in create mode', async () => {
                        await app.menu.clickMenuOptionByTitle('New');
                    });

                    await test.step(`Fill duplicate code: ${documentType.code}`, async () => {
                        await app.header.fillCode(documentType.code);
                    });

                    await test.step(`Fill name: ${documentType.name}`, async () => {
                        await app.header.fillName(documentType.name);
                    });

                    await test.step('Save record', async () => {
                        await app.menu.clickTopMenuOption('Save');
                    });

                    await test.step('Validate duplicate code error message', async () => {
                        await app.toast.assertValidationMessage(/duplicate code.*already exists/i);
                    });

                } finally {
                    await test.step(`Navigate back to listing of ${ENTITY_NAME}`, async () => {
                        await app.menu.navigateBackToListing(ENTITY_NAME);
                    });
                }

                await test.step('Log and export validation summary', async () => {
                    SummaryHelper.logValidationSummary({
                        entityName: ENTITY_NAME,
                        type: 'Code',
                        value: documentType.code
                    });

                    SummaryHelper.exportValidationSummary({
                        entityName: ENTITY_NAME,
                        type: 'Code',
                        value: documentType.code
                    });
                });
            }
        );
    });

    test.describe(`${ENTITY_NAME} | Validate`, () => {

        const documentType = documentTypeData.validate;

        test.skip(!documentType?.name, 'No data found.');

        test(
            'Duplicate name -> Validation error displayed',
            { tag: ['@inventory', '@document-type', '@validation', '@negative'] },
            async ({ app }) => {

                try {
                    await test.step('Open form in create mode', async () => {
                        await app.menu.clickMenuOptionByTitle('New');
                    });

                    await test.step(`Fill existing name: ${documentType.name}`, async () => {
                        await app.header.fillName(documentType.name);
                    });

                    await test.step('Save record', async () => {
                        await app.menu.clickTopMenuOption('Save');
                    });

                    await test.step('Validate duplicate name error message', async () => {
                        await app.toast.assertValidationMessage(/already exists/i);
                    });

                } finally {
                    await test.step(`Navigate back to listing of ${ENTITY_NAME}`, async () => {
                        await app.menu.navigateBackToListing(ENTITY_NAME);
                    });
                }

                await test.step('Log and export validation summary', async () => {
                    SummaryHelper.logValidationSummary({
                        entityName: ENTITY_NAME,
                        type: 'Name',
                        value: documentType.name
                    });

                    SummaryHelper.exportValidationSummary({
                        entityName: ENTITY_NAME,
                        type: 'Name',
                        value: documentType.name
                    });
                });
            }
        );
    });

    test.describe(`${ENTITY_NAME} | Create`, () => {
        test.skip(!documentTypeData.create?.length, 'No data found');
        test('Valid data -> Record(s) created successfully',
            { tag: ['@inventory', '@document-type', '@crud'] },
            async ({ app }) => {

                // ===== Record tracking =====
                const createdRecords = [];
                const skippedRecords = [];
                const failedRecords = [];

                // ===== Iterate to create =====
                for (const documentType of documentTypeData.create) {

                    // ===== Skip invalid test data =====
                    if (!documentType?.name || (documentTypeData.feature?.allowCodeManual && !documentType.code)) {
                        skippedRecords.push(documentType?.name ?? 'UNKNOWN');
                        console.warn(`⚠️ Create skipped due to missing required data`, documentType);
                        continue;
                    }

                    // ===== Skip if already exists =====
                    const exists = await app.listing.isRecordVisibleByExactText(documentType.name, LISTING_COLUMN_INDEX.NAME);
                    if (exists) {
                        skippedRecords.push(documentType.name);
                        console.warn(`⚠️ Skipped: ${ENTITY_NAME} already exists → ${documentType.name}`);
                        continue;
                    }

                    try {

                        await test.step('Open create form', async () => {
                            await app.menu.clickMenuOptionByTitle('New');
                        });

                        await test.step(`Fill code: ${documentType.code} if feature is true`, async () => {
                            if (documentTypeData.feature?.allowCodeManual && documentType.code) {
                                await app.header.fillCode(documentType.code);
                            }
                        });

                        await test.step(`Fill name: ${documentType.name}`, async () => {
                            await app.header.fillName(documentType.name);
                        });

                        await test.step('Fill optional fields (if provided)', async () => {
                            if (ValidationHelper.isNonEmptyString(documentType.nameArabic)) {
                                await app.header.fillNameArabic(documentType.nameArabic);
                            }

                            if (ValidationHelper.isNonEmptyString(documentType.description)) {
                                await app.header.fillDescription(documentType.description);
                            }

                            if (ValidationHelper.isNonEmptyString(documentType.expiryNotificationBeforeDays)) {
                                await documentTypePage.fillExpiryNotificationBeforeDays(documentType.expiryNotificationBeforeDays);
                            }

                            await documentTypePage.selectCompanies(documentType.applicableCompanies);
                        });

                        await test.step('Save record', async () => {
                            await app.menu.clickTopMenuOption('Save');
                        });

                        await test.step('Validate record created success message', async () => {
                            await app.toast.assertTextToast('DocumentType', 'Create');
                        });

                        createdRecords.push(documentType.name);

                    } catch (error) {
                        failedRecords.push(documentType?.name);
                        console.error(`🔴 ${ENTITY_NAME} creation failed for: ${documentType?.name}\n`, error);
                    } finally {
                        await app.menu
                            .navigateBackToListing(ENTITY_NAME)
                            .catch(async () => {
                                console.warn('🔴 Navigation failed, reloading page');
                                await app.page.reload();
                            });
                    }
                }

                await test.step('Log crud summary', async () => {
                    SummaryHelper.logCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Create',
                        successRecords: createdRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.create.length
                    });
                });

                await test.step('Export crud summary', async () => {
                    SummaryHelper.exportCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Create',
                        successRecords: createdRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.create.length
                    });
                });

                if (failedRecords.length > 0) {
                    throw new Error(
                        `🔴 ${ENTITY_NAME} creation failed for: ${failedRecords.join(', ')}`
                    );
                }

            });
    });

    test.describe(`${ENTITY_NAME} | Update`, () => {
        test.skip(!documentTypeData.update?.length, 'No data found');
        test('Valid data -> Record(s) updated successfully',
            { tag: ['@inventory', '@document-type', '@crud'] },
            async ({ app }) => {

                // ===== Record tracking =====
                const updatedRecords = [];
                const skippedRecords = [];
                const failedRecords = [];

                // ===== Iterate to update =====
                for (const documentType of documentTypeData.update) {

                    // ===== Skip invalid test data =====
                    if (
                        !documentType?.name ||
                        !documentType?.updatedName ||
                        (documentTypeData.feature?.allowCodeManual && !documentType.updatedCode)
                    ) {
                        skippedRecords.push(documentType?.name ?? 'UNKNOWN');
                        console.warn(`⚠️ Update skipped due to missing required data`, documentType);
                        continue;
                    }

                    // ===== Skip if record does NOT exist =====
                    const exists = await app.listing.isRecordVisibleByExactText(documentType.name, LISTING_COLUMN_INDEX.NAME);
                    if (!exists) {
                        skippedRecords.push(documentType.name);
                        console.warn(`⚠️ Skipped: ${ENTITY_NAME} does not exist → ${documentType.name}`);
                        continue;
                    }

                    try {

                        await test.step(`Select the record to update: ${documentType.name}`, async () => {
                            await app.listing.selectRecordByName(documentType.name);
                        });

                        await test.step('Open edit form', async () => {
                            await app.menu.clickMenuOptionByTitle('Edit');
                        });

                        await test.step(`Fill new code: ${documentType.updatedCode} if feature is true`, async () => {
                            if (documentTypeData.feature?.allowCodeManual && documentType.updatedCode) {
                                await app.header.fillCode(documentType.updatedCode);
                            }
                        });

                        await test.step(`Fill new name: ${documentType.updatedName}`, async () => {
                            await app.header.fillName(documentType.updatedName);
                        });

                        await test.step('Fill optional fields (if provided)', async () => {
                            if (ValidationHelper.isNonEmptyString(documentType.nameArabic)) {
                                await app.header.fillNameArabic(documentType.nameArabic);
                            }

                            if (ValidationHelper.isNonEmptyString(documentType.description)) {
                                await app.header.fillDescription(documentType.description);
                            }

                            if (ValidationHelper.isNonEmptyString(documentType.expiryNotificationBeforeDays)) {
                                await documentTypePage.fillExpiryNotificationBeforeDays(documentType.expiryNotificationBeforeDays);
                            }

                            await documentTypePage.selectCompanies(documentType.applicableCompanies);
                        });

                        await test.step('Save updated record', async () => {
                            await app.menu.clickTopMenuOption('Save');
                        });

                        await test.step(`Validate updated name: ${documentType.updatedName}`, async () => {
                            await expect(app.page.locator("input[name='DocumentType.Name']")).toHaveValue(documentType.updatedName);
                        });

                        updatedRecords.push(`${documentType.name} → ${documentType.updatedName}`);

                    } catch (error) {
                        failedRecords.push(`${documentType.name} → ${documentType.updatedName}`);
                        console.error(`🔴 ${ENTITY_NAME} update failed for: ${documentType?.name}\n`, error);
                    } finally {
                        await app.menu
                            .navigateBackToListing(ENTITY_NAME)
                            .catch(async () => {
                                console.warn('🔴 Navigation failed, reloading page');
                                await app.page.reload();
                            });
                    }
                }

                await test.step('Log crud summary', async () => {
                    SummaryHelper.logCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Update',
                        successRecords: updatedRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.update.length
                    });
                });

                await test.step('Export crud summary', async () => {
                    SummaryHelper.exportCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Update',
                        successRecords: updatedRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.update.length
                    });
                });

                if (failedRecords.length > 0) {
                    throw new Error(
                        `🔴 ${ENTITY_NAME} update failed for: ${failedRecords.join(', ')}`
                    );
                }

            });
    });

    test.describe(`${ENTITY_NAME} | Delete`, () => {
        test.skip(!documentTypeData.delete?.length, 'No data found');
        test('Valid data -> Record(s) deleted successfully',
            { tag: ['@inventory', '@document-type', '@crud'] },
            async ({ app }) => {

                // ===== Record tracking =====
                const deletedRecords = [];
                const skippedRecords = [];
                const failedRecords = [];

                // ===== Iterate & Delete =====
                for (const documentType of documentTypeData.delete) {

                    if (!documentType?.name) {
                        skippedRecords.push('UNKNOWN');
                        console.warn('⚠️ Delete skipped: missing document type name', documentType);
                        continue;
                    }

                    const result = await app.masterDelete.safeDeleteByName({
                        entityName: ENTITY_NAME,
                        name: documentType.name,
                        index: LISTING_COLUMN_INDEX.NAME,
                        retries: 1
                    });

                    if (result === 'deleted') {
                        deletedRecords.push(documentType.name);
                    } else if (result === 'skipped') {
                        skippedRecords.push(documentType.name);
                    } else if (result === 'failed') {
                        failedRecords.push(documentType.name);
                    }

                }

                await test.step('Log crud summary', async () => {
                    SummaryHelper.logCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Delete',
                        successRecords: deletedRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.delete.length
                    });
                });

                await test.step('Export crud summary', async () => {
                    SummaryHelper.exportCrudSummary({
                        entityName: ENTITY_NAME,
                        action: 'Delete',
                        successRecords: deletedRecords,
                        skippedRecords: skippedRecords,
                        failedRecords: failedRecords,
                        totalCount: documentTypeData.delete.length
                    });
                });

                if (failedRecords.length > 0) {
                    throw new Error(
                        `🔴 ${ENTITY_NAME} deletion failed for: ${failedRecords.join(', ')}`
                    );
                }
            });
    });

});