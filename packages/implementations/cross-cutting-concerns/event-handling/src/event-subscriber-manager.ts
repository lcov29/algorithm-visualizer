import {
  BaseEvent,
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';

interface ISubscriberData {
  id: number;
  subscriber: IEventSubscriber;
}

/**
 * Used by event emitters to manage subscribers and dispatch event to them
 */
export class EventSubscriberManager implements IEventSubscriberManager {
  private _subscribers: ISubscriberData[];
  private _nextAvailableSubscriberId: number;

  constructor() {
    this._subscribers = [];
    this._nextAvailableSubscriberId = 0;
  }

  addSubscriber(subscriber: IEventSubscriber) {
    const subscriberId = this._nextAvailableSubscriberId++;
    this._subscribers.push({
      id: subscriberId,
      subscriber,
    });
    return subscriberId;
  }

  removeSubscriber(subscriberId: number) {
    this._subscribers = this._subscribers.filter(
      subscriber => subscriber.id !== subscriberId,
    );
  }

  clearSubscribers() {
    this._subscribers = [];
    this._nextAvailableSubscriberId = 0;
  }

  isSubscriber(subscriberId: number) {
    return this._subscribers.some(subscriber => subscriber.id === subscriberId);
  }

  notifySubscribers(event: BaseEvent<string>) {
    this._subscribers.forEach(({ subscriber }) =>
      subscriber.handleEvent(event),
    );
  }
}
