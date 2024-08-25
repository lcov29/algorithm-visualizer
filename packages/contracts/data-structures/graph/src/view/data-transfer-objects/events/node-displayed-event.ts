import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface INodeDisplayedEventArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeDisplayedEvent extends BaseEvent<'node-displayed'> {
  private _nodeId: number;

  constructor(args: INodeDisplayedEventArgs) {
    super('node-displayed');
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
