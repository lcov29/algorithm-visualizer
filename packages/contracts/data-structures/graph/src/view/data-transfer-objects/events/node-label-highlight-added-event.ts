import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightStyleClass } from '../../types';
import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeLabelHighlightAddedEventArgs extends INodeBaseEventArgs {
  highlightStyleClass: NodeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelHighlightAddedEvent extends NodeBaseEvent<'node-label-highlight-added'> {
  private _highlightStyleClass: NodeLabelHighlightStyleClass;

  constructor(args: INodeLabelHighlightAddedEventArgs) {
    super('node-label-highlight-added', args);
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
