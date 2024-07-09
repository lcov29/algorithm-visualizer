/**
 * Returns a random list item or null if the list is empty.
 */
export type IRandomListItemSelector = <T>(list: T[]) => NonNullable<T> | null;
