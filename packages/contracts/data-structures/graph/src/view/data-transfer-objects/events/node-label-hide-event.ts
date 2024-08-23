import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeLabelHideArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelHideEvent extends BaseEvent<'node-label-hidden'> {
  private _nodeId: number;

  constructor({ nodeId }: NodeLabelHideArgs) {
    super('node-label-hidden');
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
