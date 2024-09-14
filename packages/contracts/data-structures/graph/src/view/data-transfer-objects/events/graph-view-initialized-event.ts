import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdge } from '../../../structure';
import { INode } from '../../interfaces/graph-node';

interface IGraphViewInitializedEventArgs {
  nodes: INode[];
  edges: IEdge[];
}

export class GraphViewInitializedEvent extends BaseEvent<'graph-view-initialized'> {
  private _nodes: INode[];
  private _edges: IEdge[];

  constructor(args: IGraphViewInitializedEventArgs) {
    super('graph-view-initialized');
    this._nodes = args.nodes;
    this._edges = args.edges;
  }

  get nodes() {
    return this._nodes;
  }

  get edges() {
    return this._edges;
  }

  set nodes(input: INode[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodes is forbidden',
    });
  }

  set edges(input: IEdge[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }
}
