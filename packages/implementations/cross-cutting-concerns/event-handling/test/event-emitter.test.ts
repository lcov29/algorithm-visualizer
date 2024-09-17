import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';

import { EventEmitter } from '../src';

const mockAddSubscriber = jest.fn();
const mockRemoveSubscriber = jest.fn();

const mockEventSubscriberManager = {
  addSubscriber: mockAddSubscriber,
  removeSubscriber: mockRemoveSubscriber,
} as Partial<IEventSubscriberManager> as IEventSubscriberManager;

const mockEventSubscriber = {} as Partial<IEventSubscriber> as IEventSubscriber;

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-expect-error instantiation of abstract class
    eventEmitter = new EventEmitter(mockEventSubscriberManager);
  });

  describe('addSubscriber()', () => {
    it('passes the subscriber to the subscriber manager', () => {
      eventEmitter.addSubscriber(mockEventSubscriber);
      expect(mockAddSubscriber).toHaveBeenCalledTimes(1);
      expect(mockAddSubscriber).toHaveBeenCalledWith(mockEventSubscriber);
    });

    it('passes the received id from the subscriber manager to the subscriber', () => {
      mockAddSubscriber.mockReturnValue(1);
      const subscriberId = eventEmitter.addSubscriber(mockEventSubscriber);
      expect(subscriberId).toBe(1);
    });
  });

  describe('removeSubscriber()', () => {
    it('passes the subscriber id to the subscriber manager', () => {
      const subscriberId = 15;
      eventEmitter.removeSubscriber(subscriberId);
      expect(mockRemoveSubscriber).toHaveBeenCalledTimes(1);
      expect(mockRemoveSubscriber).toHaveBeenCalledWith(subscriberId);
    });
  });
});
