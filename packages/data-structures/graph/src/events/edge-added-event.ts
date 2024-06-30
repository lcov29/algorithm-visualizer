import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

import { IEdge } from '../structure/edge-list';

export interface IEdgeAddedEvent extends IBaseEvent<'edge-added'> {
  edge: Omit<IEdge, 'id'>;
}

export class EdgeAddedEvent
  extends BaseEvent<'edge-added'>
  implements IEdgeAddedEvent
{
  private _edge: Omit<IEdge, 'id'>;

  constructor(edge: Omit<IEdge, 'id'>) {
    super('edge-added');
    this._edge = edge;
  }

  get edge() {
    return structuredClone(this._edge);
  }
}
