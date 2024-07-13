import { IIntegerValidator } from '../../../../contracts/cross-cutting-concerns/data-validation';
import { InvalidArgumentError } from '../../../../contracts/cross-cutting-concerns/error-handling';
import { getRandomIntegerBetween } from '../src/random-integer-generator';

function getMockValidatorReturning(result: boolean) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValidInteger: (input: number) => result,
  } as IIntegerValidator;
}

describe('getRandomIntegerBetween()', () => {
  it('throws an invalid argument error if the isValidInteger check fails for the argument min', () => {
    expect(() => {
      getRandomIntegerBetween({
        min: 3.14,
        max: 4,
        validator: {
          isValidInteger: input => input !== 3.14,
        } as IIntegerValidator,
      });
    }).toThrow(
      new InvalidArgumentError({
        message: 'Argument min is not an integer',
        args: [3.14],
      }),
    );
  });

  it('throws an invalid argument error if the argument min is greater than the argument max', () => {
    expect(() =>
      getRandomIntegerBetween({
        min: 5,
        max: 2,
        validator: getMockValidatorReturning(true),
      }),
    ).toThrow(
      new InvalidArgumentError({
        message: 'Argument min is greater than the argument max',
        args: [5, 2],
      }),
    );
  });

  it('returns an integer within the specified range', () => {
    const randomPositiveInteger = getRandomIntegerBetween({
      min: 2,
      max: 5,
      validator: getMockValidatorReturning(true),
    });
    const randomNegativeInteger = getRandomIntegerBetween({
      min: -6,
      max: -2,
      validator: getMockValidatorReturning(true),
    });

    expect(randomPositiveInteger).toBeGreaterThanOrEqual(2);
    expect(randomPositiveInteger).toBeLessThanOrEqual(5);
    expect(randomNegativeInteger).toBeGreaterThanOrEqual(-6);
    expect(randomNegativeInteger).toBeLessThanOrEqual(-2);
  });

  it('returns the argument value when both arguments are equal', () => {
    expect(
      getRandomIntegerBetween({
        min: 4,
        max: 4,
        validator: getMockValidatorReturning(true),
      }),
    ).toBe(4);
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
      const result = getRandomIntegerBetween({
        min: 1,
        max: 4,
        validator: getMockValidatorReturning(true),
      });
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
      resultSet.add(
        getRandomIntegerBetween({
          min: 1,
          max: 4,
          validator: getMockValidatorReturning(true),
        }),
      );
    }
    const results = [...resultSet].sort();
    expect(results).toEqual([1, 2, 3, 4]);
  });
});
