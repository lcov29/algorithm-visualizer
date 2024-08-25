import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeHiddenEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeHiddenEvent extends BaseEvent<'edge-hidden'> {
  private _edgeId: number;

  constructor(args: IEdgeHiddenEventArgs) {
    super('edge-hidden');
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
