/**
 * Data structure representing the nodes of a {@link Graph}.
 */
export interface IGraphStructureNodeList {
  readonly nodeIds: number[];
  addNode: () => number;
  deleteNode: (id: number) => IGraphStructureNodeList;
  hasNode: (id: number) => boolean;
  clone: () => IGraphStructureNodeList;
  [Symbol.iterator]: () => {
    next: () => { value?: number; done: boolean };
  };
}

export interface IReducedGraphStructureNodeList
  extends Omit<IGraphStructureNodeList, 'addNode' | 'deleteNode' | 'clone'> {}
