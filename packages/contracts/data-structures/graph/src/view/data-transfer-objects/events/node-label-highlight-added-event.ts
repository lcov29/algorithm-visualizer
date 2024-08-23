import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { NodeLabelHighlightStyleClass } from '../../types';

interface INodeLabelHighlightAddedEventArgs {
  nodeId: number;
  highlightStyleClass: NodeLabelHighlightStyleClass;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelHighlightAddedEvent extends BaseEvent<'node-label-highlight-added'> {
  private _nodeId: number;
  private _highlightStyleClass: NodeLabelHighlightStyleClass;

  constructor(args: INodeLabelHighlightAddedEventArgs) {
    super('node-label-highlight-added');
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

  set highlightStyleClass(input: NodeLabelHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightStyleClass is forbidden',
    });
  }
}
