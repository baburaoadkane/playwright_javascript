export class ValidationHelper {

  /**
   * Checks whether the given value is a non-empty, non-whitespace string.
   *
   * @param {*} value - Value to validate
   * @returns {boolean} 
   * true  → value is a string and contains non-whitespace characters  
   * false → value is null, undefined, not a string, or only whitespace
   *
   * @example
   * ValidationHelper.isNonEmptyString('ABC');   // true
   * ValidationHelper.isNonEmptyString('   ');   // false
   * ValidationHelper.isNonEmptyString(null);    // false
   * ValidationHelper.isNonEmptyString(123);     // false
   */
  static isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  /**
   * Checks if number is NOT null, NOT undefined, NOT NaN.
   * Allows zero only if explicitly permitted.
   *
   * @param {number} value - Number to validate
   * @param {boolean} allowZero - Whether zero is considered valid (default: false)
   * @returns {boolean}
   * 
   * @example
   * ValidationHelper.isNumberValid(10);          // true
   * ValidationHelper.isNumberValid(0);           // false
   * ValidationHelper.isNumberValid(0, true);     // true
   * ValidationHelper.isNumberValid(null);        // false
   * ValidationHelper.isNumberValid(NaN);         // false
   */
  static isNumberValid(value, allowZero = false) {
    if (value === null || value === undefined) return false;
    if (typeof value !== 'number') return false;
    if (Number.isNaN(value)) return false;
    if (!allowZero && value === 0) return false;
    return true;
  }

  /**
   * Checks if number is greater than zero.
   *
   * @param {number} value
   * @returns {boolean}
   * 
   * @example
   * ValidationHelper.isNumberGreaterThanZero(5);    // true
   * ValidationHelper.isNumberGreaterThanZero(0);    // false
   * ValidationHelper.isNumberGreaterThanZero(-1);   // false
   */
  static isNumberGreaterThanZero(value) {
    return this.isNumberValid(value) && value > 0;
  }

  /**
   * Checks if number is zero or greater (>= 0).
   *
   * @param {number} value
   * @returns {boolean}
   * 
   * @example
   * ValidationHelper.isNumberZeroOrPositive(5);     // true
   * ValidationHelper.isNumberZeroOrPositive(0);     // true
   * ValidationHelper.isNumberZeroOrPositive(-1);    // false
   */
  static isNumberZeroOrPositive(value) {
    return this.isNumberValid(value, true) && value >= 0;
  }

}