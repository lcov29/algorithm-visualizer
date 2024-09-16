import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IGeneratedEdge, IGeneratedNode } from '../interfaces';

interface IGraphGeneratorGraphGeneratedEvent {
  nodes: IGeneratedNode[];
  edges: IGeneratedEdge[];
}

export class GraphGeneratorGraphGeneratedEvent extends BaseEvent<'graph-generator-graph-generated'> {
  private _nodes: IGeneratedNode[];
  private _edges: IGeneratedEdge[];

  constructor(args: IGraphGeneratorGraphGeneratedEvent) {
    super('graph-generator-graph-generated');
    this._nodes = args.nodes;
    this._edges = args.edges;
  }

  get nodes() {
    return this._nodes;
  }

  get edges() {
    return this._edges;
  }

  set nodes(input: IGeneratedNode[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodes is forbidden',
    });
  }

  set edges(input: IGeneratedEdge[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }
}
