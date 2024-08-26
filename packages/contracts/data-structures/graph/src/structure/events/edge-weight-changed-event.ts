import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeBaseEvent } from './edge-base-event';

interface IEdgeWeightChangedEventArgs {
  edgeId: number;
  newWeight: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeWeightChangedEvent extends EdgeBaseEvent<'edge-weight-changed'> {
  private _newWeight: number;

  constructor(args: IEdgeWeightChangedEventArgs) {
    super('edge-weight-changed', { edgeId: args.edgeId });
    this._newWeight = args.newWeight;
  }

  get newWeight() {
    return this._newWeight;
  }

  set newWeight(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property newWeight is forbidden',
    });
  }
}
