import { IEventSubscriber } from './event-subscriber';

/**
 * Used by event emitters to manage subscribers and dispatch event to them
 */
export interface IEventSubscriberManager<Events> {
  addSubscriber: (subscriber: IEventSubscriber<Events>) => number;
  removeSubscriber: (subscriberId: number) => void;
  isSubscriber: (subscriberId: number) => boolean;
  clearSubscribers: () => void;
  notifySubscribers: (event: Events) => void;
}
