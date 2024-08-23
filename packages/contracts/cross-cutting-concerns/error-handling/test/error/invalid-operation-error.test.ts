import { InvalidOperationError } from '../../src/error/invalid-operation-error';

describe('InvalidOperationError', () => {
  const cause = new RangeError('This caused the invalid operation error');
  const error = new InvalidOperationError({
    message: 'Error message',
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Error message'],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
