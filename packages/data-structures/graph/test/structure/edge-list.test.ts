import { BaseList } from '../../src/structure/base-list';
import { EdgeList } from '../../src/structure/edge-list';

describe('EdgeList', () => {
  let edgeList: EdgeList;

  beforeEach(() => {
    jest.restoreAllMocks();
    edgeList = new EdgeList();
  });

  describe('edge()', () => {
    it('calls BaseList.item()', () => {
      const mockItem = jest.fn();
      jest.spyOn(BaseList.prototype, 'item').mockImplementationOnce(mockItem);
      edgeList.edge(0);
      expect(mockItem).toHaveBeenLastCalledWith(0);
    });
  });

  describe('addEdge()', () => {
    it('calls BaseList.add()', () => {
      const mockAdd = jest.fn();
      jest.spyOn(BaseList.prototype, 'add').mockImplementationOnce(mockAdd);

      const edgeArgument = { id: 5, startNodeId: 2, endNodeId: 4 };
      edgeList.addEdge(edgeArgument);
      expect(mockAdd).toHaveBeenLastCalledWith(edgeArgument);
    });
  });

  describe('deleteEdge()', () => {
    it('calls BaseList.delete()', () => {
      const mockDelete = jest.fn();
      jest
        .spyOn(BaseList.prototype, 'delete')
        .mockImplementationOnce(mockDelete);

      edgeList.deleteEdge(0);
      expect(mockDelete).toHaveBeenLastCalledWith(0);
    });
  });

  describe('getEdgesInvolving()', () => {
    beforeEach(() => {
      edgeList
        .addEdge({ startNodeId: 0, endNodeId: 1 })
        .addEdge({ startNodeId: 2, endNodeId: 3 })
        .addEdge({ startNodeId: 1, endNodeId: 2 });
    });

    it('returns a list with all edges that involve the specified node ID', () => {
      const edgesA = edgeList.getEdgesInvolving(1);
      const edgesB = edgeList.getEdgesInvolving(3);
      expect(edgesA.map(edge => edge.id)).toEqual([0, 2]);
      expect(edgesB.map(edge => edge.id)).toEqual([1]);
    });

    it('returns clones of edges that involve the specified node ID', () => {
      const edgeClone = edgeList.getEdgesInvolving(3)[0];
      edgeClone.startNodeId = 10;
      expect(edgeList.edge(edgeClone.id)?.startNodeId).toBe(2);
    });

    it('returns an empty list when no edge involves the specified node iD', () => {
      const edges = edgeList.getEdgesInvolving(10);
      expect(edges).toHaveLength(0);
    });
  });

  describe('getNavigableEdgesBetween()', () => {
    it('returns a list of all node IDs that can be reached', () => {
      edgeList
        .addEdge({ startNodeId: 5, endNodeId: 7 })
        .addEdge({ startNodeId: 7, endNodeId: 5 })
        .addEdge({ startNodeId: 5, endNodeId: 7, isDirected: true })
        .addEdge({ startNodeId: 8, endNodeId: 9 });

      const edges = edgeList.getNavigableEdgesBetween({
        startNodeId: 5,
        endNodeId: 7,
      });
      expect(edges.map(edge => edge.id)).toEqual([0, 1, 2]);
    });

    it('excludes not navigable edges from the specified start node to the specified destination node', () => {
      edgeList
        .addEdge({ startNodeId: 5, endNodeId: 7 })
        .addEdge({ startNodeId: 7, endNodeId: 5 })
        .addEdge({ startNodeId: 5, endNodeId: 7, isDirected: true })
        .addEdge({ startNodeId: 7, endNodeId: 5, isDirected: true });

      const edges = edgeList.getNavigableEdgesBetween({
        startNodeId: 5,
        endNodeId: 7,
      });
      expect(edges.map(edge => edge.id)).toEqual([0, 1, 2]);
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
      edgeList
        .addEdge({ startNodeId: 0, endNodeId: 1 })
        .addEdge({ startNodeId: 0, endNodeId: 2 });

      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(0);
      expect(neighborIds).toEqual([1, 2]);
    });

    it('returns a list without duplicate IDs', () => {
      edgeList
        .addEdge({ startNodeId: 0, endNodeId: 5 })
        .addEdge({ startNodeId: 0, endNodeId: 7 })
        .addEdge({ startNodeId: 0, endNodeId: 7 });

      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(0);
      expect(neighborIds).toEqual([5, 7]);
    });

    it('returns a list without directed edges that target the specified node ID', () => {
      edgeList
        .addEdge({ startNodeId: 0, endNodeId: 5 })
        .addEdge({ startNodeId: 0, endNodeId: 6, isDirected: true })
        .addEdge({ startNodeId: 7, endNodeId: 0, isDirected: true })
        .addEdge({ startNodeId: 8, endNodeId: 0 });
      const neighborIds = edgeList.getNavigableNeighborNodeIdsFor(0);
      expect(neighborIds).toEqual([5, 6, 8]);
    });
  });
});
