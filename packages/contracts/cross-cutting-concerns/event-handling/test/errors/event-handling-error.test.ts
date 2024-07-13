import { EventHandlingError } from '../../src/errors';
import { BaseEvent } from '../../src/other/base-event';

describe('EventHandlingError', () => {
  let error: EventHandlingError<'base-event'>;
  let event: BaseEvent<'base-event'>;
  let cause: RangeError;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the invalid argument error');
    // @ts-expect-error instantiation of abstract class
    event = new BaseEvent('base-event');
    error = new EventHandlingError({
      message: 'event handling error message',
      event,
      cause,
    });
  });

  it('returns the specified error message', () => {
    expect(error.message).toBe('event handling error message');
  });

  it('returns the specified event', () => {
    expect(error.event).toEqual(event);
  });

  it('returns specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
