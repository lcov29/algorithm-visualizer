import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphStructureEdgeAddedEvent,
  GraphStructureEdgeDeletedEvent,
  GraphStructureEdgeWeightChangedEvent,
  GraphStructureEvent,
  GraphStructureInitializedEvent,
  GraphStructureNodeAddedEvent,
  GraphStructureNodeDeletedEvent,
  IEdge,
} from '@algorithm-visualizer/graph-contract';

import { EdgeList } from '../../src/structure/edge-list';
import { Graph } from '../../src/structure/graph';
import { NodeList } from '../../src/structure/node-list';

const mockNodes = [0, 1];

function initializeMockNodes() {
  const nodeList = new NodeList();
  nodeList.addNode();
  nodeList.addNode();
  return nodeList;
}

const mockEdges = [
  {
    id: 0,
    startNodeId: 1,
    endNodeId: 2,
    isDirected: true,
    weight: 1,
  },
  {
    id: 1,
    startNodeId: 2,
    endNodeId: 3,
    isDirected: false,
    weight: 2,
  },
];

function initializeMockEdges() {
  const edgeList = new EdgeList();
  edgeList.addEdge({
    startNodeId: 1,
    endNodeId: 2,
    isDirected: true,
    weight: 1,
  });
  edgeList.addEdge({
    startNodeId: 2,
    endNodeId: 3,
    isDirected: false,
    weight: 2,
  });
  return edgeList;
}

describe('Graph', () => {
  let graph: Graph;
  let nodes: NodeList;
  let edges: EdgeList;
  let eventHandlerChain: EventHandlerChain<GraphStructureEvent>;

  beforeEach(() => {
    jest.resetAllMocks();
    nodes = initializeMockNodes();
    edges = initializeMockEdges();
    eventHandlerChain = new EventHandlerChain({
      abortAfterSuccess: true,
      validator: new FunctionValidator(),
    });
    graph = new Graph({ nodes, edges, eventHandlerChain });
  });

  describe('nodes()', () => {
    it('returns a reduced clone of the node list', () => {
      expect(graph.nodeList.nodeIds).toEqual(mockNodes);
    });
  });

  describe('edges()', () => {
    it('returns a reduced clone of the edge list', () => {
      expect(graph.edgeList.edges).toEqual(mockEdges);
    });
  });

  describe('handleEvent()', () => {
    describe('when passed an graph-structure-edge-added event', () => {
      it('adds a new edge to the graph', async () => {
        const edge: Omit<IEdge, 'id'> = {
          startNodeId: 1,
          endNodeId: 3,
          isDirected: false,
          weight: 4,
        };
        const edgeAddedEvent = new GraphStructureEdgeAddedEvent({ edge });
        await graph.handleEvent(edgeAddedEvent);
        expect(graph.edgeList.edges).toEqual([
          ...mockEdges,
          { id: 2, startNodeId: 1, endNodeId: 3, isDirected: false, weight: 4 },
        ]);
      });
    });

    describe('when passed an graph-structure-edge-deleted event', () => {
      it('deletes the edge with the specified id', async () => {
        const edgeDeletedEvent = new GraphStructureEdgeDeletedEvent({
          edgeId: 1,
        });
        await graph.handleEvent(
          new GraphStructureEdgeDeletedEvent(edgeDeletedEvent),
        );
        expect(graph.edgeList.edges).toEqual([mockEdges[0]]);
      });

      it('does not delete any edges when the specified id is nonexistent', async () => {
        const edgeDeletedEvent = new GraphStructureEdgeDeletedEvent({
          edgeId: 6,
        });
        await graph.handleEvent(edgeDeletedEvent);
        expect(graph.edgeList.edges).toEqual(mockEdges);
      });
    });

    describe('when passed an graph-structure-edge-weight-changed event', () => {
      it('changes the edge weight of the specified id', async () => {
        const edgeWeightChangedEvent = new GraphStructureEdgeWeightChangedEvent(
          {
            edgeId: 1,
            newWeight: 100,
          },
        );
        await graph.handleEvent(edgeWeightChangedEvent);
        expect(graph.edgeList.edges).toEqual([
          mockEdges[0],
          { ...mockEdges[1], weight: 100 },
        ]);
      });

      it('does not change any edge weight when the specified id is nonexistent', async () => {
        const edgeWeightChangedEvent = new GraphStructureEdgeWeightChangedEvent(
          {
            edgeId: 9,
            newWeight: 100,
          },
        );
        await graph.handleEvent(edgeWeightChangedEvent);
        expect(graph.edgeList.edges).toEqual(mockEdges);
      });
    });

    describe('when passed a graph-structure-initialized event', () => {
      it('sets the nodeList and edgeList', async () => {
        const nodes = initializeMockNodes();
        nodes.addNode();
        const edges = initializeMockEdges();
        edges.addEdge({
          startNodeId: 4,
          endNodeId: 5,
        });
        const graphCreatedEvent = new GraphStructureInitializedEvent({
          nodes,
          edges,
        });
        await graph.handleEvent(graphCreatedEvent);
        expect(graph.nodeList.nodeIds).toEqual(nodes.nodeIds);
        expect(graph.edgeList.edges).toEqual(edges.edges);
      });
    });

    describe('when passed a graph-structure-node-added event', () => {
      it('adds a new node', async () => {
        const nodeAddedEvent = new GraphStructureNodeAddedEvent();
        await graph.handleEvent(nodeAddedEvent);
        expect(graph.nodeList.nodeIds).toEqual([0, 1, 2]);
      });
    });

    describe('when passed a graph-structure-node-deleted event', () => {
      it('deletes the node with the specified id', async () => {
        const nodeDeletedEvent = new GraphStructureNodeDeletedEvent({
          nodeId: 1,
        });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.nodeList.nodeIds).toEqual([mockNodes[0]]);
      });

      it('deletes all edges that include the specified node', async () => {
        const nodeDeletedEvent = new GraphStructureNodeDeletedEvent({
          nodeId: 1,
        });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.edgeList.edges).toEqual([mockEdges[1]]);
      });

      it('does not delete any nodes when the specified id is nonexistent', async () => {
        const nodeDeletedEvent = new GraphStructureNodeDeletedEvent({
          nodeId: 8,
        });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.nodeList.nodeIds).toEqual(mockNodes);
      });
    });
  });
});
