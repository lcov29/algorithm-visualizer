export interface IEventSubscriber<Event> {
  handleEvent: (event: Event) => void;
}

export interface IEventEmitter<Event> {
  subscribe: (subscriber: IEventSubscriber<Event>) => void;
  unsubscribe: (subscriber: IEventSubscriber<Event>) => void;
  notifySubscribers: (event: Event) => void;
}
