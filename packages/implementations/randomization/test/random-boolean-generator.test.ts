import { getRandomBoolean } from '../src/random-boolean-generator';

describe('getRandomBoolean()', () => {
  it('throws an error if argument is negative', () => {
    expect(() => getRandomBoolean(-1)).toThrow(
      new RangeError('Argument probabilityTrueInPercent is negative'),
    );
  });

  it('throws an error if argument is greater than 100', () => {
    expect(() => getRandomBoolean(103)).toThrow(
      new RangeError('Argument probabilityTrueInPercent is greater than 100'),
    );
  });

  describe('return value', () => {
    it('is true when argument probabilityTrueInPercent is 100', () => {
      for (let i = 0; i < 500; i++) {
        expect(getRandomBoolean(100)).toBe(true);
      }
    });

    it('is false when argument probabilityTrueInPercent is 0', () => {
      for (let i = 0; i < 500; i++) {
        expect(getRandomBoolean(0)).toBe(false);
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
        const result = getRandomBoolean(probabilityTrueInPercent);
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
