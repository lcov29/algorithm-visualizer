import { InvalidArgumentError } from '../../src/error/invalid-argument-error';

describe('InvalidArgumentError', () => {
  let error: InvalidArgumentError<number>;
  let cause: RangeError;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the invalid argument error');
    error = new InvalidArgumentError({
      message: 'Error message',
      args: [4],
      cause,
    });
  });

  it('returns specified error message', () => {
    expect(error.message).toBe('Error message');
  });

  it('returns specified arguments', () => {
    expect(error.arguments).toEqual([4]);
  });

  it('returns specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
