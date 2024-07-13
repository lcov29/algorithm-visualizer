import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import {
  IEventHandler,
  IEventHandlerChain,
} from '@algorithm-visualizer/event-handling-contract';

import {
  EventHandlerChainArgs,
  EventHandlerChain as _EventHandlerChain,
} from './event-handler-chain';

export class EventHandlerChain<Events> implements IEventHandlerChain<Events> {
  private _handlerChain: _EventHandlerChain<Events>;

  constructor(args: Omit<EventHandlerChainArgs, 'validator'>) {
    this._handlerChain = new _EventHandlerChain({
      abortAfterSuccess: args.abortAfterSuccess,
      validator: new FunctionValidator(),
    });
  }

  add(handler: IEventHandler<Events>) {
    return this._handlerChain.add(handler);
  }

  handle(event: Events) {
    return this._handlerChain.handle(event);
  }
}
