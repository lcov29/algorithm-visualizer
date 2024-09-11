import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdgeList, INodeList } from '..';

interface IGraphStructureInitializedEventArgs {
  nodes: INodeList;
  edges: IEdgeList;
}

export class GraphStructureInitializedEvent extends BaseEvent<'graph-structure-initialized'> {
  private _nodes: INodeList;
  private _edges: IEdgeList;

  constructor(args: IGraphStructureInitializedEventArgs) {
    super('graph-structure-initialized');
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
