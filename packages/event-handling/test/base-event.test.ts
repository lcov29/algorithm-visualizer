import { BaseEvent } from '../src/base-event';

describe('BaseEvent', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('name()', () => {
    it('returns the specified name', () => {
      const name = 'event-name';
      const event = new BaseEvent(name);
      expect(event.name).toBe(name);
    });
  });

  describe('creationTime', () => {
    it('returns the time of creation', () => {
      const currentTime = 123456789;
      jest.spyOn(Date, 'now').mockImplementation(() => currentTime);
      const event = new BaseEvent('foo');
      expect(event.creationTime).toBe(currentTime);
    });
  });
});
