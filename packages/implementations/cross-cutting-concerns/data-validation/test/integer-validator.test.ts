import { IntegerValidator } from '../src/integer-validator';

describe('IntegerValidator', () => {
  const validator = new IntegerValidator();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('isValidInteger()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for object input', {}, false],
      ['returns false for decimal input', 3.14, false],
      ['returns true for negative integer input', -4, true],
      ['returns true for positive integer input', 7, true],
      ['returns true for input zero', 0, true],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isValidInteger(input as number)).toBe(expectedResult);
    });
  });

  describe('isValidPositiveInteger()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for object input', {}, false],
      ['returns false for decimal input', 3.14, false],
      ['returns false for negative integer input', -4, false],
      ['returns true for positive integer input', 7, true],
      ['returns false for input zero', 0, false],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isValidPositiveInteger(input as number)).toBe(
        expectedResult,
      );
    });
  });

  describe('isValidNonNegativeInteger()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for object input', {}, false],
      ['returns false for decimal input', 3.14, false],
      ['returns false for negative integer input', -4, false],
      ['returns true for positive integer input', 7, true],
      ['returns true for input zero', 0, true],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isValidNonNegativeInteger(input as number)).toBe(
        expectedResult,
      );
    });
  });

  describe('isValidNegativeInteger()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for object input', {}, false],
      ['returns false for decimal input', 3.14, false],
      ['returns true for negative integer input', -4, true],
      ['returns false for positive integer input', 7, false],
      ['returns false for input zero', 0, false],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isValidNegativeInteger(input as number)).toBe(
        expectedResult,
      );
    });
  });
});
