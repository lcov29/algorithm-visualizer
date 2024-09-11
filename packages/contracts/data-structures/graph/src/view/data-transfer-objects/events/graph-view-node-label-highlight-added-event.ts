import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightStyleClass } from '../../types';
import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeLabelHighlightAddedEventArgs
  extends IGraphViewNodeBaseEventArgs {
  highlightStyleClass: NodeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewNodeLabelHighlightAddedEvent extends GraphViewNodeBaseEvent<'graph-view-node-label-highlight-added'> {
  private _highlightStyleClass: NodeLabelHighlightStyleClass;

  constructor(args: IGraphViewNodeLabelHighlightAddedEventArgs) {
    super('graph-view-node-label-highlight-added', args);
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
