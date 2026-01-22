/**
 * Lookup view identifiers
 * Used for opening and selecting values from lookup dialogs
 *
 * NOTE:
 * - Values must exactly match lookup view names used in UI
 * - Case-sensitive
 * - Centralized to avoid hardcoded strings in tests
 */

export const LOOKUP_VIEW = Object.freeze({
    DOCUMENT_TYPE: 'DocumentType',
    ADJUSTMENT_TYPE: 'AdjustmentType',
    POSITIVE_ADJUSTMENT_ACCOUNT: 'PositiveAdjustmentMainAccount',
    NEGATIVE_ADJUSTMENT_ACCOUNT: 'NegativeAdjustmentMainAccount'
});