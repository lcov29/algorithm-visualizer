import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeHighlightRemovedEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeHighlightRemovedEvent extends BaseEvent<'edge-highlight-removed'> {
  private _edgeId: number;

  constructor(args: IEdgeHighlightRemovedEventArgs) {
    super('edge-highlight-removed');
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
