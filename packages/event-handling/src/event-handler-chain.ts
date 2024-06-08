import { EventHandler } from './event-handler';

export interface IEventHandlerChain<Events> {
  add: (handler: EventHandler<Events>) => IEventHandlerChain<Events>;
  handle: (event: Events) => boolean;
}

interface EventHandlerChainArgs {
  abortAfterSuccess: boolean;
}

export class EventHandlerChain<Events> implements IEventHandlerChain<Events> {
  private _abortAfterSuccess: boolean;
  private _handlers: EventHandler<Events>[];

  constructor(args: EventHandlerChainArgs = { abortAfterSuccess: false }) {
    this._abortAfterSuccess = args.abortAfterSuccess;
    this._handlers = [];
  }

  add(handler: EventHandler<Events>) {
    this._handlers.push(handler);
    return this;
  }

  /**
   * Passes an event through the chain of registered handlers.
   *
   * If the chain is instantiated with `abortAfterSuccess` it will abort
   * after the first handler that successfully handles the event.
   *
   * @returns {boolean} Boolean indicating whether the event was successfully
   * handled by at least one handler
   */
  handle(event: Events) {
    let isHandled = false;

    for (const handler of this._handlers) {
      const isSuccessful = handler(event);
      const abort = this._abortAfterSuccess && isSuccessful;
      isHandled ||= isSuccessful;

      if (abort) {
        break;
      }
    }

    return isHandled;
  }
}
