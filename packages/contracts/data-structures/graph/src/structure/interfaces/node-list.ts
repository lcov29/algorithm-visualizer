/**
 * Data structure representing the nodes of a {@link Graph}.
 */
export interface INodeList {
  readonly nodeIds: number[];
  addNode: () => number;
  deleteNode: (id: number) => INodeList;
  hasNode: (id: number) => boolean;
  [Symbol.iterator]: () => {
    next: () => { value?: number; done: boolean };
  };
}
