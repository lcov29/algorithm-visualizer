import {
  IEventHandlerChain,
  IEventSubscriber,
} from '@algorithm-visualizer/event-handling';

import { GraphEvent } from '../events/graph-events';
import { IEdge, IEdgeList } from './edge-list';
import { INode, INodeList } from './node-list';

export interface IGraph extends IEventSubscriber<GraphEvent> {
  readonly nodes: INode[];
  readonly edges: IEdge[];
  handleEvent: (event: GraphEvent) => void;
}

interface GraphArgs {
  nodes: INodeList;
  edges: IEdgeList;
  eventHandlerChain: IEventHandlerChain<GraphEvent>;
}

export class Graph implements IGraph {
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
    if (event.name !== 'edge-added') {
      return false;
    }
    this._edges.addEdge(event.edge);
    return true;
  }

  private _handleEdgeDeletedEvent(event: GraphEvent) {
    if (event.name !== 'edge-deleted') {
      return false;
    }
    this._edges.deleteEdge(event.edgeId);
    return true;
  }

  private _handleEdgeWeightChangedEvent(event: GraphEvent) {
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
  }

  private _handleNodeAddedEvent(event: GraphEvent) {
    if (event.name !== 'node-added') {
      return false;
    }
    this._nodes.addNode(event.node);
    return true;
  }

  private _handleNodeDeletedEvent(event: GraphEvent) {
    if (event.name !== 'node-deleted') {
      return false;
    }
    const edgesToDelete = this._edges.getEdgesInvolving(event.nodeId);
    edgesToDelete.forEach(({ id }) => this._edges.deleteEdge(id));
    this._nodes.deleteNode(event.nodeId);
    return true;
  }

  private _handleNodeLabelChangedEvent(event: GraphEvent) {
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
  }
}
