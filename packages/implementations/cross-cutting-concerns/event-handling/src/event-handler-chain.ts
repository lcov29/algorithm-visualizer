import { IFunctionValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';
import {
  IEventHandler,
  IEventHandlerChain,
} from '@algorithm-visualizer/event-handling-contract';

export interface EventHandlerChainArgs {
  abortAfterSuccess: boolean;
  validator: IFunctionValidator;
}

export class EventHandlerChain<Events> implements IEventHandlerChain<Events> {
  private _abortAfterSuccess: boolean;
  private _handlers: IEventHandler<Events>[];
  private _validator: IFunctionValidator;

  constructor(args: EventHandlerChainArgs) {
    this._abortAfterSuccess = args.abortAfterSuccess;
    this._handlers = [];
    this._validator = args.validator;
  }

  add(handler: IEventHandler<Events>) {
    if (!this._validator.isFunction(handler)) {
      throw new InvalidArgumentError({
        message: 'Argument handler is not a function',
        args: [handler],
      });
    }

    this._handlers.push(handler);
    return this;
  }

  async handle(event: Events) {
    let isHandled = false;

    for (const handler of this._handlers) {
      const isSuccessful = await handler(event);
      const abort = this._abortAfterSuccess && isSuccessful;
      isHandled ||= isSuccessful;

      if (abort) {
        break;
      }
    }

    return isHandled;
  }
}
