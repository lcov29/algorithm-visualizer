interface IInvalidOperationErrorArgs {
  message: string;
  cause?: Error | object;
}

export class InvalidOperationError extends Error {
  constructor({ message, cause = {} }: IInvalidOperationErrorArgs) {
    super(message, { cause });
  }
}
