interface InvalidOperationErrorArgs {
  message: string;
  cause?: Error | object;
}

export class InvalidOperationError extends Error {
  constructor({ message, cause = {} }: InvalidOperationErrorArgs) {
    super(message, { cause });
  }
}
