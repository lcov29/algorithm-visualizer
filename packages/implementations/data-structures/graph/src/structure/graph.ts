import {
  EventHandlingError,
  IEventHandlerChain,
  IEventSubscriber,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphEvent,
  IEdgeList,
  IGraph,
  INodeList,
} from '@algorithm-visualizer/graph-contract';

interface IGraphArgs {
  nodes: INodeList;
  edges: IEdgeList;
  eventHandlerChain: IEventHandlerChain<GraphEvent>;
}

/**
 * Data structure representing a graph.
 * Can be modified by different GraphEvents.
 *
 * @throws EventHandlingError
 */
export class Graph implements IGraph, IEventSubscriber<GraphEvent> {
  private _nodes: INodeList;
  private _edges: IEdgeList;
  private _eventHandlerChain: IEventHandlerChain<GraphEvent>;

  constructor({ nodes, edges, eventHandlerChain }: IGraphArgs) {
    this._nodes = nodes;
    this._edges = edges;
    this._eventHandlerChain = eventHandlerChain;
    this._initializeEventHandlerChain();
  }

  get nodes() {
    return this._nodes.nodeIds;
  }

  get edges() {
    return this._edges.edges;
  }

  async handleEvent(event: GraphEvent) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleEdgeAddedEvent(event))
      .add(event => this._handleEdgeDeletedEvent(event))
      .add(event => this._handleEdgeWeightChangedEvent(event))
      .add(event => this._handleGraphCreatedEvent(event))
      .add(event => this._handleNodeAddedEvent(event))
      .add(event => this._handleNodeDeletedEvent(event));
  }

  private async _handleEdgeAddedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'edge-added') {
        return false;
      }
      this._edges.addEdge(event.edge);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle an edge added event',
        event,
        cause: error as Error,
      });
    }
  }

  private async _handleEdgeDeletedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'edge-deleted') {
        return false;
      }
      this._edges.deleteEdge(event.edgeId);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle an edge deleted event',
        event,
        cause: error as Error,
      });
    }
  }

  private async _handleEdgeWeightChangedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'edge-weight-changed') {
        return false;
      }
      const { edgeId, newWeight } = event;
      this._edges.changeWeight({ edgeId, newWeight });
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle an edge weight changed event',
        event,
        cause: error as Error,
      });
    }
  }

  private async _handleGraphCreatedEvent(event: GraphEvent) {
    if (event.name !== 'graph-created') {
      return false;
    }
    this._nodes = event.nodes;
    this._edges = event.edges;
    return true;
  }

  private async _handleNodeAddedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'node-added') {
        return false;
      }
      this._nodes.addNode();
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle a node added event',
        event,
        cause: error as Error,
      });
    }
  }

  private async _handleNodeDeletedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'node-deleted') {
        return false;
      }
      const edgesToDelete = this._edges.getEdgesInvolving(event.nodeId);
      edgesToDelete.forEach(({ id }) => this._edges.deleteEdge(id));
      this._nodes.deleteNode(event.nodeId);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle a node deleted event',
        event,
        cause: error as Error,
      });
    }
  }
}
