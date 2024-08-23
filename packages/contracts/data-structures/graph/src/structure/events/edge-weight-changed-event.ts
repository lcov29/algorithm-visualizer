import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeWeightChangedEventArgs {
  edgeId: number;
  newWeight: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeWeightChangedEvent extends BaseEvent<'edge-weight-changed'> {
  private _edgeId: number;
  private _newWeight: number;

  constructor(args: IEdgeWeightChangedEventArgs) {
    super('edge-weight-changed');
    this._edgeId = args.edgeId;
    this._newWeight = args.newWeight;
  }

  get edgeId() {
    return this._edgeId;
  }

  get newWeight() {
    return this._newWeight;
  }

  set edgeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeId is forbidden',
    });
  }

  set newWeight(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property newWeight is forbidden',
    });
  }
}
