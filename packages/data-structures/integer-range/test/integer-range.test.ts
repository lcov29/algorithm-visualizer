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
        new TypeError('Arguments must be of types number'),
      ],
      [
        'the max argument is not a number',
        { min: 5, max: 'foo' },
        new TypeError('Arguments must be of types number'),
      ],
      [
        'the min argument is not an integer',
        { min: 3.1415, max: 10 },
        new RangeError('Arguments must be integers'),
      ],
      [
        'the max argument is not an integer',
        { min: 1, max: 3.1415 },
        new RangeError('Arguments must be integers'),
      ],
      [
        'the min argument is a negative integer',
        { min: -1, max: 10 },
        new RangeError('Arguments must be positive numbers'),
      ],
      [
        'the max argument is a negative integer',
        { min: 1, max: -1 },
        new RangeError('Arguments must be positive numbers'),
      ],
      [
        'the min argument is greater than the max argument',
        { min: 3, max: 2 },
        new RangeError('Argument min must be greater or equal to argument max'),
      ],
    ])('throws an error when %s', (_, range, error) => {
      expect(() => new IntegerRange(range as unknown as IntegerRange)).toThrow(
        error,
      );
    });
  });

  describe('min()', () => {
    it('returns the valid min argument', () => {
      const range = new IntegerRange({ min: 1, max: 4 });
      expect(range.min).toBe(1);
    });
  });

  describe('max()', () => {
    it('returns the valid max argument', () => {
      const range = new IntegerRange({ min: 1, max: 4 });
      expect(range.max).toBe(4);
    });
  });
});
