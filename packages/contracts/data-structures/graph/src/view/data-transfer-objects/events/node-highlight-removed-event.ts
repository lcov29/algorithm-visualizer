import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightStyleClass } from '../../types';
import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeHighlightRemovedEventArgs extends INodeBaseEventArgs {
  highlightStyleClass: NodeHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeHighlightRemovedEvent extends NodeBaseEvent<'node-highlight-removed'> {
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: INodeHighlightRemovedEventArgs) {
    super('node-highlight-removed', args);
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
