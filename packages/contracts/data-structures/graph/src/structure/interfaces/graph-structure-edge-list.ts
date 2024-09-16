import { IGraphStructureEdge } from './graph-structure-edge';

export interface INavigableEdgesArgs {
  startNodeId: number;
  endNodeId: number;
}

/**
 * Data structure representing the edges of a {@link Graph}.
 */
export interface IGraphStructureEdgeList {
  readonly edges: IGraphStructureEdge[];
  edge: (id: number) => IGraphStructureEdge | null;
  addEdge: (edge: Omit<IGraphStructureEdge, 'id'>) => number;
  changeWeight: (args: { edgeId: number; newWeight: number }) => void;
  deleteEdge: (id: number) => IGraphStructureEdgeList;
  getEdgesInvolving: (nodeId: number) => IGraphStructureEdge[];
  getNavigableEdgesBetween: (
    args: INavigableEdgesArgs,
  ) => IGraphStructureEdge[];
  getNavigableNeighborNodeIdsFor: (nodeId: number) => number[];
  clone: () => IGraphStructureEdgeList;
  [Symbol.iterator]: () => {
    next: () => { value?: IGraphStructureEdge; done: boolean };
  };
}

export interface IReducedGraphStructureEdgeList
  extends Omit<
    IGraphStructureEdgeList,
    'addEdge' | 'deleteEdge' | 'changeWeight' | 'clone'
  > {}
