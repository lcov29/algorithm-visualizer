import { IEdge } from './edge';

export interface INavigableEdgesArgs {
  startNodeId: number;
  endNodeId: number;
}

/**
 * Data structure representing the edges of a {@link Graph}.
 */
export interface IEdgeList {
  readonly edges: IEdge[];
  edge: (id: number) => IEdge | null;
  addEdge: (edge: Omit<IEdge, 'id'>) => number;
  changeWeight: (args: { edgeId: number; newWeight: number }) => void;
  deleteEdge: (id: number) => IEdgeList;
  getEdgesInvolving: (nodeId: number) => IEdge[];
  getNavigableEdgesBetween: (args: INavigableEdgesArgs) => IEdge[];
  getNavigableNeighborNodeIdsFor: (nodeId: number) => number[];
  [Symbol.iterator]: () => {
    next: () => { value?: IEdge; done: boolean };
  };
}
