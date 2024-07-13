import { FunctionValidator } from '../src/function-validator';

describe('FunctionValidator', () => {
  const validator = new FunctionValidator();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('isFunction()', () => {
    it.each([
      ['returns false for boolean input', true, false],
      ['returns false for string input', 'string', false],
      ['returns false for object input', {}, false],
      ['returns false for number input', 7, false],
      ['returns true for function input', () => 'foo', true],
    ])('%s', (_, input, expectedResult) => {
      expect(validator.isFunction(input as (args: unknown) => unknown)).toBe(
        expectedResult,
      );
    });
  });
});
