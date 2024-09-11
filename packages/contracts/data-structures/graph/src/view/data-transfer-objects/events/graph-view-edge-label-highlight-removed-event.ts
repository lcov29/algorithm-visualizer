import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelHighlightStyleClass } from '../../types';
import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

interface IGraphViewEdgeLabelHighlightRemovedEventArgs
  extends IGraphViewEdgeBaseEventArgs {
  highlightStyleClass: EdgeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewEdgeLabelHighlightRemovedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-label-highlight-removed'> {
  private _highlightStyleClass: EdgeLabelHighlightStyleClass;

  constructor(args: IGraphViewEdgeLabelHighlightRemovedEventArgs) {
    super('graph-view-edge-label-highlight-removed', args);
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
