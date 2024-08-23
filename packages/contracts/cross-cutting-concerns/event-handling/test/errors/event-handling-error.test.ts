import { EventHandlingError } from '../../src/errors';
import { BaseEvent } from '../../src/other/base-event';

describe('EventHandlingError', () => {
  const cause = new RangeError('This caused the invalid argument error');
  // @ts-expect-error instantiation of abstract class
  const event = new BaseEvent('base-event');
  const error: EventHandlingError<'base-event'> = new EventHandlingError({
    message: 'Event handling error message',
    event,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Event handling error message'],
    ['event', event],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
