import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

interface INodeListGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  cause?: Error | object;
}

export class NodeListGeneratorError extends Error {
  private _config: GraphGeneratorConfig;

  constructor({ message, config, cause = {} }: INodeListGeneratorErrorArgs) {
    super(message, { cause });
    this._config = config;
  }

  get config() {
    return this._config;
  }
}
