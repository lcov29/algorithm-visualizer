import { INode } from './node';

/**
 * Data structure representing the nodes of a {@link Graph}.
 */
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
