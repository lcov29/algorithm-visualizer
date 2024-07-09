export interface IEventSubscriber<Event> {
  handleEvent: (event: Event) => void;
}
