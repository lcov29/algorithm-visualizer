import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

import { INode } from '../structure/node-list';

export interface INodeAddedEvent extends IBaseEvent<'node-added'> {
  node: Omit<INode, 'id'>;
}

export class NodeAddedEvent
  extends BaseEvent<'node-added'>
  implements IBaseEvent<'node-added'>
{
  private _node: Omit<INode, 'id'>;

  constructor(node: Omit<INode, 'id'>) {
    super('node-added');
    this._node = node;
  }

  get node() {
    return structuredClone(this._node);
  }
}
