import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';

import { IEdgeNode } from './edge-list-generator';

interface IEdgeListGeneratorErrorArgs {
  message: string;
  config: GraphGeneratorConfig;
  nodes: IEdgeNode[];
  cause?: Error | object;
}

export class EdgeListGeneratorError extends Error {
  private _config: GraphGeneratorConfig;
  private _nodes: IEdgeNode[];

  constructor({
    message,
    config,
    nodes,
    cause = {},
  }: IEdgeListGeneratorErrorArgs) {
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
