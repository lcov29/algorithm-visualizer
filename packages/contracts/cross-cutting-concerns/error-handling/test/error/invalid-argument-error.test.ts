import { InvalidArgumentError } from '../../src/error/invalid-argument-error';

describe('InvalidArgumentError', () => {
  const cause = new RangeError('This caused the invalid argument error');
  const error = new InvalidArgumentError({
    message: 'Error message',
    args: [4],
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Error message'],
    ['arguments', [4]],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toEqual(expectedResult);
    });
  });
});
