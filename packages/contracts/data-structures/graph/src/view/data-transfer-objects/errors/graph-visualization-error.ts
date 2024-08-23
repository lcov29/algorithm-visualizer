interface GraphVisualizationErrorArgs {
  message: string;
  cause?: Error | object;
}

export class GraphVisualizationError extends Error {
  constructor({ message, cause = {} }: GraphVisualizationErrorArgs) {
    super(message, { cause });
  }
}
