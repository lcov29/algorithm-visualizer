import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

import { EdgeNode } from './edge-generator';

interface EdgeGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  nodes: EdgeNode[];
  cause?: Error | object;
}

export class EdgeGeneratorError extends Error {
  private _config: GraphGeneratorConfig;
  private _nodes: EdgeNode[];

  constructor({ message, config, nodes, cause = {} }: EdgeGeneratorErrorArgs) {
    super(message, { cause });
    this._config = config;
    this._nodes = nodes;
  }

  get config() {
    return this._config;
  }

  get nodes() {
    return this._nodes;
  }
}
