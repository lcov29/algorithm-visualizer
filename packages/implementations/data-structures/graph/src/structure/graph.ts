import {
  EventHandlingError,
  IEventHandlerChain,
  IEventSubscriber,
} from '@algorithm-visualizer/event-handling-contract';
import { GraphEvent, IGraph } from '@algorithm-visualizer/graph-contract';

import { IEdgeList } from './edge-list';
import { INodeList } from './node-list';

interface GraphArgs {
  nodes: INodeList;
  edges: IEdgeList;
  eventHandlerChain: IEventHandlerChain<GraphEvent>;
}

export class Graph implements IGraph, IEventSubscriber<GraphEvent> {
  private _nodes: INodeList;
  private _edges: IEdgeList;
  private _eventHandlerChain: IEventHandlerChain<GraphEvent>;

  constructor({ nodes, edges, eventHandlerChain }: GraphArgs) {
    this._nodes = nodes;
    this._edges = edges;
    this._eventHandlerChain = eventHandlerChain;
    this._initializeEventHandlerChain();
  }

  get nodes() {
    return this._nodes.list;
  }

  get edges() {
    return this._edges.list;
  }

  handleEvent(event: GraphEvent) {
    this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleEdgeAddedEvent(event))
      .add(event => this._handleEdgeDeletedEvent(event))
      .add(event => this._handleEdgeWeightChangedEvent(event))
      .add(event => this._handleNodeAddedEvent(event))
      .add(event => this._handleNodeDeletedEvent(event))
      .add(event => this._handleNodeLabelChangedEvent(event));
  }

  private _handleEdgeAddedEvent(event: GraphEvent) {
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

  private _handleEdgeDeletedEvent(event: GraphEvent) {
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

  private _handleEdgeWeightChangedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'edge-weight-changed') {
        return false;
      }
      const newEdge = this._edges.edge(event.edgeId);
      if (!newEdge) {
        return false;
      }
      newEdge.weight = event.newWeight;
      this._edges.replaceEdge(newEdge);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle an edge weight changed event',
        event,
        cause: error as Error,
      });
    }
  }

  private _handleNodeAddedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'node-added') {
        return false;
      }
      this._nodes.addNode(event.node);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle a node added event',
        event,
        cause: error as Error,
      });
    }
  }

  private _handleNodeDeletedEvent(event: GraphEvent) {
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

  private _handleNodeLabelChangedEvent(event: GraphEvent) {
    try {
      if (event.name !== 'node-label-changed') {
        return false;
      }
      const node = this._nodes.node(event.nodeId);
      if (!node) {
        return false;
      }
      node.label = event.label;
      this._nodes.changeLabel(node);
      return true;
    } catch (error) {
      throw new EventHandlingError({
        message: 'Error while trying to handle a node label changed event',
        event,
        cause: error as Error,
      });
    }
  }
}
