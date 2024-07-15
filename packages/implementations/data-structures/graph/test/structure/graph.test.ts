import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  EdgeAddedEvent,
  EdgeDeletedEvent,
  EdgeWeightChangedEvent,
  GraphCreatedEvent,
  GraphEvent,
  NodeAddedEvent,
  NodeDeletedEvent,
  NodeLabelChangedEvent,
} from '@algorithm-visualizer/graph-contract';

import { EdgeList } from '../../src/structure/edge-list';
import { Graph } from '../../src/structure/graph';
import { NodeList } from '../../src/structure/node-list';

const mockNodes = [
  { id: 0, label: 'Node1' },
  { id: 1, label: 'Node2' },
];

function initializeMockNodes() {
  const nodeList = new NodeList();
  nodeList.addNode({ label: 'Node1' }).addNode({ label: 'Node2' });
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
  edgeList
    .addEdge({ startNodeId: 1, endNodeId: 2, isDirected: true, weight: 1 })
    .addEdge({ startNodeId: 2, endNodeId: 3, isDirected: false, weight: 2 });
  return edgeList;
}

describe('Graph', () => {
  let graph: Graph;
  let nodes: NodeList;
  let edges: EdgeList;
  let eventHandlerChain: EventHandlerChain<GraphEvent>;

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
    it('returns a list of the indexed nodes', () => {
      expect(graph.nodes).toEqual(mockNodes);
    });
  });

  describe('edges()', () => {
    it('returns a list of the indexed edges', () => {
      expect(graph.edges).toEqual(mockEdges);
    });
  });

  describe('handleEvent()', () => {
    describe('when passed an edge-added event', () => {
      it('adds a new edge to the graph', async () => {
        const edgeAddedEvent = new EdgeAddedEvent({
          startNodeId: 1,
          endNodeId: 3,
          isDirected: false,
          weight: 4,
        });
        await graph.handleEvent(edgeAddedEvent);
        expect(graph.edges).toEqual([
          ...mockEdges,
          { id: 2, startNodeId: 1, endNodeId: 3, isDirected: false, weight: 4 },
        ]);
      });
    });

    describe('when passed an edge-deleted event', () => {
      it('deletes the edge with the specified id', async () => {
        const edgeDeletedEvent = new EdgeDeletedEvent({ edgeId: 1 });
        await graph.handleEvent(new EdgeDeletedEvent(edgeDeletedEvent));
        expect(graph.edges).toEqual([mockEdges[0]]);
      });

      it('does not delete any edges when the specified id is nonexistent', async () => {
        const edgeDeletedEvent = new EdgeDeletedEvent({ edgeId: 6 });
        await graph.handleEvent(edgeDeletedEvent);
        expect(graph.edges).toEqual(mockEdges);
      });
    });

    describe('when passed an edge-weight-changed event', () => {
      it('changes the edge weight of the specified id', async () => {
        const edgeWeightChangedEvent = new EdgeWeightChangedEvent({
          edgeId: 1,
          newWeight: 100,
        });
        await graph.handleEvent(edgeWeightChangedEvent);
        expect(graph.edges).toEqual([
          mockEdges[0],
          { ...mockEdges[1], weight: 100 },
        ]);
      });

      it('does not change any edge weight when the specified id is nonexistent', async () => {
        const edgeWeightChangedEvent = new EdgeWeightChangedEvent({
          edgeId: 9,
          newWeight: 100,
        });
        await graph.handleEvent(edgeWeightChangedEvent);
        expect(graph.edges).toEqual(mockEdges);
      });
    });

    describe('when passed a graph-created event', () => {
      it('sets the nodeList and edgeList', async () => {
        const nodes = initializeMockNodes();
        nodes.add({ label: 'Node3' });
        const edges = initializeMockEdges();
        edges.add({
          startNodeId: 4,
          endNodeId: 5,
        });
        const graphCreatedEvent = new GraphCreatedEvent({ nodes, edges });
        await graph.handleEvent(graphCreatedEvent);
        expect(graph.nodes).toEqual(nodes.list);
        expect(graph.edges).toEqual(edges.list);
      });
    });

    describe('when passed a node-added event', () => {
      it('adds a new node', async () => {
        const nodeAddedEvent = new NodeAddedEvent({ label: 'newNode' });
        await graph.handleEvent(nodeAddedEvent);
        expect(graph.nodes).toEqual([
          ...mockNodes,
          { id: 2, label: 'newNode' },
        ]);
      });
    });

    describe('when passed a node-deleted event', () => {
      it('deletes the node with the specified id', async () => {
        const nodeDeletedEvent = new NodeDeletedEvent({ nodeId: 1 });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.nodes).toEqual([mockNodes[0]]);
      });

      it('deletes all edges that include the specified node', async () => {
        const nodeDeletedEvent = new NodeDeletedEvent({ nodeId: 1 });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.edges).toEqual([mockEdges[1]]);
      });

      it('does not delete any nodes when the specified id is nonexistent', async () => {
        const nodeDeletedEvent = new NodeDeletedEvent({ nodeId: 8 });
        await graph.handleEvent(nodeDeletedEvent);
        expect(graph.nodes).toEqual(mockNodes);
      });
    });

    describe('when passed a node-label-changed event', () => {
      it('changes the label of the specified node id', async () => {
        const nodeLabelChangedEvent = new NodeLabelChangedEvent({
          nodeId: 1,
          label: 'newLabel',
        });
        await graph.handleEvent(nodeLabelChangedEvent);
        expect(graph.nodes).toEqual([
          mockNodes[0],
          { ...mockNodes[1], label: 'newLabel' },
        ]);
      });

      it('does not change any node label when the specified id is nonexistent', async () => {
        const nodeLabelChangedEvent = new NodeLabelChangedEvent({
          nodeId: 9,
          label: 'newLabel',
        });
        await graph.handleEvent(nodeLabelChangedEvent);
        expect(graph.nodes).toEqual(mockNodes);
      });
    });
  });
});
