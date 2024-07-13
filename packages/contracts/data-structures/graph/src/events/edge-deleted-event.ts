import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
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

  set edgeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeId is forbidden',
    });
  }
}
