import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface EdgeDeletedEventArgs {
  edgeId: number;
}

export class EdgeDeletedEvent extends BaseEvent<'edge-deleted'> {
  private _edgeId: number;

  constructor({ edgeId }: EdgeDeletedEventArgs) {
    super('edge-deleted');
    this._edgeId = edgeId;
  }

  get edgeId() {
    return this._edgeId;
  }
}
