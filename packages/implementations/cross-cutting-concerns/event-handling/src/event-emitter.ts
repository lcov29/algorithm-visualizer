import {
  IEventEmitter,
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';

export abstract class EventEmitter implements IEventEmitter {
  protected _subscriberManager: IEventSubscriberManager;

  constructor(subscriberManager: IEventSubscriberManager) {
    this._subscriberManager = subscriberManager;
  }

  addSubscriber(subscriber: IEventSubscriber) {
    const subscriberId = this._subscriberManager.addSubscriber(subscriber);
    return subscriberId;
  }

  removeSubscriber(subscriberId: number) {
    this._subscriberManager.removeSubscriber(subscriberId);
  }
}
