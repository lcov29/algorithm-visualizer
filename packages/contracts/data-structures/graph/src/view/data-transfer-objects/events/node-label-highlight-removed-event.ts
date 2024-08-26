import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightStyleClass } from '../../types';
import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeLabelHighlightRemovedEventArgs extends INodeBaseEventArgs {
  highlightStyleClass: NodeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelHighlightRemovedEvent extends NodeBaseEvent<'node-label-highlight-removed'> {
  private _highlightStyleClass: NodeLabelHighlightStyleClass;

  constructor(args: INodeLabelHighlightRemovedEventArgs) {
    super('node-label-highlight-removed', args);
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
