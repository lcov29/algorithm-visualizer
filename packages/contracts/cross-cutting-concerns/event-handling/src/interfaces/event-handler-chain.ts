import { IEventHandler } from './event-handler';

export interface IEventHandlerChain<Events> {
  /**
   * Appends an event handler to the chain.
   *
   * @returns {EventHandlerChain} EventHandlerChain
   */
  add: (handler: IEventHandler<Events>) => IEventHandlerChain<Events>;

  /**
   * Passes an event through the chain of registered handlers.
   *
   * If the chain is instantiated with `abortAfterSuccess` it will abort
   * after the first handler that successfully handles the event.
   *
   * @returns {boolean} Boolean indicating whether the event was successfully
   * handled by at least one handler
   */
  handle: (event: Events) => Promise<boolean>;
}
