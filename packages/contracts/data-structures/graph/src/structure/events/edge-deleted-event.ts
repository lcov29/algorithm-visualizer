import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeDeletedEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeDeletedEvent extends BaseEvent<'edge-deleted'> {
  private _edgeId: number;

  constructor(args: IEdgeDeletedEventArgs) {
    super('edge-deleted');
    this._edgeId = args.edgeId;
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
