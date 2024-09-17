import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEventSubscriber } from './event-subscriber';

/**
 * Used by event emitters to manage subscribers and dispatch event to them
 */
export interface IEventSubscriberManager {
  addSubscriber: (subscriber: IEventSubscriber) => number;
  removeSubscriber: (subscriberId: number) => void;
  isSubscriber: (subscriberId: number) => boolean;
  clearSubscribers: () => void;
  notifySubscribers: (event: BaseEvent<string>) => void;
}
