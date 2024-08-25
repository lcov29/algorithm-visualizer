import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface INodeDeletedEventArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeDeletedEvent extends BaseEvent<'node-deleted'> {
  private _nodeId: number;

  constructor(args: INodeDeletedEventArgs) {
    super('node-deleted');
    this._nodeId = args.nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }

  set nodeId(nodeId: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }
}
