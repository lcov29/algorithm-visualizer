import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { NodeHighlightStyleClass } from '../interfaces';

interface NodeHighlightRemovedEventArgs {
  nodeId: number;
  highlightStyleClass: NodeHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeHighlightRemovedEvent extends BaseEvent<'node-highlight-removed'> {
  private _nodeId: number;
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: NodeHighlightRemovedEventArgs) {
    super('node-highlight-removed');
    this._nodeId = args.nodeId;
    this._highlightStyleClass = args.highlightStyleClass;
  }

  get nodeId() {
    return this._nodeId;
  }

  get highlightStyleClass() {
    return this._highlightStyleClass;
  }

  set nodeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }

  set highlightStyleClass(input: NodeHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
