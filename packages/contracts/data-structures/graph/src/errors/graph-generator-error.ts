import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

interface GraphGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  cause?: Error | object;
}

export class GraphGeneratorError extends Error {
  private _config: GraphGeneratorConfig;

  constructor({ message, config, cause = {} }: GraphGeneratorErrorArgs) {
    super(message, { cause });
    this._config = config;
  }

  get config() {
    return this._config;
  }
}
