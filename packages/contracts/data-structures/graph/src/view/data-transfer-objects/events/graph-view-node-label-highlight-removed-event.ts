import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightStyleClass } from '../../types';
import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeLabelHighlightRemovedEventArgs
  extends IGraphViewNodeBaseEventArgs {
  highlightStyleClass: NodeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewNodeLabelHighlightRemovedEvent extends GraphViewNodeBaseEvent<'graph-view-node-label-highlight-removed'> {
  private _highlightStyleClass: NodeLabelHighlightStyleClass;

  constructor(args: IGraphViewNodeLabelHighlightRemovedEventArgs) {
    super('graph-view-node-label-highlight-removed', args);
    this._highlightStyleClass = args.highlightStyleClass;
  }

  get highlightStyleClass() {
    return this._highlightStyleClass;
  }

  set highlightStyleClass(input: NodeLabelHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
