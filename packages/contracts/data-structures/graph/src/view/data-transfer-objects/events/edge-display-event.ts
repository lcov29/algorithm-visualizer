import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface EdgeDisplayArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeDisplayEvent extends BaseEvent<'edge-display'> {
  private _edgeId: number;

  constructor({ edgeId }: EdgeDisplayArgs) {
    super('edge-display');
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
