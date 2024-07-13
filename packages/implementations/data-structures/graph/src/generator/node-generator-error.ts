import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

interface NodeGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  cause?: Error | object;
}

export class NodeGeneratorError extends Error {
  private _config: GraphGeneratorConfig;

  constructor({ message, config, cause = {} }: NodeGeneratorErrorArgs) {
    super(message, { cause });
    this._config = config;
  }

  get config() {
    return this._config;
  }
}
