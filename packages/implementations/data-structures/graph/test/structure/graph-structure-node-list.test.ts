import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureNodeList } from '../../src/structure/graph-structure-node-list';

describe('GraphStructureNodeList', () => {
  let nodeList: GraphStructureNodeList;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeList = new GraphStructureNodeList();
    nodeList.addNode();
    nodeList.addNode();
  });

  describe('nodeIds()', () => {
    it('getter returns a clone of the specified nodeIds list', () => {
      nodeList.nodeIds.push(3);
      expect(nodeList.nodeIds).toEqual([0, 1]);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (nodeList.nodeIds = [3])).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeIds is forbidden',
        }),
      );
    });
  });

  describe('addNode()', () => {
    it('adds a new node with ascending Id', () => {
      expect(nodeList.nodeIds).toEqual([0, 1]);
      nodeList.addNode();
      expect(nodeList.nodeIds).toEqual([0, 1, 2]);
      nodeList.addNode();
      expect(nodeList.nodeIds).toEqual([0, 1, 2, 3]);
    });

    it('returns the Id of the new node', () => {
      expect(nodeList.addNode()).toBe(2);
    });
  });

  describe('deleteNode()', () => {
    it('removes the specified node Id from the list', () => {
      expect(nodeList.nodeIds).toEqual([0, 1]);
      nodeList.deleteNode(1);
      expect(nodeList.nodeIds).toEqual([0]);
    });

    it('does not modify the list when the specified node Id is not a list item', () => {
      expect(nodeList.nodeIds).toEqual([0, 1]);
      nodeList.deleteNode(2);
      expect(nodeList.nodeIds).toEqual([0, 1]);
    });
  });

  describe('hasNode()', () => {
    it('returns true when the specified node id is a list item', () => {
      expect(nodeList.hasNode(0)).toBe(true);
    });

    it('returns false when the specified node id is not a list item', () => {
      expect(nodeList.hasNode(2)).toBe(false);
    });
  });

  describe('clone()', () => {
    it('returns a clone ', () => {
      const clone = nodeList.clone();
      nodeList.deleteNode(0);
      nodeList.addNode();
      clone.addNode();
      clone.addNode();
      expect(nodeList.nodeIds).toEqual([1, 2]);
      expect(clone.nodeIds).toEqual([0, 1, 2, 3]);
    });
  });

  describe('Iterator', () => {
    it('enables iteration over all node ids', () => {
      const receivedNodeIds = [];
      for (const nodeId of nodeList) {
        receivedNodeIds.push(nodeId);
      }
      expect(receivedNodeIds).toEqual([0, 1]);
    });
  });
});
