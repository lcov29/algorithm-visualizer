import { BaseEvent } from '../other/base-event';

interface EventHandlingErrorArgs<T extends string> {
  message: string;
  event: BaseEvent<T>;
  cause?: Error | object;
}

export class EventHandlingError<T extends string> extends Error {
  private _event: BaseEvent<T>;

  constructor({ message, event, cause = {} }: EventHandlingErrorArgs<T>) {
    super(message, { cause });
    this._event = event;
  }

  get event() {
    return this._event;
  }
}
