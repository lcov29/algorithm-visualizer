import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

export interface INodeDeletedEvent extends IBaseEvent<'node-deleted'> {
  nodeId: number;
}

interface NodeDeletedEventArgs {
  nodeId: number;
}

export class NodeDeletedEvent
  extends BaseEvent<'node-deleted'>
  implements INodeDeletedEvent
{
  private _nodeId: number;

  constructor({ nodeId }: NodeDeletedEventArgs) {
    super('node-deleted');
    this._nodeId = nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }
}
