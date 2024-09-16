import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IGraphStructureEdge } from '../interfaces';
import { IGraphStructureNode } from '../interfaces/graph-structure-node';

interface IGraphStructureInitializedEventArgs {
  nodes: IGraphStructureNode[];
  edges: IGraphStructureEdge[];
}

export class GraphStructureInitializedEvent extends BaseEvent<'graph-structure-initialized'> {
  private _nodes: IGraphStructureNode[];
  private _edges: IGraphStructureEdge[];

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

  set nodes(input: IGraphStructureNode[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodes is forbidden',
    });
  }

  set edges(input: IGraphStructureEdge[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }
}
