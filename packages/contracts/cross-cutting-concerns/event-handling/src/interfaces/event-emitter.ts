import { IEventSubscriber } from './event-subscriber';

export interface IEventEmitter {
  addSubscriber: (subscriber: IEventSubscriber) => number;
  removeSubscriber: (subscriberId: number) => void;
}
