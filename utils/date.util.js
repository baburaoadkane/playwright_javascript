export class DateHelper {

    /**
     * Returns a formatted date in DD-MM-YYYY format.
     * Supports past and future dates.
     *
     * @param {number} addDays - Days to add (can be negative)
     * @returns {string} Formatted date (DD-MM-YYYY)
     */
    static getDate(addDays = 0) {
        const date = new Date();
        date.setDate(date.getDate() + addDays);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

}
