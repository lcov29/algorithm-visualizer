interface InvalidArgumentErrorArgs<T> {
  message: string;
  args: T[];
  cause?: Error | object;
}

export class InvalidArgumentError<T> extends Error {
  private _args: T[];

  constructor({ message, args, cause = {} }: InvalidArgumentErrorArgs<T>) {
    super(message, { cause });
    this._args = args;
  }

  get arguments() {
    return this._args;
  }
}
