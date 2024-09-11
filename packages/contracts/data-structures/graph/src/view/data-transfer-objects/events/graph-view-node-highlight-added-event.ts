import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightStyleClass } from '../../types';
import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeHighlightAddedEvent
  extends IGraphViewNodeBaseEventArgs {
  highlightStyleClass: NodeHighlightStyleClass;
}

export class GraphViewNodeHighlightAddedEvent extends GraphViewNodeBaseEvent<'graph-view-node-highlight-added'> {
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: IGraphViewNodeHighlightAddedEvent) {
    super('graph-view-node-highlight-added', args);
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
