import { IFunctionValidator } from '../../../../contracts/cross-cutting-concerns/data-validation';
import { InvalidArgumentError } from '../../../../contracts/cross-cutting-concerns/error-handling';
import {
  IEventHandler,
  IEventHandlerChain,
} from '../../../../contracts/cross-cutting-concerns/event-handling';

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
