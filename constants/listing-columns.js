/**
 * Listing table column indexes
 * Used for searching, selecting, and validating records in master listings
 *
 * NOTE:
 * - Index values are 1-based / grid-based (not array indexes)
 * - Must stay in sync with UI table column order
 */

export const LISTING_COLUMN_INDEX = Object.freeze({
    CODE: 2,
    NAME: 3
});