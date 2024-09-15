import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { IEdge } from '@algorithm-visualizer/graph-contract';

import { EdgeList } from '../../src/structure/edge-list';

describe('EdgeList', () => {
  let edgeList: EdgeList;
  const mockEdge1: Omit<IEdge, 'id'> = { startNodeId: 0, endNodeId: 1 };
  const mockEdge2: Omit<IEdge, 'id'> = { startNodeId: 1, endNodeId: 2 };

  beforeEach(() => {
    jest.restoreAllMocks();
    edgeList = new EdgeList();
    edgeList.addEdge(mockEdge1);
    edgeList.addEdge(mockEdge2);
  });

  describe('edges()', () => {
    it('getter returns clone of edge list', () => {
      const edges = edgeList.edges;
      edges.push({ id: 2, startNodeId: 2, endNodeId: 3 });
      expect(edgeList.edges).toEqual([
        { id: 0, ...mockEdge1 },
        { id: 1, ...mockEdge2 },
      ]);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeList.edges = [];
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edges is forbidden',
        }),
      );
    });
  });

  describe('edge()', () => {
    it('returns a clone of the edge with the specified id', () => {
      const edge = edgeList.edge(0)!;
      edge.id = 3;
      expect(edgeList.edge(0)).toEqual({ id: 0, ...mockEdge1 });
    });

    it('returns null when there is no edge with the specified id', () => {
      expect(edgeList.edge(3)).toBeNull();
    });
  });

  describe('addEdge()', () => {
    it('adds the specified edge with an ascending edge id', () => {
      expect(edgeList.edges).toEqual([
        { id: 0, ...mockEdge1 },
        { id: 1, ...mockEdge2 },
      ]);
      edgeList.addEdge({ startNodeId: 2, endNodeId: 3 });
      expect(edgeList.edges).toEqual([
        { id: 0, ...mockEdge1 },
        { id: 1, ...mockEdge2 },
        { id: 2, startNodeId: 2, endNodeId: 3 },
      ]);
    });

    it('returns the id of the added edge', () => {
      const edgeId = edgeList.addEdge({ startNodeId: 2, endNodeId: 3 });
      expect(edgeId).toBe(2);
    });
  });

  describe('changeWeight()', () => {
    it('changes the weight of the specified edge to the specified weight', () => {
      edgeList.addEdge({ startNodeId: 2, endNodeId: 3, weight: 3 });
      expect(edgeList.edge(2)?.weight).toBe(3);
      edgeList.changeWeight({ edgeId: 2, newWeight: 5 });
      expect(edgeList.edge(2)?.weight).toBe(5);
    });
  });

  describe('deleteEdge()', () => {
    it('removes edge with the specified id from the list', () => {
      expect(edgeList.edges).toEqual([
        { id: 0, ...mockEdge1 },
        { id: 1, ...mockEdge2 },
      ]);
      edgeList.deleteEdge(1);
      expect(edgeList.edges).toEqual([{ id: 0, ...mockEdge1 }]);
    });

    it('returns a reference to the edge list', () => {
      expect(edgeList.deleteEdge(1)).toBe(edgeList);
    });
  });

  describe('getEdgesInvolving()', () => {
    beforeEach(() => {
      edgeList.addEdge({ startNodeId: 2, endNodeId: 3 });
    });

    it('returns a list with all edges that involve the specified node ID', () => {
      const edgesA = edgeList.getEdgesInvolving(1);
      const edgesB = edgeList.getEdgesInvolving(3);
      expect(edgesA.map(edge => edge.id)).toEqual([0, 1]);
      expect(edgesB.map(edge => edge.id)).toEqual([2]);
    });

    it('returns clones of edges that involve the specified node ID', () => {
      const edgeClone = edgeList.getEdgesInvolving(3)[0];
      edgeClone.startNodeId = 10;
      expect(edgeList.getEdgesInvolving(3)[0].startNodeId).toBe(2);
    });

    it('returns an empty list when no edge involves the specified node iD', () => {
      const edges = edgeList.getEdgesInvolving(10);
      expect(edges).toHaveLength(0);
    });
  });

  describe('getNavigableEdgesBetween()', () => {
    const edgeA = { startNodeId: 5, endNodeId: 7 };
    const edgeB = { startNodeId: 7, endNodeId: 5 };
    const edgeC = { startNodeId: 5, endNodeId: 7, isDirected: true };

    it('returns a list of navigable edges between the specified nodes', () => {
      edgeList.addEdge(edgeA);
      edgeList.addEdge(edgeB);
      edgeList.addEdge(edgeC);

      const edges = edgeList.getNavigableEdgesBetween({
        startNodeId: 5,
        endNodeId: 7,
      });
      expect(edges).toEqual([
        { id: 2, ...edgeA },
        { id: 3, ...edgeB },
        { id: 4, ...edgeC },
      ]);
    });

    it('returns clones of all navigable edges between the specified nodes', () => {
      edgeList.addEdge(edgeA);
      edgeList.addEdge(edgeB);
      edgeList.addEdge(edgeC);

      const edgeArgs = { startNodeId: 5, endNodeId: 7 };
      edgeList.getNavigableEdgesBetween(edgeArgs)[0].id = 53;
      const edges = edgeList.getNavigableEdgesBetween(edgeArgs);
      expect(edges).toEqual([
        { id: 2, ...edgeA },
        { id: 3, ...edgeB },
        { id: 4, ...edgeC },
      ]);
    });

    it('excludes not navigable edges from the specified start node to the specified destination node', () => {
      edgeList.addEdge(edgeA);
      edgeList.addEdge(edgeB);
      edgeList.addEdge(edgeC);
      edgeList.addEdge({ startNodeId: 7, endNodeId: 5, isDirected: true });

      const edges = edgeList.getNavigableEdgesBetween({
        startNodeId: 5,
        endNodeId: 7,
      });
      expect(edges).toEqual([
        { id: 2, ...edgeA },
        { id: 3, ...edgeB },
        { id: 4, ...edgeC },
      ]);
    });

    it('returns an empty list when no navigable edge between the specified nodes exist', () => {
      edgeList.addEdge({ startNodeId: 5, endNodeId: 7 });
      const edges = edgeList.getNavigableEdgesBetween({
        startNodeId: 5,
        endNodeId: 4,
      });
      expect(edges).toHaveLength(0);
    });
  });

  describe('getNavigableNeighborNodeIdsFor()', () => {
    it('returns a list of all node IDs that can be reached by a navigable edge', () => {
      edgeList.addEdge({ startNodeId: 5, endNodeId: 1 });
      edgeList.addEdge({ startNodeId: 5, endNodeId: 2 });

      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(5);
      expect(neighborIds).toEqual([1, 2]);
    });

    it('returns a list without duplicate IDs', () => {
      edgeList.addEdge({ startNodeId: 5, endNodeId: 5 });
      edgeList.addEdge({ startNodeId: 5, endNodeId: 7 });
      edgeList.addEdge({ startNodeId: 5, endNodeId: 7 });

      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(5);
      expect(neighborIds).toEqual([5, 7]);
    });

    it('returns a list without directed edges that target the specified node ID', () => {
      edgeList.addEdge({ startNodeId: 5, endNodeId: 5 });
      edgeList.addEdge({ startNodeId: 5, endNodeId: 6, isDirected: true });
      edgeList.addEdge({ startNodeId: 7, endNodeId: 5, isDirected: true });
      edgeList.addEdge({ startNodeId: 8, endNodeId: 5 });

      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(5);
      expect(neighborIds).toEqual([5, 6, 8]);
    });
  });

  describe('Iterator', () => {
    it('enables iteration over all node ids', () => {
      const receivedEdgeIds = [];
      for (const edge of edgeList) {
        receivedEdgeIds.push(edge);
      }
      expect(receivedEdgeIds).toEqual([
        { id: 0, startNodeId: 0, endNodeId: 1 },
        { id: 1, startNodeId: 1, endNodeId: 2 },
      ]);
    });
  });
});
