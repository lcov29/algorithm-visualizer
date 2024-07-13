/**
 * Returns a random list item or null if the list is empty.
 *
 * @throws InvalidArgumentError
 */
export type IRandomListItemSelector = <T>(list: T[]) => NonNullable<T> | null;
