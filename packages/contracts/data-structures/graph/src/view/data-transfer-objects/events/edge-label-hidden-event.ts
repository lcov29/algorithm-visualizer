import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeLabelHiddenEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelHiddenEvent extends BaseEvent<'edge-label-hidden'> {
  private _edgeId: number;

  constructor({ edgeId }: IEdgeLabelHiddenEventArgs) {
    super('edge-label-hidden');
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
