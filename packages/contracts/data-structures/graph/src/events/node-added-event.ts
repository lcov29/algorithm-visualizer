import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { INode } from '../interfaces';

export class NodeAddedEvent extends BaseEvent<'node-added'> {
  private _node: Omit<INode, 'id'>;

  constructor(node: Omit<INode, 'id'>) {
    super('node-added');
    this._node = node;
  }

  get node() {
    return structuredClone(this._node);
  }
}
