import { BaseEvent } from '../other/base-event';

interface IEventHandlingErrorArgs<T extends string> {
  message: string;
  event: BaseEvent<T>;
  cause?: Error | object;
}

export class EventHandlingError<T extends string> extends Error {
  private _event: BaseEvent<T>;

  constructor({ message, event, cause = {} }: IEventHandlingErrorArgs<T>) {
    super(message, { cause });
    this._event = event;
  }

  get event() {
    return this._event;
  }
}
