interface IStackErrorArgs {
  message: string;
  cause?: Error | object;
}

export class StackError extends Error {
  constructor({ message, cause = {} }: IStackErrorArgs) {
    super(message, { cause });
  }
}
