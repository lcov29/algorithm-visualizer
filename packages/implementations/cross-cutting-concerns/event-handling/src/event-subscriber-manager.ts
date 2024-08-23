import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';

interface ISubscriberData<Events> {
  id: number;
  subscriber: IEventSubscriber<Events>;
}

/**
 * Used by event emitters to manage subscribers and dispatch event to them
 */
export class EventSubscriberManager<Events>
  implements IEventSubscriberManager<Events>
{
  private _subscribers: ISubscriberData<Events>[];
  private _nextAvailableSubscriberId: number;

  constructor() {
    this._subscribers = [];
    this._nextAvailableSubscriberId = 0;
  }

  addSubscriber(subscriber: IEventSubscriber<Events>) {
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

  notifySubscribers(event: Events) {
    this._subscribers.forEach(({ subscriber }) =>
      subscriber.handleEvent(event),
    );
  }
}
