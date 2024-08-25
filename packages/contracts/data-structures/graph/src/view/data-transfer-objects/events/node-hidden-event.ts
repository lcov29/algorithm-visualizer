import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface INodeHiddenEventArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeHiddenEvent extends BaseEvent<'node-hidden'> {
  private _nodeId: number;

  constructor(args: INodeHiddenEventArgs) {
    super('node-hidden');
    this._nodeId = args.nodeId;
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
