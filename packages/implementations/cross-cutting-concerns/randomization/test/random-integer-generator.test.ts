import { IIntegerValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

import { getRandomIntegerBetween } from '../src/random-integer-generator';

function getMockValidatorReturning(result: boolean) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValidInteger: (input: number) => result,
  } as IIntegerValidator;
}

describe('getRandomIntegerBetween()', () => {
  describe('Error handling', () => {
    describe.each([
      [
        'when the argument min is not an integer',
        3.14,
        {
          isValidInteger: input => Number.isInteger(input),
        } as IIntegerValidator,
        'Argument min is not an integer',
        [3.14],
      ],
      [
        'when the argument min is greater than the argument max',
        5,
        getMockValidatorReturning(true),
        'Argument min is greater than the argument max',
        [5, 4],
      ],
    ])('%s', (_, min, validator, expectedErrorMessage, expectedErrorArgs) => {
      it('throws an invalid argument error', () => {
        expect(() => {
          getRandomIntegerBetween({
            min,
            max: 4,
            validator,
          });
        }).toThrow(
          new InvalidArgumentError({
            message: expectedErrorMessage,
            args: expectedErrorArgs,
          }),
        );
      });
    });
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
