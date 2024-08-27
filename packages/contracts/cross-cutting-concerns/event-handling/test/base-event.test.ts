import { BaseEvent } from '../src/data-transfer-objects/base-event';

describe('BaseEvent', () => {
  const name = 'event-name';
  const currentTime = 123456789;
  let event: BaseEvent<'event-name'>;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockImplementation(() => currentTime);
    // @ts-expect-error abstract class
    event = new BaseEvent(name);
  });

  describe.each([
    ['name', name],
    ['creationTime', currentTime],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(event[methodName]).toBe(expectedResult);
    });
  });
});
