import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';

import { IntegerRange } from '../src/integer-range';

describe('IntegerRange', () => {
  describe('constructor()', () => {
    it('accepts valid input', () => {
      expect(() => new IntegerRange({ min: 1, max: 10 })).not.toThrow();
    });

    it.each([
      [
        'the min argument is not a number',
        { min: 'foo', max: 10 },
        new InvalidArgumentError({
          message: 'Argument min is not an integer',
          args: ['foo'],
        }),
      ],
      [
        'the max argument is not a number',
        { min: 5, max: 'foo' },
        new InvalidArgumentError({
          message: 'Argument max is not an integer',
          args: ['foo'],
        }),
      ],
      [
        'the min argument is not an integer',
        { min: 3.1415, max: 10 },
        new InvalidArgumentError({
          message: 'Argument min is not an integer',
          args: [3.1415],
        }),
      ],
      [
        'the max argument is not an integer',
        { min: 1, max: 3.1415 },
        new InvalidArgumentError({
          message: 'Argument max is not an integer',
          args: [3.1415],
        }),
      ],
      [
        'the min argument is greater than the max argument',
        { min: 3, max: 2 },
        new InvalidArgumentError({
          message: 'Argument min is greater than argument max',
          args: [3, 2],
        }),
      ],
    ])('throws an error when %s', (_, range, error) => {
      expect(() => new IntegerRange(range as unknown as IntegerRange)).toThrow(
        error,
      );
    });
  });

  describe('getter methods', () => {
    const range = new IntegerRange({ min: 1, max: 4 });

    describe.each([
      ['min', 1],
      ['max', 4],
    ])('%s()', (methodName, expectedValue) => {
      it(`returns the ${methodName} value`, () => {
        // @ts-expect-error reference to a method by its string name
        expect(range[methodName]).toBe(expectedValue);
      });
    });
  });

  describe('setter methods', () => {
    const range = new IntegerRange({ min: 1, max: 4 });

    describe.each([['min'], ['max']])('%s()', methodName => {
      it('throws an invalid operation error', () => {
        // @ts-expect-error reference to a method by its string name
        expect(() => (range[methodName] = 7)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      });
    });
  });
});
