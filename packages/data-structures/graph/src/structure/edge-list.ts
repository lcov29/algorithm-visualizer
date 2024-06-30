import { BaseList } from './base-list';

export interface IEdge {
  id: number;
  startNodeId: number;
  endNodeId: number;
  isDirected?: boolean;
  weight?: number;
}

export interface INavigableEdgesArgs {
  startNodeId: number;
  endNodeId: number;
}

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

export class EdgeList extends BaseList<IEdge> implements IEdgeList {
  constructor() {
    super();
  }

  edge(id: number): IEdge | null {
    return super.item(id);
  }

  addEdge(edge: Omit<IEdge, 'id'>): EdgeList {
    super.add(edge);
    return this;
  }

  deleteEdge(id: number): EdgeList {
    super.delete(id);
    return this;
  }

  replaceEdge(edge: IEdge): EdgeList {
    super.replace(edge);
    return this;
  }

  getEdgesInvolving(nodeId: number): IEdge[] {
    return super.list.filter(({ startNodeId, endNodeId }) =>
      [startNodeId, endNodeId].includes(nodeId),
    );
  }

  getNavigableEdgesBetween(args: INavigableEdgesArgs): IEdge[] {
    return super.list.filter(({ startNodeId, endNodeId, isDirected }) => {
      const isEdgeBetweenStartEnd =
        args.startNodeId === startNodeId && args.endNodeId === endNodeId;
      const isEdgeBetweenEndStart =
        args.startNodeId === endNodeId && args.endNodeId === startNodeId;
      return isEdgeBetweenStartEnd || (!isDirected && isEdgeBetweenEndStart);
    });
  }

  getNavigableNeighborNodeIdsFor(nodeId: number): number[] {
    const neighborIds = super.list
      .map(({ startNodeId, endNodeId, isDirected }) => {
        const isStartNode = nodeId === startNodeId;
        if (isStartNode) {
          return endNodeId;
        }
        const isEndNodeOfUndirectedEdge = nodeId === endNodeId && !isDirected;
        if (isEndNodeOfUndirectedEdge) {
          return startNodeId;
        }
        return null;
      })
      .filter<number>((id): id is number => id !== null);

    const uniqueNeighborIDs = [...new Set(neighborIds)];
    return uniqueNeighborIDs;
  }
}
