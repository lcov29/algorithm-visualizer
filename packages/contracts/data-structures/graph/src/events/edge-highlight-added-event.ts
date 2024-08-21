import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

/**
 * @throws InvalidOperationError
 */
export class EdgeHighlightAddedEvent extends BaseEvent<'edge-highlight-added'> {
  private _edgeId: number;

  constructor(edgeId: number) {
    super('edge-highlight-added');
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
