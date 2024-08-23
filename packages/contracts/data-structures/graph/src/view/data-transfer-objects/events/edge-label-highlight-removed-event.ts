import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { EdgeLabelHighlightStyleClass } from '../../types';

interface EdgeLabelHighlightRemovedEventArgs {
  edgeId: number;
  highlightStyleClass: EdgeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelHighlightRemovedEvent extends BaseEvent<'edge-label-highlight-removed'> {
  private _edgeId: number;
  private _highlightStyleClass: EdgeLabelHighlightStyleClass;

  constructor(args: EdgeLabelHighlightRemovedEventArgs) {
    super('edge-label-highlight-removed');
    this._edgeId = args.edgeId;
    this._highlightStyleClass = args.highlightStyleClass;
  }

  get edgeId() {
    return this._edgeId;
  }

  get highlightStyleClass() {
    return this._highlightStyleClass;
  }

  set edgeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeId is forbidden',
    });
  }

  set highlightStyleClass(input: EdgeLabelHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
