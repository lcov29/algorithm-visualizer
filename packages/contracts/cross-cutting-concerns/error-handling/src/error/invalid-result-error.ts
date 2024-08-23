interface IInvalidResultErrorArgs<T> {
  message: string;
  result: T;
  cause?: Error | object;
}

export class InvalidResultError<T> extends Error {
  private _result: T;

  constructor({ message, result, cause = {} }: IInvalidResultErrorArgs<T>) {
    super(message, { cause });
    this._result = result;
  }

  get result() {
    return this._result;
  }
}
