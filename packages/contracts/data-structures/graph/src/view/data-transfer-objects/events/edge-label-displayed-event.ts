import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeLabelDisplayedEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelDisplayedEvent extends BaseEvent<'edge-label-displayed'> {
  private _edgeId: number;

  constructor(args: IEdgeLabelDisplayedEventArgs) {
    super('edge-label-displayed');
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
