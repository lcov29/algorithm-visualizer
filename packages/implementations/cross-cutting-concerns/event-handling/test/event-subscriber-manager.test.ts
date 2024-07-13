import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { EventSubscriberManager } from '../src/event-subscriber-manager';

const mockHandleEventA = jest.fn();
const mockHandleEventB = jest.fn();

interface MockEvent {
  eventName: string;
}

describe('EventSubscriberManager', () => {
  let mockEvent: MockEvent;
  let subscriberA: IEventSubscriber<MockEvent>;
  let subscriberB: IEventSubscriber<MockEvent>;
  let manager: EventSubscriberManager<MockEvent>;

  function isSubscriberInList(subscriberIn: IEventSubscriber<MockEvent>) {
    return (
      // @ts-expect-error reference to a private property
      manager._subscribers.findIndex(
        ({ subscriber }) => subscriber === subscriberIn,
      ) > -1
    );
  }

  beforeEach(() => {
    jest.resetAllMocks();
    mockEvent = { eventName: 'event-a' };
    subscriberA = { handleEvent: mockHandleEventA };
    subscriberB = { handleEvent: mockHandleEventB };
    manager = new EventSubscriberManager();
  });

  describe('addSubscriber()', () => {
    it('adds the specified subscriber to the internal list', () => {
      manager.addSubscriber(subscriberA);
      expect(isSubscriberInList(subscriberA)).toBe(true);
    });

    it('returns ascending subscriber ids', () => {
      const idA = manager.addSubscriber(subscriberA);
      const idB = manager.addSubscriber(subscriberB);
      expect(idA).toBe(0);
      expect(idB).toBe(1);
    });
  });

  describe('removeSubscriber()', () => {
    it('removes the specified subscriber from the internal list', () => {
      const idA = manager.addSubscriber(subscriberA);
      manager.addSubscriber(subscriberB);
      manager.removeSubscriber(idA);
      expect(isSubscriberInList(subscriberA)).toBe(false);
      expect(isSubscriberInList(subscriberB)).toBe(true);
    });
  });

  describe('clear()', () => {
    beforeEach(() => {
      manager.addSubscriber(subscriberA);
      manager.addSubscriber(subscriberB);
      manager.clearSubscribers();
    });

    it('removes all subscribers', () => {
      // @ts-expect-error reference to a private property
      expect(manager._subscribers).toHaveLength(0);
    });

    it('resets the internal id counter', () => {
      // @ts-expect-error reference to a private property
      expect(manager._nextAvailableSubscriberId).toBe(0);
    });
  });

  describe('isSubscriber()', () => {
    it('returns true if the specified potential subscriber is subscribed', () => {
      const idA = manager.addSubscriber(subscriberA);
      expect(manager.isSubscriber(idA)).toBe(true);
    });

    it('returns false if the specified potential subscriber is not subscribed', () => {
      expect(manager.isSubscriber(0)).toBe(false);
    });
  });

  describe('notifySubscribers()', () => {
    it('sends the specified event once to each subscriber', () => {
      manager.addSubscriber(subscriberA);
      manager.addSubscriber(subscriberB);
      manager.notifySubscribers(mockEvent);
      expect(mockHandleEventA).toHaveBeenCalledTimes(1);
      expect(mockHandleEventB).toHaveBeenCalledTimes(1);
      expect(mockHandleEventA).toHaveBeenCalledWith(mockEvent);
      expect(mockHandleEventB).toHaveBeenCalledWith(mockEvent);
    });
  });
});
