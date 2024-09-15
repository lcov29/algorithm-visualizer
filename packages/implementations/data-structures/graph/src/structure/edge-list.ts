import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import {
  IEdge,
  IEdgeList,
  INavigableEdgesArgs,
} from '@algorithm-visualizer/graph-contract';

interface IEdgeListArgs {
  edges: IEdge[];
  nextAvailableEdgeId: number;
}

export class EdgeList implements IEdgeList {
  private _edges: IEdge[];
  private _nextAvailableEdgeId: number;

  constructor(args?: IEdgeListArgs) {
    this._edges = args?.edges ?? [];
    this._nextAvailableEdgeId = args?.nextAvailableEdgeId ?? 0;
  }

  get edges(): IEdge[] {
    return this._edges.map(edge => structuredClone(edge));
  }

  set edges(edges: IEdge[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edges is forbidden',
    });
  }

  edge(id: number): IEdge | null {
    const edge = this._edges.find(edge => edge.id === id);
    return structuredClone(edge) ?? null;
  }

  addEdge(edge: Omit<IEdge, 'id'>): number {
    const newEdgeId = this._nextAvailableEdgeId++;
    this._edges.push({
      id: newEdgeId,
      ...edge,
    });
    return newEdgeId;
  }

  changeWeight(args: { edgeId: number; newWeight: number }) {
    const { edgeId, newWeight } = args;
    const edge = this._edges.find(edge => edge.id === edgeId);
    if (edge) {
      edge.weight = newWeight;
    }
  }

  deleteEdge(id: number): IEdgeList {
    this._edges = this._edges.filter(edgeId => edgeId.id !== id);
    return this;
  }

  clone() {
    return new EdgeList({
      edges: structuredClone(this._edges),
      nextAvailableEdgeId: this._nextAvailableEdgeId,
    });
  }

  getEdgesInvolving(nodeId: number): IEdge[] {
    return this._edges
      .filter(({ startNodeId, endNodeId }) =>
        [startNodeId, endNodeId].includes(nodeId),
      )
      .map(edge => structuredClone(edge));
  }

  getNavigableEdgesBetween(args: INavigableEdgesArgs): IEdge[] {
    return this._edges
      .filter(({ startNodeId, endNodeId, isDirected }) => {
        const isEdgeBetweenStartEnd =
          args.startNodeId === startNodeId && args.endNodeId === endNodeId;
        const isEdgeBetweenEndStart =
          args.startNodeId === endNodeId && args.endNodeId === startNodeId;
        return isEdgeBetweenStartEnd || (!isDirected && isEdgeBetweenEndStart);
      })
      .map(edge => structuredClone(edge));
  }

  getNavigableNeighborNodeIdsFor(nodeId: number): number[] {
    const neighborIds = this._edges
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

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this._edges.length) {
          return { value: structuredClone(this._edges[index++]), done: false };
        }
        return { done: true };
      },
    };
  }
}
