import { IRandomListItemSelector } from '@algorithm-visualizer/randomization-contract';

/**
 * Returns a random list item or null if the list is empty.
 */
export const getRandomListItem: IRandomListItemSelector = <T>(list: T[]) => {
  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
};
