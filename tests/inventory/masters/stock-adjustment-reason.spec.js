import { test, expect } from '../../../hooks/test.hooks.js';
import { ENTITY } from '../../../constants/entities.js';
import { LISTING_COLUMN_INDEX } from '../../../constants/listing-columns.js';
import { MENU_OPTION } from '../../../constants/menu-options.js';
import { LOOKUP_VIEW } from '../../../constants/lookup-view.js';
import { ValidationHelper } from '../../../utils/validation.util.js';
import { SummaryHelper } from '../../../utils/summary.util.js';
import { StockAdjustmentReasonPage } from '../../../actions/pages/inventory/masters/stock-adjustment-reason.page.js';
import entityData from '../../../test-data/inventory/masters/stock-adjustment-reason.json';

// ===== Constants =====
const ENTITY_NAME = ENTITY.STOCK_ADJUSTMENT_REASON;

test.describe(`${ENTITY_NAME} | CRUD Operations`, () => {

    let entityPage;

    test.beforeEach(async ({ app, inventoryModule }) => {
        entityPage = new StockAdjustmentReasonPage(app.page);
        await app.menu.clickLeftMenuOption(MENU_OPTION.SETUPS);
        await app.setup.navigateToMaster(ENTITY_NAME);
    });

    test(`${ENTITY_NAME} | Validate | Duplicate code -> Validation error displayed`,
        { tag: ['@inventory', '@stock-adjustment-reason', '@validation', '@negative'] },
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

                SummaryHelper.logValidationSummary(summary);
                SummaryHelper.exportValidationSummary(summary);
            });
        }
    );

    test(`${ENTITY_NAME} | Validate | Duplicate name -> Validation error displayed`,
        { tag: ['@inventory', '@stock-adjustment-reason', '@validation', '@negative'] },
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

                SummaryHelper.logValidationSummary(summary);
                SummaryHelper.exportValidationSummary(summary);
            });
        }
    );

    test(`${ENTITY_NAME} | Create | Valid data -> Record(s) created successfully`,
        { tag: ['@inventory', '@stock-adjustment-reason', '@crud'] },
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
                    skippedRecords.push(entity?.name ?? 'UNKNOWN');
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

                    await test.step(`Open form in create mode: ${entity.name}`, async () => {
                        await app.menu.clickMenuOptionByTitle(MENU_OPTION.NEW);
                    });

                    await test.step(`Fill code: ${entity.code} if feature is true`, async () => {
                        if (entityData.feature?.allowCodeManual && entity.code) {
                            await app.header.fillCode(entity.code);
                        }
                    });

                    await test.step(`Fill name: ${entity.name}`, async () => {
                        await app.header.fillName(entity.name);
                    });

                    await test.step(`Open lookup and select document type: ${entity.documentType}`, async () => {
                        await app.lookup.openLookupAndSelectItem(LOOKUP_VIEW.DOCUMENT_TYPE, entity.documentType);
                    });

                    await test.step(`Open lookup and select adjustment type: ${entity.adjustmentType}`, async () => {
                        await app.lookup.openLookupAndSelectItem(LOOKUP_VIEW.ADJUSTMENT_TYPE, entity.adjustmentType);
                    });

                    await test.step('Fill optional fields (if provided)', async () => {
                        if (ValidationHelper.isNonEmptyString(entity.nameArabic)) {
                            await app.header.fillNameArabic(entity.nameArabic);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.positiveAdjustmentAccount)) {
                            await app.lookup.openLookupAndSelectValue(LOOKUP_VIEW.POSITIVE_ADJUSTMENT_ACCOUNT, entity.positiveAdjustmentAccount);
                        }

                        if (ValidationHelper.isNonEmptyString(entity.negativeAdjustmentAccount)) {
                            await app.lookup.openLookupAndSelectValue(LOOKUP_VIEW.NEGATIVE_ADJUSTMENT_ACCOUNT, entity.negativeAdjustmentAccount);
                        }
                    });

                    await test.step('Save the record', async () => {
                        await app.menu.clickTopMenuOption(MENU_OPTION.SAVE);
                    });

                    await test.step('Validate record created message', async () => {
                        await app.toast.assertTextToast('StockAdjustmentReason', 'Create');
                    });

                    createdRecords.push(entity.name);

                } catch (error) {
                    failedRecords.push(entity?.name);
                    console.error(`🔴 ${ENTITY_NAME} creation failed for: ${entity?.name}\n`, error);
                } finally {
                    await
                        app.menu.navigateBackToListing(ENTITY_NAME)
                            .catch(async () => {
                                console.warn('🔴 Navigation failed, reloading page');
                                await app.page.reload();
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

                SummaryHelper.logCrudSummary(summary);
                SummaryHelper.exportCrudSummary(summary);
            });

            if (failedRecords.length > 0) {
                throw new Error(
                    `🔴 ${ENTITY_NAME} creation failed for: ${failedRecords.join(', ')}`
                );
            }

        }
    );

    test(`${ENTITY_NAME} | Delete | Valid data -> Record(s) deleted successfully`,
        { tag: ['@inventory', '@stock-adjustment-reason', '@crud'] },
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
                SummaryHelper.logCrudSummary(summary);
                SummaryHelper.exportCrudSummary(summary);
            });

            if (failedRecords.length > 0) {
                throw new Error(
                    `🔴 ${ENTITY_NAME} deletion failed for: ${failedRecords.join(', ')}`
                );
            }
        }
    );

});