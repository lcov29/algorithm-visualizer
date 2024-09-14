import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdgeList, INodeList } from '../../structure';

interface IGraphGeneratorGraphGeneratedEvent {
  nodes: INodeList;
  edges: IEdgeList;
}

export class GraphGeneratorGraphGeneratedEvent extends BaseEvent<'graph-generator-graph-generated'> {
  private _nodes: INodeList;
  private _edges: IEdgeList;

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

  set nodes(input: INodeList) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodes is forbidden',
    });
  }

  set edges(input: IEdgeList) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }
}
