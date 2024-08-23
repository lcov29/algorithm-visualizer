import { InvalidResultError } from '../../src/error/invalid-result-error';

describe('InvalidResultError', () => {
  const cause = new RangeError('This caused the invalid result error');
  const error = new InvalidResultError({
    message: 'Result 4 is invalid',
    result: 4,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Result 4 is invalid'],
    ['result', 4],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
