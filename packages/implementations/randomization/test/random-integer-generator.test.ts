import { getRandomIntegerBetween } from '../src/random-integer-generator';

describe('getRandomIntegerBetween()', () => {
  it('throws a range error when the argument min is greater than the argument max', () => {
    const expectedError = new RangeError(
      'The argument min is greater than the argument max',
    );
    expect(() => getRandomIntegerBetween(5, 2)).toThrow(expectedError);
  });

  it('returns an integer within the specified range', () => {
    const randomPositiveInteger = getRandomIntegerBetween(2, 5);
    const randomNegativeInteger = getRandomIntegerBetween(-6, -2);

    expect(randomPositiveInteger).toBeGreaterThanOrEqual(2);
    expect(randomPositiveInteger).toBeLessThanOrEqual(5);
    expect(randomNegativeInteger).toBeGreaterThanOrEqual(-6);
    expect(randomNegativeInteger).toBeLessThanOrEqual(-2);
  });

  it('returns the argument value when both arguments are equal', () => {
    expect(getRandomIntegerBetween(4, 4)).toBe(4);
  });

  it('returns every integer within the specified range with equal probability', () => {
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
      const result = getRandomIntegerBetween(1, 4);
      const counter = resultCounter.get(result)!;
      resultCounter.set(result, counter + 1);
    }

    expect(isWithinDistributionRange(resultCounter.get(1)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(2)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(3)!)).toBe(true);
    expect(isWithinDistributionRange(resultCounter.get(4)!)).toBe(true);
  });

  it('can return all integers within the specified range including the boundaries', () => {
    const resultSet = new Set();
    for (let i = 0; i < 10_000; i++) {
      resultSet.add(getRandomIntegerBetween(1, 4));
    }
    const results = [...resultSet].sort();
    expect(results).toEqual([1, 2, 3, 4]);
  });
});
