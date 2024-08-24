import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdge } from '../../../structure';
import { INode } from '../../interfaces/graph-node';

interface IGraphCreatedEventArgs {
  nodes: INode[];
  edges: IEdge[];
}

export class GraphRenderEvent extends BaseEvent<'graph-rendered'> {
  private _nodes: INode[];
  private _edges: IEdge[];

  constructor({ nodes, edges }: IGraphCreatedEventArgs) {
    super('graph-rendered');
    this._nodes = nodes;
    this._edges = edges;
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
