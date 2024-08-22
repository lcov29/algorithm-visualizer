import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { NodeHighlightStyleClass } from '../interfaces';

interface NodeHighlightAddedEventArgs {
  nodeId: number;
  highlightStyleClass: NodeHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeHighlightAddedEvent extends BaseEvent<'node-highlight-added'> {
  private _nodeId: number;
  private _highlightStyleClass: NodeHighlightStyleClass;

  constructor(args: NodeHighlightAddedEventArgs) {
    super('node-highlight-added');
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
