import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeDeletedEventArgs {
  nodeId: number;
}

export class NodeDeletedEvent extends BaseEvent<'node-deleted'> {
  private _nodeId: number;

  constructor({ nodeId }: NodeDeletedEventArgs) {
    super('node-deleted');
    this._nodeId = nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }
}
