/**
 * Returns a random list item or null if the list is empty.
 *
 * @throws InvalidArgumentError
 */
export type RandomListItemSelector = <T>(list: T[]) => NonNullable<T> | null;
