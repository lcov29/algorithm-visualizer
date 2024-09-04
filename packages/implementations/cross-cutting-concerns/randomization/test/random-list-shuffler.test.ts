import { IListValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

import { getRandomShuffledList } from '../src/random-list-shuffler';

function getMockValidatorReturning(result: boolean) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isList: <T>(input: T[]) => result,
  } as IListValidator;
}

describe('getRandomShuffledList()', () => {
  const list = [1, 2, 3, 4];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('throws an invalid argument error if the isList check fails for the argument list', () => {
    expect(() =>
      getRandomShuffledList({
        // @ts-expect-error list is required to be an array
        list: 'foo',
        validator: getMockValidatorReturning(false),
      }),
    ).toThrow(
      new InvalidArgumentError({
        message: 'Argument list is not an array',
        args: ['foo'],
      }),
    );
  });

  it('returns a shallow clone of the passed list', () => {
    const result = getRandomShuffledList({
      list,
      validator: getMockValidatorReturning(true),
    });
    result.push(10);
    expect(result).toContain(10);
    expect(list).toEqual([1, 2, 3, 4]);
    expect(list).not.toContain(10);
  });

  it('sorts the list elements in a random order', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomShuffledList({
        list,
        validator: getMockValidatorReturning(true),
      });
      expect(result).toHaveLength(4);
      expect(result).toContain(1);
      expect(result).toContain(2);
      expect(result).toContain(3);
      expect(result).toContain(4);
      expect(result).not.toEqual([1, 2, 3, 4]);
    }
  });

  // it('returns a random item from the list', () => {
  //   const item = getRandomListItem({
  //     list,
  //     validator: getMockValidatorReturning(true),
  //   });
  //   expect(list.includes(item!)).toBe(true);
  // });

  // it('returns null if the specified list is empty', () => {
  //   const item = getRandomListItem({
  //     list: [],
  //     validator: getMockValidatorReturning(true),
  //   });
  //   expect(item).toBeNull();
  // });

  // it('returns each list item with equal probability', () => {
  //   const resultCounter = new Map<number, number>([
  //     [1, 0],
  //     [2, 0],
  //     [3, 0],
  //     [4, 0],
  //   ]);
  //   const spreadTolerancePercentage = 5;
  //   const executionNumber = 10_000;

  //   const idealDistribution = Math.floor(executionNumber / resultCounter.size);
  //   const tolerableSpread = Math.floor(
  //     executionNumber * (spreadTolerancePercentage / 100),
  //   );
  //   const expectedDistributionRange = {
  //     min: idealDistribution - tolerableSpread,
  //     max: idealDistribution + tolerableSpread,
  //   };

  //   const isWithinDistributionRange = (resultCount: number) =>
  //     expectedDistributionRange.min <= resultCount &&
  //     resultCount <= expectedDistributionRange.max;

  //   for (let i = 0; i < executionNumber; i++) {
  //     const item = getRandomListItem({
  //       list,
  //       validator: getMockValidatorReturning(true),
  //     })!;
  //     const counter = resultCounter.get(item)!;
  //     resultCounter.set(item, counter + 1);
  //   }

  //   expect(isWithinDistributionRange(resultCounter.get(1)!)).toBe(true);
  //   expect(isWithinDistributionRange(resultCounter.get(2)!)).toBe(true);
  //   expect(isWithinDistributionRange(resultCounter.get(3)!)).toBe(true);
  //   expect(isWithinDistributionRange(resultCounter.get(4)!)).toBe(true);
  // });
});
