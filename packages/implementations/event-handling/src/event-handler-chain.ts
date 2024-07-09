import {
  IEventHandler,
  IEventHandlerChain,
} from '@algorithm-visualizer/event-handling-contract';

interface EventHandlerChainArgs {
  abortAfterSuccess: boolean;
}

export class EventHandlerChain<Events> implements IEventHandlerChain<Events> {
  private _abortAfterSuccess: boolean;
  private _handlers: IEventHandler<Events>[];

  constructor(args: EventHandlerChainArgs = { abortAfterSuccess: false }) {
    this._abortAfterSuccess = args.abortAfterSuccess;
    this._handlers = [];
  }

  add(handler: IEventHandler<Events>) {
    this._handlers.push(handler);
    return this;
  }

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
