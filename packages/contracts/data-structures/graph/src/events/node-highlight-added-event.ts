import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

/**
 * @throws InvalidOperationError
 */
export class NodeHighlightAddedEvent extends BaseEvent<'node-highlight-added'> {
  private _nodeId: number;

  constructor(nodeId: number) {
    super('node-highlight-added');
    this._nodeId = nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }

  set nodeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }
}
