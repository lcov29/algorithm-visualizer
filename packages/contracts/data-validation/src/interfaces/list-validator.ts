export interface IListValidator {
  /**
   * Checks if input is a list
   */
  isList<T>(input: T[]): boolean;

  /**
   * Checks if list is empty
   */
  isEmptyList<T>(input: T[]): boolean;
}
