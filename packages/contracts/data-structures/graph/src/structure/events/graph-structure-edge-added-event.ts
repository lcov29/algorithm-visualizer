import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdge } from '../interfaces';

interface IGraphStructureEdgeAddedEventArgs {
  edge: Omit<IEdge, 'id'>;
}

/**
 * @throws InvalidOperationError
 */
export class GraphStructureEdgeAddedEvent extends BaseEvent<'graph-structure-edge-added'> {
  private _edge: Omit<IEdge, 'id'>;

  constructor(args: IGraphStructureEdgeAddedEventArgs) {
    super('graph-structure-edge-added');
    this._edge = args.edge;
  }

  get edge() {
    return structuredClone(this._edge);
  }

  set edge(input: Omit<IEdge, 'id'>) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edge is forbidden',
    });
  }
}
