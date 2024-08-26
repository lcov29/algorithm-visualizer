import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { EdgeLabelHighlightStyleClass } from '../../types';
import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

interface IEdgeLabelHighlightRemovedEventArgs extends IEdgeBaseEventArgs {
  highlightStyleClass: EdgeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelHighlightRemovedEvent extends EdgeBaseEvent<'edge-label-highlight-removed'> {
  private _highlightStyleClass: EdgeLabelHighlightStyleClass;

  constructor(args: IEdgeLabelHighlightRemovedEventArgs) {
    super('edge-label-highlight-removed', args);
    this._highlightStyleClass = args.highlightStyleClass;
  }

  get highlightStyleClass() {
    return this._highlightStyleClass;
  }

  set highlightStyleClass(input: EdgeLabelHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
