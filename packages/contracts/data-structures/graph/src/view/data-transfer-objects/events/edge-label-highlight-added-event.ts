import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelHighlightStyleClass } from '../../types';
import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

interface IEdgeLabelHighlightAddedEventArgs extends IEdgeBaseEventArgs {
  highlightStyleClass: EdgeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelHighlightAddedEvent extends EdgeBaseEvent<'edge-label-highlight-added'> {
  private _highlightStyleClass: EdgeLabelHighlightStyleClass;

  constructor(args: IEdgeLabelHighlightAddedEventArgs) {
    super('edge-label-highlight-added', args);
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
