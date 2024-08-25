import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeDisplayedEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeDisplayedEvent extends BaseEvent<'edge-displayed'> {
  private _edgeId: number;

  constructor(args: IEdgeDisplayedEventArgs) {
    super('edge-displayed');
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
