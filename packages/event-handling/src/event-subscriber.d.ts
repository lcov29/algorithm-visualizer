export interface EventSubscriber<Event> {
  handleEvent: (event: Event) => void;
}

export interface EventEmitter<Event> {
  subscribe: (subscriber: EventSubscriber<Event>) => void;
  unsubscribe: (subscriber: EventSubscriber<Event>) => void;
  notifySubscribers: (event: Event) => void;
}
