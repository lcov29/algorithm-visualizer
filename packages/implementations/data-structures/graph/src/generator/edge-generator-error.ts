import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

import { IEdgeNode } from './edge-generator';

interface IEdgeGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  nodes: IEdgeNode[];
  cause?: Error | object;
}

export class EdgeGeneratorError extends Error {
  private _config: GraphGeneratorConfig;
  private _nodes: IEdgeNode[];

  constructor({ message, config, nodes, cause = {} }: IEdgeGeneratorErrorArgs) {
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
