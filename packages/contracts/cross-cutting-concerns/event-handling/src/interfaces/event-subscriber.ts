export interface IEventSubscriber<Events> {
  handleEvent: (event: Events) => void;
}
