export type RandomListItemSelector = <T>(list: T[]) => NonNullable<T> | null;

/**
 * Returns a random list item or null if the list is empty.
 */
export function getRandomListItem<T>(list: T[]) {
  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
}
