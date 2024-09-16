import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IGraphViewEdge, IGraphViewNode } from '../../interfaces';

interface IGraphViewInitializedEventArgs {
  nodes: IGraphViewNode[];
  edges: IGraphViewEdge[];
}

export class GraphViewInitializedEvent extends BaseEvent<'graph-view-initialized'> {
  private _nodes: IGraphViewNode[];
  private _edges: IGraphViewEdge[];

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

  set nodes(input: IGraphViewNode[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodes is forbidden',
    });
  }

  set edges(input: IGraphViewEdge[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }
}
