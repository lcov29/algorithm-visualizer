import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

export interface IEdgeDeletedEvent extends IBaseEvent<'edge-deleted'> {
  edgeId: number;
}

interface EdgeDeletedEventArgs {
  edgeId: number;
}

export class EdgeDeletedEvent
  extends BaseEvent<'edge-deleted'>
  implements IEdgeDeletedEvent
{
  private _edgeId: number;

  constructor({ edgeId }: EdgeDeletedEventArgs) {
    super('edge-deleted');
    this._edgeId = edgeId;
  }

  get edgeId() {
    return this._edgeId;
  }
}
