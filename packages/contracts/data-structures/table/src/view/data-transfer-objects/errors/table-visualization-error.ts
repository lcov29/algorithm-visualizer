interface ITableVisualizationErrorArgs {
  message: string;
  cause?: Error | object;
}

export class TableVisualizationError extends Error {
  constructor({ message, cause = {} }: ITableVisualizationErrorArgs) {
    super(message, { cause });
  }
}
