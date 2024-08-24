import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdgeList, INodeList } from '..';

interface IGraphCreatedEventArgs {
  nodes: INodeList;
  edges: IEdgeList;
}

export class GraphCreatedEvent extends BaseEvent<'graph-created'> {
  private _nodes: INodeList;
  private _edges: IEdgeList;

  constructor({ nodes, edges }: IGraphCreatedEventArgs) {
    super('graph-created');
    this._nodes = nodes;
    this._edges = edges;
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
