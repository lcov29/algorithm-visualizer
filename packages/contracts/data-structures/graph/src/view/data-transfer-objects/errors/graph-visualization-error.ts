interface IGraphVisualizationErrorArgs {
  message: string;
  cause?: Error | object;
}

export class GraphVisualizationError extends Error {
  constructor({ message, cause = {} }: IGraphVisualizationErrorArgs) {
    super(message, { cause });
  }
}
