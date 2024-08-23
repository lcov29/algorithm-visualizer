import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

interface IGraphGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  cause?: Error | object;
}

export class GraphGeneratorError extends Error {
  private _config: GraphGeneratorConfig;

  constructor({ message, config, cause = {} }: IGraphGeneratorErrorArgs) {
    super(message, { cause });
    this._config = config;
  }

  get config() {
    return this._config;
  }
}
