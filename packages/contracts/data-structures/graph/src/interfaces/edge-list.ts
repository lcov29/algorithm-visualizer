import { IEdge } from './edge';

export interface INavigableEdgesArgs {
  startNodeId: number;
  endNodeId: number;
}

/**
 * Data structure representing the edges of a {@link Graph}.
 */
export interface IEdgeList {
  readonly list: IEdge[];
  edge: (id: number) => IEdge | null;
  addEdge: (edge: Omit<IEdge, 'id'>) => IEdgeList;
  deleteEdge: (id: number) => IEdgeList;
  replaceEdge: (edge: IEdge) => IEdgeList;
  getEdgesInvolving: (nodeId: number) => IEdge[];
  getNavigableEdgesBetween: (args: INavigableEdgesArgs) => IEdge[];
  getNavigableNeighborNodeIdsFor: (nodeId: number) => number[];
  [Symbol.iterator]: () => {
    next: () => { value?: IEdge; done: boolean };
  };
}
