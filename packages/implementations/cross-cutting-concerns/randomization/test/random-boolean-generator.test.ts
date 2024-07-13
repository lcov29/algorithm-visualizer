import { IIntegerValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

import { getRandomBoolean } from '../src/random-boolean-generator';

function getMockValidatorReturning(result: boolean) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValidNonNegativeInteger: (input: number) => result,
  } as IIntegerValidator;
}

describe('getRandomBoolean()', () => {
  it('throws an invalid argument error if the isValidNonNegativeInteger check fails', () => {
    expect(() =>
      getRandomBoolean({
        probabilityTrueInPercent: -1,
        validator: getMockValidatorReturning(false),
      }),
    ).toThrow(
      new InvalidArgumentError({
        message:
          'Argument probabilityTrueInPercent is not a non negative integer',
        args: [-1],
      }),
    );
  });

  it('throws an invalid argument error if the argument is greater than 100', () => {
    expect(() =>
      getRandomBoolean({
        probabilityTrueInPercent: 105,
        validator: getMockValidatorReturning(true),
      }),
    ).toThrow(
      new InvalidArgumentError({
        message: 'Argument probabilityTrueInPercent is greater than 100',
        args: [105],
      }),
    );
  });

  describe('return value', () => {
    it('is true when argument probabilityTrueInPercent is 100', () => {
      for (let i = 0; i < 500; i++) {
        expect(
          getRandomBoolean({
            probabilityTrueInPercent: 100,
            validator: getMockValidatorReturning(true),
          }),
        ).toBe(true);
      }
    });

    it('is false when argument probabilityTrueInPercent is 0', () => {
      for (let i = 0; i < 500; i++) {
        expect(
          getRandomBoolean({
            probabilityTrueInPercent: 0,
            validator: getMockValidatorReturning(true),
          }),
        ).toBe(false);
      }
    });

    it('is within the specified probability', () => {
      const resultCounter = new Map<boolean, number>([
        [true, 0],
        [false, 0],
      ]);
      const probabilityTrueInPercent = 75;
      const executionNumber = 10_000;
      const tolerableSpreadInPercent = 2;

      for (let i = 0; i < executionNumber; i++) {
        const result = getRandomBoolean({
          probabilityTrueInPercent,
          validator: getMockValidatorReturning(true),
        });
        const counter = resultCounter.get(result)!;
        resultCounter.set(result, counter + 1);
      }

      const percentTrue = (resultCounter.get(true)! / executionNumber) * 100;
      const percentFalse = (resultCounter.get(false)! / executionNumber) * 100;

      expect(percentTrue).toBeGreaterThanOrEqual(
        probabilityTrueInPercent - tolerableSpreadInPercent,
      );
      expect(percentTrue).toBeLessThanOrEqual(
        probabilityTrueInPercent + tolerableSpreadInPercent,
      );
      expect(percentFalse).toBeGreaterThanOrEqual(
        100 - probabilityTrueInPercent - tolerableSpreadInPercent,
      );
      expect(percentFalse).toBeLessThanOrEqual(
        100 - probabilityTrueInPercent + tolerableSpreadInPercent,
      );
    });
  });
});
