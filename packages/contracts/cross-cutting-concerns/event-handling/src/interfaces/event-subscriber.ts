export interface IEventSubscriber<Events> {
  handleEvent: (event: Events) => Promise<void>;
}
