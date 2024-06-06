export type RandomEntryItemSelector<T> = (list: T[]) => NonNullable<T> | null;

/**
 * Returns a random list entry or null if the list is empty.
 */
export function selectRandomEntryFrom<T>(list: T[]) {
  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
}
