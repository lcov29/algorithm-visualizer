import {
  BaseEvent,
  EventHandlingError,
  IEventHandlerChain,
  IEventSubscriber,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphStructureEvent,
  IGraphStructure,
  IGraphStructureEdgeList,
  IGraphStructureNodeList,
  IReducedGraphStructureEdgeList,
  IReducedGraphStructureNodeList,
} from '@algorithm-visualizer/graph-contract';

import { GraphStructureEdgeList } from './graph-structure-edge-list';
import { GraphStructureNodeList } from './graph-structure-node-list';

interface IGraphStructureArgs {
  nodes: IGraphStructureNodeList;
  edges: IGraphStructureEdgeList;
  eventHandlerChain: IEventHandlerChain<GraphStructureEvent>;
}

/**
 * Data structure representing a graph.
 * Can be modified by different GraphEvents.
 *
 * @throws EventHandlingError
 */
export class GraphStructure
  implements IGraphStructure, IEventSubscriber<GraphStructureEvent>
{
  private _nodes: IGraphStructureNodeList;
  private _edges: IGraphStructureEdgeList;
  private _eventHandlerChain: IEventHandlerChain<GraphStructureEvent>;

  constructor({ nodes, edges, eventHandlerChain }: IGraphStructureArgs) {
    this._nodes = nodes;
    this._edges = edges;
    this._eventHandlerChain = eventHandlerChain;
    this._initializeEventHandlerChain();
  }

  get nodeList(): IReducedGraphStructureNodeList {
    return this._nodes.clone();
  }

  get edgeList(): IReducedGraphStructureEdgeList {
    return this._edges.clone();
  }

  async handleEvent(event: BaseEvent<string>) {
    if (this._isGraphStructureEvent(event)) {
      await this._eventHandlerChain.handle(event);
    }
  }

  private _isGraphStructureEvent(
    event: BaseEvent<string>,
  ): event is GraphStructureEvent {
    return event.name.startsWith('graph-structure');
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleEdgeAddedEvent(event))
      .add(event => this._handleEdgeDeletedEvent(event))
      .add(event => this._handleEdgeWeightChangedEvent(event))
      .add(event => this._handleGraphStructureInitializedEvent(event))
      .add(event => this._handleNodeAddedEvent(event))
      .add(event => this._handleNodeDeletedEvent(event));
  }

  private async _handleEdgeAddedEvent(event: GraphStructureEvent) {
    try {
      if (event.name !== 'graph-structure-edge-added') {
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

  private async _handleEdgeDeletedEvent(event: GraphStructureEvent) {
    try {
      if (event.name !== 'graph-structure-edge-deleted') {
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

  private async _handleEdgeWeightChangedEvent(event: GraphStructureEvent) {
    try {
      if (event.name !== 'graph-structure-edge-weight-changed') {
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

  private async _handleGraphStructureInitializedEvent(
    event: GraphStructureEvent,
  ) {
    if (event.name !== 'graph-structure-initialized') {
      return false;
    }
    const { nodes, edges } = event;
    this._nodes = new GraphStructureNodeList();
    this._edges = new GraphStructureEdgeList();

    nodes.forEach(() => this._nodes.addNode());
    edges.forEach(edge => this._edges.addEdge(edge));
    return true;
  }

  private async _handleNodeAddedEvent(event: GraphStructureEvent) {
    try {
      if (event.name !== 'graph-structure-node-added') {
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

  private async _handleNodeDeletedEvent(event: GraphStructureEvent) {
    try {
      if (event.name !== 'graph-structure-node-deleted') {
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
