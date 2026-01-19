/**
 * ENTITY
 * -------
 * Centralized list of all master/entity names used across the application.
 * 
 * Purpose:
 * - Avoid hard-coded strings in tests
 * - Ensure consistency in test names, logs, and reports
 * - Easy maintenance when entity names change
 */
export const ENTITY = Object.freeze({
    // Inventory & Stock
    ITEM: 'Item',
    WAREHOUSE: 'Warehouse',
    STOCK_COUNT_BATCH: 'Stock Count Batch',
    STOCK_ADJUSTMENT_REASON: 'Stock Adjustment Reason',
    DOCUMENT_TYPE: 'Document Type',

    // Sales
    CUSTOMER: 'Customer',
    SALESMAN: 'Salesman',
    PRICE_LIST: 'Price List',
    PAYMENT_METHOD: 'Payment Method',
    

    // Purchase
    SUPPLIER: 'Supplier',
    CHARGE: 'Charge',
    PAYMENT_TERM: 'Payment Term',

    // Accounting
    FINANCIAL_DIMENSION: 'Financial Dimension'
});

