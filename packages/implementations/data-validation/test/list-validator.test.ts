import { ListValidator } from '../src/list-validator';

describe('ListValidator', () => {
  const validator = new ListValidator();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('isList()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for number input', 8, false],
      ['returns false for object input', {}, false],
      ['returns false for function input', () => 'foo', false],
      ['returns false for map input', new Map(), false],
      ['returns false for set input', new Set(), false],
      ['returns true for array input', [], true],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isList(input as number[])).toBe(expectedResult);
    });
  });

  describe('isEmptyList()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for number input', 8, false],
      ['returns false for object input', {}, false],
      ['returns false for function input', () => 'foo', false],
      ['returns false for map input', new Map(), false],
      ['returns false for set input', new Set(), false],
      ['returns false for non empty array input', [1, 2, 3], false],
      ['returns true for array input', [], true],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isEmptyList(input as number[])).toBe(expectedResult);
    });
  });
});
