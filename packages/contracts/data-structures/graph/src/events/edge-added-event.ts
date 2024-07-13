import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { IEdge } from '../interfaces';

export class EdgeAddedEvent extends BaseEvent<'edge-added'> {
  private _edge: Omit<IEdge, 'id'>;

  constructor(edge: Omit<IEdge, 'id'>) {
    super('edge-added');
    this._edge = edge;
  }

  get edge() {
    return structuredClone(this._edge);
  }

  set edge(input: Omit<IEdge, 'id'>) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property min is forbidden',
    });
  }
}
