import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightStyleClass } from '../../types';
import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeHighlightRemovedEventArgs
  extends IGraphViewNodeBaseEventArgs {
  highlightStyleClass: NodeHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewNodeHighlightRemovedEvent extends GraphViewNodeBaseEvent<'graph-view-node-highlight-removed'> {
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: IGraphViewNodeHighlightRemovedEventArgs) {
    super('graph-view-node-highlight-removed', args);
    this._highlightStyleClass = args.highlightStyleClass;
  }

  get highlightStyleClass() {
    return this._highlightStyleClass;
  }

  set highlightStyleClass(input: NodeHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
