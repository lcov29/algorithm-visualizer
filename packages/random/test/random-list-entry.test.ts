import { selectRandomEntryFrom } from '../src/random-list-entry-selector';

describe('selectRandomItemFrom()', () => {
  const list = [1, 2, 3, 4];

  it('returns a random item from the list', () => {
    const item = selectRandomEntryFrom(list);
    expect(list.includes(item!)).toBe(true);
  });

  it('returns null if the specified list is empty', () => {
    const item = selectRandomEntryFrom([]);
    expect(item).toBeNull();
  });

  it('returns each list item with equal probability', () => {
    const resultCounter = new Map<number, number>([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
    const spreadTolerancePercentage = 5;
    const executionNumber = 10_000;

    const idealDistribution = Math.floor(executionNumber / resultCounter.size);
    const tolerableSpread = Math.floor(
      executionNumber * (spreadTolerancePercentage / 100),
    );
    const expectedDistributionRange = {
      min: idealDistribution - tolerableSpread,
      max: idealDistribution + tolerableSpread,
    };

    const isWithinDistributionRange = (resultCount: number) =>
      expectedDistributionRange.min <= resultCount &&
      resultCount <= expectedDistributionRange.max;

    for (let i = 0; i < executionNumber; i++) {
      const item = selectRandomEntryFrom(list)!;
      const counter = resultCounter.get(item)!;
      resultCounter.set(item, counter + 1);
    }

    expect(isWithinDistributionRange(resultCounter.get(1)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(2)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(3)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(4)!)).toBe(true);
  });
});
