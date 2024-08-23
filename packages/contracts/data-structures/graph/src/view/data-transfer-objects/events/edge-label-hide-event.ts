import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface EdgeLabelHideEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelHideEvent extends BaseEvent<'edge-label-hide'> {
  private _edgeId: number;

  constructor({ edgeId }: EdgeLabelHideEventArgs) {
    super('edge-label-hide');
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
