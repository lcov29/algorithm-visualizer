import { IEventSubscriber } from './event-subscriber';

export interface IEventEmitter<Events> {
  addSubscriber: (subscriber: IEventSubscriber<Events>) => number;
  removeSubscriber: (subscriberId: number) => void;
}
