import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeLabelDisplayArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelDisplayEvent extends BaseEvent<'node-label-displayed'> {
  private _nodeId: number;

  constructor({ nodeId }: NodeLabelDisplayArgs) {
    super('node-label-displayed');
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
