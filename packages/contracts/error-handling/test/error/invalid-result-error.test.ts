import { InvalidResultError } from '../../src/error/invalid-result-error';

describe('InvalidResultError', () => {
  let error: InvalidResultError<number>;
  let cause: RangeError;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the invalid result error');
    error = new InvalidResultError({
      message: 'Result 4 is invalid',
      result: 4,
      cause,
    });
  });

  it('returns specified error message', () => {
    expect(error.message).toBe('Result 4 is invalid');
  });

  it('returns specified result', () => {
    expect(error.result).toEqual(4);
  });

  it('returns specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
