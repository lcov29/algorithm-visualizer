export interface IFunctionValidator {
  /**
   * Checks if input is a function
   */
  isFunction<T>(input: T): boolean;
}
