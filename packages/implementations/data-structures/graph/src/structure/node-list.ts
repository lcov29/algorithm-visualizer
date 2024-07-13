import { INode, INodeList } from '@algorithm-visualizer/graph-contract';

import { BaseList } from './base-list';

/**
 * Data structure representing the nodes of a {@link Graph}.
 */
export class NodeList extends BaseList<INode> implements INodeList {
  constructor() {
    super();
  }

  node(id: number): INode | null {
    return super.item(id);
  }

  addNode(node: Omit<INode, 'id'>): NodeList {
    super.add(node);
    return this;
  }

  deleteNode(id: number): NodeList {
    super.delete(id);
    return this;
  }

  changeLabel(node: INode): NodeList {
    super.replace(node);
    return this;
  }
}
