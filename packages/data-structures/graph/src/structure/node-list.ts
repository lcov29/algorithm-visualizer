import { BaseList } from './base-list';

export interface INode {
  id: number;
  label: string;
}

export interface INodeList {
  readonly list: INode[];
  node: (id: number) => INode | null;
  addNode: (node: Omit<INode, 'id'>) => INodeList;
  deleteNode: (id: number) => INodeList;
  changeLabel: (node: INode) => INodeList;
  [Symbol.iterator]: () => {
    next: () => { value?: INode; done: boolean };
  };
}

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
