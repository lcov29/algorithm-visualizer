import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdge } from '../../../structure';
import { INode } from '../../interfaces/graph-node';
import { GraphRenderDirection } from '../../types';

interface IGraphRenderedEventArgs {
  nodes: INode[];
  edges: IEdge[];
  renderDirection: GraphRenderDirection;
}

export class GraphRenderedEvent extends BaseEvent<'graph-rendered'> {
  private _nodes: INode[];
  private _edges: IEdge[];
  private _renderDirection: GraphRenderDirection;

  constructor(args: IGraphRenderedEventArgs) {
    super('graph-rendered');
    this._nodes = args.nodes;
    this._edges = args.edges;
    this._renderDirection = args.renderDirection;
  }

  get nodes() {
    return this._nodes;
  }

  get edges() {
    return this._edges;
  }

  get renderDirection() {
    return this._renderDirection;
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

  set renderDirection(direction: GraphRenderDirection) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property renderDirection is forbidden',
    });
  }
}
