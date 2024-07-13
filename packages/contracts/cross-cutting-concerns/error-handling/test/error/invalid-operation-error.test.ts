import { InvalidOperationError } from '../../src/error/invalid-operation-error';

describe('InvalidOperationError', () => {
  let error: InvalidOperationError;
  let cause: RangeError;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the invalid operation error');
    error = new InvalidOperationError({
      message: 'Error message',
      cause,
    });
  });

  it('returns specified error message', () => {
    expect(error.message).toBe('Error message');
  });

  it('returns specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
