interface IAlgorithmExecutionLogErrorArgs {
  message: string;
  cause?: Error | object;
}

export class AlgorithmExecutionLogError extends Error {
  constructor({ message, cause = {} }: IAlgorithmExecutionLogErrorArgs) {
    super(message, { cause });
  }
}
