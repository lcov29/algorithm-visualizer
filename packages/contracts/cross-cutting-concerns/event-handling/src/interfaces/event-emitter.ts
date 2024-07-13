import { IEventSubscriber } from './event-subscriber';

export interface IEventEmitter<Event> {
  subscribe: (subscriber: IEventSubscriber<Event>) => void;
  unsubscribe: (subscriber: IEventSubscriber<Event>) => void;
  notifySubscribers: (event: Event) => void;
}
