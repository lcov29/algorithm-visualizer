export interface IIntegerValidator {
  /**
   * Checks if input is a valid integer
   */
  isValidInteger(input: number): boolean;

  /**
   * Checks if input is a valid integer greater than zero.
   */
  isValidPositiveInteger(input: number): boolean;

  /**
   * Checks if input is a valid integer greater or equal zero.
   */
  isValidNonNegativeInteger(input: number): boolean;

  /**
   * Checks if input is a valid integer lesser than zero.
   */
  isValidNegativeInteger(input: number): boolean;
}
