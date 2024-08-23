import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface EdgeLabelDisplayEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelDisplayEvent extends BaseEvent<'edge-label-display'> {
  private _edgeId: number;

  constructor({ edgeId }: EdgeLabelDisplayEventArgs) {
    super('edge-label-display');
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
