import { test, expect } from '../../../hooks/test.hooks.js';
import { ENTITY } from '../../../constants/entities.js';
import { LISTING_COLUMN_INDEX } from '../../../constants/listing-columns.js';
import { MENU_OPTION } from '../../../constants/menu-options.js';
import { ValidationHelper } from '../../../utils/validation.util.js';
import { SummaryHelper } from '../../../utils/summary.util.js';
import { DocumentTypePage } from '../../../actions/pages/inventory/masters/document-type.page.js';
import entityData from '../../../test-data/inventory/masters/document-type.json';

// ===== Constants =====
const ENTITY_NAME = ENTITY.DOCUMENT_TYPE;

test.describe(`${ENTITY_NAME} | CRUD Operations`, () => {

    let entityPage;

    test.beforeEach(async ({ app, inventoryModule }) => {
        entityPage = new DocumentTypePage(app.page);
        await app.menu.clickLeftMenuOption(MENU_OPTION.SETUPS);
        await app.setup.navigateToMaster(ENTITY_NAME);
    });

    test(`${ENTITY_NAME} | Validate | Duplicate code -> Validation error displayed`,
        { tag: ['@inventory', '@document-type', '@validation', '@negative'] },
        async ({ app }) => {

            const entity = entityData?.validate;

            const canValidateDuplicateCode =
                entityData.feature?.allowCodeManual &&
                entity?.code &&
                entity?.name;

            test.skip(
                !canValidateDuplicateCode,
                'Skipping: allowCodeManual disabled or required test data missing'
            );

            try {
                await test.step('Open form in create mode', async () => {
                    await app.menu.clickMenuOptionByTitle(MENU_OPTION.NEW);
                });

                await test.step(`Enter duplicate code: ${entity.code}`, async () => {
                    await app.header.fillCode(entity.code);
                });

                await test.step(`Enter name: ${entity.name}`, async () => {
                    await app.header.fillName(entity.name);
                });

                await test.step('Save the record', async () => {
                    await app.menu.clickTopMenuOption(MENU_OPTION.SAVE);
                });

                await test.step('Verify duplicate code validation message', async () => {
                    await app.toast.assertValidationMessage(/already exists/i);
                });

            } finally {
                await test.step(`Navigate back to ${ENTITY_NAME} listing`, async () => {
                    await app.menu.navigateBackToListing(ENTITY_NAME);
                });
            }

            await test.step('Log and export validation summary', async () => {
                const summary = {
                    entityName: ENTITY_NAME,
                    type: 'Code',
                    value: entity.code
                };

                SummaryHelper.logAndExportValidationSummary(summary);
            });
        }
    );

    test(`${ENTITY_NAME} | Validate | Duplicate name -> Validation error displayed`,
        { tag: ['@inventory', '@document-type', '@validation', '@negative'] },
        async ({ app }) => {

            const entity = entityData.validate;

            test.skip(!entity?.name,
                'Skipping: Duplicate name test data is missing.'
            );

            try {
                await test.step('Open form in create mode', async () => {
                    await app.menu.clickMenuOptionByTitle(MENU_OPTION.NEW);
                });

                await test.step(`Enter duplicate name: ${entity.name}`, async () => {
                    await app.header.fillName(entity.name);
                });

                await test.step('Save the record', async () => {
                    await app.menu.clickTopMenuOption(MENU_OPTION.SAVE);
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
                const summary = {
                    entityName: ENTITY_NAME,
                    type: 'Name',
                    value: entity.name
                };

                SummaryHelper.logAndExportValidationSummary(summary);
            });
        }
    );

    test(`${ENTITY_NAME} | Create | Valid data -> Record(s) created successfully`,
        { tag: ['@inventory', '@document-type', '@crud'] },
        async ({ app }) => {

            test.skip(!entityData.create?.length, 'No data found');

            // ===== Record tracking =====
            const createdRecords = [];
            const skippedRecords = [];
            const failedRecords = [];

            // ===== Iterate to create =====
            for (const entity of entityData.create) {

                // ===== Skip invalid test data =====
                if (!entity?.name || (entityData.feature?.allowCodeManual && !entity.code)) {
                    skippedRecords.push(entity?.name ?? 'N/A');
                    console.warn(`⚠️ Create skipped due to missing required data`, entity);
                    continue;
                }

                // ===== Skip if already exists =====
                const exists = await app.listing.isRecordVisibleByExactText(entity.name, LISTING_COLUMN_INDEX.NAME);
                if (exists) {
                    skippedRecords.push(entity.name);
                    console.warn(`⚠️ Skipped: ${ENTITY_NAME} already exists → ${entity.name}`);
                    continue;
                }

                try {

                    await test.step('Open form in create mode', async () => {
                        await app.menu.clickMenuOptionByTitle(MENU_OPTION.NEW);
                    });

                    await test.step('Fill code (if manual code feature enabled)', async () => {
                        if (entityData.feature?.allowCodeManual && entity.code) {
                            await app.header.fillCode(entity.code);
                        }
                    });

                    await test.step(`Fill name: ${entity.name}`, async () => {
                        await app.header.fillName(entity.name);
                    });

                    await test.step('Fill optional fields (if provided)', async () => {
                        if (ValidationHelper.isNonEmptyString(entity.nameArabic)) {
                            await app.header.fillNameArabic(entity.nameArabic);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.description)) {
                            await app.header.fillDescription(entity.description);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.expiryNotificationBeforeDays)) {
                            await entityPage.fillExpiryNotificationBeforeDays(entity.expiryNotificationBeforeDays);
                        }

                        if(entity.applicableCompanies?.length > 0){
                            await entityPage.selectApplicableCompanies(entity.applicableCompanies);
                        }
                        
                    });

                    await test.step('Save the record', async () => {
                        await app.menu.clickTopMenuOption(MENU_OPTION.SAVE);
                    });

                    await test.step('Validate record created success message', async () => {
                        await app.toast.assertTextToast('DocumentType', 'Create');
                    });

                    createdRecords.push(entity.name);

                } catch (error) {
                    failedRecords.push(entity?.name);
                    console.error(`🔴 ${ENTITY_NAME} creation failed for: ${entity?.name}\n`, error);
                } finally {
                    await app.menu
                        .navigateBackToListing(ENTITY_NAME)
                        .catch(async () => {
                            console.warn('🔴 Navigation failed, reloading page');
                            await app.page.reload();                            
                            await app.page.waitForLoadState('networkidle');
                        });
                }
            }

            await test.step('Log and export crud summary', async () => {
                const summary = {
                    entityName: ENTITY_NAME,
                    action: 'Create',
                    successRecords: createdRecords,
                    skippedRecords: skippedRecords,
                    failedRecords: failedRecords,
                    totalCount: entityData.create.length
                };

                SummaryHelper.logAndExportCrudSummary(summary);
            });

            if (failedRecords.length > 0) {
                throw new Error(
                    `🔴 ${ENTITY_NAME} creation failed for: ${failedRecords.join(', ')}`
                );
            }

        }
    );

    test(`${ENTITY_NAME} | Update | Valid data -> Record(s) updated successfully`,
        { tag: ['@inventory', '@document-type', '@crud'] },
        async ({ app }) => {

            test.skip(!entityData.update?.length, 'No data found');

            // ===== Record tracking =====
            const updatedRecords = [];
            const skippedRecords = [];
            const failedRecords = [];

            // ===== Iterate to update =====
            for (const entity of entityData.update) {

                // ===== Skip invalid test data =====
                if (
                    !entity?.name ||
                    !entity?.updatedName ||
                    (entityData.feature?.allowCodeManual && !entity.updatedCode)
                ) {
                    skippedRecords.push(entity?.name ?? 'UNKNOWN');
                    console.warn(`⚠️ Update skipped due to missing required data`, entity);
                    continue;
                }

                // ===== Skip if record does NOT exist =====
                const exists = await app.listing.isRecordVisibleByExactText(entity.name, LISTING_COLUMN_INDEX.NAME);
                if (!exists) {
                    skippedRecords.push(entity.name);
                    console.warn(`⚠️ Skipped: ${ENTITY_NAME} does not exist → ${entity.name}`);
                    continue;
                }

                try {

                    await test.step(`Select the record to update: ${entity.name}`, async () => {
                        await app.listing.selectRecordByName(entity.name);
                    });

                    await test.step('Open form in edit mode', async () => {
                        await app.menu.clickMenuOptionByTitle(MENU_OPTION.EDIT);
                    });

                    await test.step(`Fill new code: ${entity.updatedCode} if feature is true`, async () => {
                        if (entityData.feature?.allowCodeManual && entity.updatedCode) {
                            await app.header.fillCode(entity.updatedCode);
                        }
                    });

                    await test.step(`Fill new name: ${entity.updatedName}`, async () => {
                        await app.header.fillName(entity.updatedName);
                    });

                    await test.step('Fill optional fields (if provided)', async () => {
                        if (ValidationHelper.isNonEmptyString(entity.nameArabic)) {
                            await app.header.fillNameArabic(entity.nameArabic);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.description)) {
                            await app.header.fillDescription(entity.description);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.expiryNotificationBeforeDays)) {
                            await entityPage.fillExpiryNotificationBeforeDays(entity.expiryNotificationBeforeDays);
                        }

                        if(entity.applicableCompanies?.length > 0){
                            await entityPage.selectApplicableCompanies(entity.applicableCompanies);
                        }
                    });

                    await test.step('Save the record', async () => {
                        await app.menu.clickTopMenuOption(MENU_OPTION.SAVE);
                    });

                    await test.step(`Validate updated name: ${entity.updatedName}`, async () => {
                        await expect(app.page.locator("input[name='DocumentType.Name']")).toHaveValue(entity.updatedName);
                    });

                    updatedRecords.push(`${entity.name} → ${entity.updatedName}`);

                } catch (error) {
                    failedRecords.push(`${entity.name} → ${entity.updatedName}`);
                    console.error(`🔴 ${ENTITY_NAME} update failed for: ${entity?.name}\n`, error);
                } finally {
                    await app.menu
                        .navigateBackToListing(ENTITY_NAME)
                        .catch(async () => {
                            console.warn('🔴 Navigation failed, reloading page');
                            await app.page.reload();                            
                            await app.page.waitForLoadState('networkidle');
                        });
                }
            }

            await test.step('Log and export crud summary', async () => {

                const summary = {
                    entityName: ENTITY_NAME,
                    action: 'Update',
                    successRecords: updatedRecords,
                    skippedRecords: skippedRecords,
                    failedRecords: failedRecords,
                    totalCount: entityData.update.length
                };

                SummaryHelper.logAndExportCrudSummary(summary);
            });

            if (failedRecords.length > 0) {
                throw new Error(
                    `🔴 ${ENTITY_NAME} update failed for: ${failedRecords.join(', ')}`
                );
            }

        }
    );

    test(`${ENTITY_NAME} | Delete | Valid data -> Record(s) deleted successfully`,
        { tag: ['@inventory', '@document-type', '@crud'] },
        async ({ app }) => {

            test.skip(!entityData.delete?.length, 'No data found');

            // ===== Record tracking =====
            const deletedRecords = [];
            const skippedRecords = [];
            const failedRecords = [];

            // ===== Iterate & Delete =====
            for (const entity of entityData.delete) {

                if (!entity?.name) {
                    skippedRecords.push('UNKNOWN');
                    console.warn('⚠️ Delete skipped: missing document type name', entity);
                    continue;
                }

                const result = await app.masterDelete.safeDeleteByName({
                    entityName: ENTITY_NAME,
                    name: entity.name,
                    index: LISTING_COLUMN_INDEX.NAME,
                    retries: 1
                });

                if (result === 'deleted') {
                    deletedRecords.push(entity.name);
                } else if (result === 'skipped') {
                    skippedRecords.push(entity.name);
                } else if (result === 'failed') {
                    failedRecords.push(entity.name);
                }

            }

            await test.step('Log and export crud summary', async () => {
                const summary = {
                    entityName: ENTITY_NAME,
                    action: 'Delete',
                    successRecords: deletedRecords,
                    skippedRecords: skippedRecords,
                    failedRecords: failedRecords,
                    totalCount: entityData.delete.length
                };
                SummaryHelper.logAndExportCrudSummary(summary);
            });

            if (failedRecords.length > 0) {
                throw new Error(
                    `🔴 ${ENTITY_NAME} deletion failed for: ${failedRecords.join(', ')}`
                );
            }
        }
    );

});