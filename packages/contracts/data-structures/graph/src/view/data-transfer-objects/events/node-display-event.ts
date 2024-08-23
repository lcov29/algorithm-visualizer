import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeDisplayArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeDisplayEvent extends BaseEvent<'node-displayed'> {
  private _nodeId: number;

  constructor({ nodeId }: NodeDisplayArgs) {
    super('node-displayed');
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
