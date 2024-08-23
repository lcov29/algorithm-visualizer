import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';

import { IntegerRange } from '../src/integer-range';

describe('IntegerRange', () => {
  const range = new IntegerRange({ min: 1, max: 4 });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validation', () => {
    it('accepts valid input', () => {
      expect(() => new IntegerRange({ min: 1, max: 10 })).not.toThrow();
    });

    describe.each([
      [
        'when the min argument is not a number',
        { min: 'foo', max: 10 },
        new InvalidArgumentError({
          message: 'Argument min is not an integer',
          args: ['foo'],
        }),
      ],
      [
        'when the max argument is not a number',
        { min: 5, max: 'foo' },
        new InvalidArgumentError({
          message: 'Argument max is not an integer',
          args: ['foo'],
        }),
      ],
      [
        'when the min argument is not an integer',
        { min: 3.1415, max: 10 },
        new InvalidArgumentError({
          message: 'Argument min is not an integer',
          args: [3.1415],
        }),
      ],
      [
        'when the max argument is not an integer',
        { min: 1, max: 3.1415 },
        new InvalidArgumentError({
          message: 'Argument max is not an integer',
          args: [3.1415],
        }),
      ],
      [
        'when the min argument is greater than the max argument',
        { min: 3, max: 2 },
        new InvalidArgumentError({
          message: 'Argument min is greater than argument max',
          args: [3, 2],
        }),
      ],
    ])('%s', (_, range, error) => {
      it('throws an invalid argument error', () => {
        expect(
          () => new IntegerRange(range as unknown as IntegerRange),
        ).toThrow(error);
      });
    });
  });

  describe.each([
    ['min', 1],
    ['max', 4],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(range[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      // @ts-expect-error invoke method by string name
      expect(() => (range[methodName] = expectedResult)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
