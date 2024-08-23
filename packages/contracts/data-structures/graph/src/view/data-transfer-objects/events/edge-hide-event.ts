import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface EdgeHideEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeHideEvent extends BaseEvent<'edge-hide'> {
  private _edgeId: number;

  constructor({ edgeId }: EdgeHideEventArgs) {
    super('edge-hide');
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
