import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightStyleClass } from '../../types';
import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeHighlightAddedEvent extends INodeBaseEventArgs {
  highlightStyleClass: NodeHighlightStyleClass;
}

export class NodeHighlightAddedEvent extends NodeBaseEvent<'node-highlight-added'> {
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: INodeHighlightAddedEvent) {
    super('node-highlight-added', args);
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
