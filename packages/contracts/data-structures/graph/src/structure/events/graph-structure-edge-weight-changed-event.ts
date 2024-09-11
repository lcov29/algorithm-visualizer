import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureEdgeBaseEvent } from './graph-structure-edge-base-event';

interface IGraphStructureEdgeWeightChangedEventArgs {
  edgeId: number;
  newWeight: number;
}

/**
 * @throws InvalidOperationError
 */
export class GraphStructureEdgeWeightChangedEvent extends GraphStructureEdgeBaseEvent<'graph-structure-edge-weight-changed'> {
  private _newWeight: number;

  constructor(args: IGraphStructureEdgeWeightChangedEventArgs) {
    super('graph-structure-edge-weight-changed', { edgeId: args.edgeId });
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
