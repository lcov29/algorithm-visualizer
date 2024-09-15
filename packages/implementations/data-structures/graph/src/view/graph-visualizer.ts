import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import {
  GraphViewEvent,
  GraphViewInitializedEvent,
  IGraphComponentSelector,
  IGraphRenderer,
  IGraphVisualizer,
} from '@algorithm-visualizer/graph-contract';

import React from 'react';

interface IGraphVisualizerArgs {
  eventHandlerChain: IEventHandlerChain<GraphViewEvent>;
  graphComponentSelector: IGraphComponentSelector;
  graphRenderer: IGraphRenderer;
}

export class GraphVisualizer implements IGraphVisualizer {
  private _eventHandlerChain: IEventHandlerChain<GraphViewEvent>;
  private _graphComponentSelector: IGraphComponentSelector;
  private _graphRenderer: IGraphRenderer;
  private _cachedGraphInitializedEvent: GraphViewInitializedEvent | null;
  private _setGraph: React.Dispatch<React.SetStateAction<JSX.Element | null>>;

  constructor(args: IGraphVisualizerArgs) {
    this._eventHandlerChain = args.eventHandlerChain;
    this._graphComponentSelector = args.graphComponentSelector;
    this._graphRenderer = args.graphRenderer;
    this._cachedGraphInitializedEvent = null;
    this._setGraph = () => {};
    this._initializeEventHandlerChain();
  }

  setGraphViewReferences(
    graphRef: React.RefObject<HTMLDivElement>,
    setGraph: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  ) {
    this._graphComponentSelector.setGraphReference(graphRef);
    this._graphRenderer.setGraphReference(graphRef);
    this._setGraph = setGraph;
  }

  async handleEvent(event: GraphViewEvent) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleEdgeDisplayedEvent(event))
      .add(event => this._handleEdgeHiddenEvent(event))
      .add(event => this._handleEdgeHighlightAddedEvent(event))
      .add(event => this._handleEdgeHighlightRemovedEvent(event))
      .add(event => this._handleEdgeLabelHighlightAddedEvent(event))
      .add(event => this._handleEdgeLabelHighlightRemovedEvent(event))
      .add(event => this._handleEdgeLabelChangedEvent(event))
      .add(event => this._handleEdgeLabelDisplayedEvent(event))
      .add(event => this._handleEdgeLabelHiddenEvent(event))
      .add(event => this._handleGraphInitializedEvent(event))
      .add(event => this._handleNodeHighlightAddedEvent(event))
      .add(event => this._handleNodeHighlightRemovedEvent(event))
      .add(event => this._handleNodeLabelChangedEvent(event))
      .add(event => this._handleNodeDisplayEvent(event))
      .add(event => this._handleNodeHideEvent(event))
      .add(event => this._handleNodeLabelDisplayEvent(event))
      .add(event => this._handleNodeLabelHideEvent(event))
      .add(event => this._handleNodeLabelHighlightAddedEvent(event))
      .add(event => this._handleNodeLabelHighlightRemovedEvent(event))
      .add(event => this._handleNodeTitleChangedEvent(event))
      .add(event => this._handleViewResetEvent(event));
  }

  private async _handleEdgeDisplayedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-displayed') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.remove('hidden');
    return true;
  }

  private async _handleEdgeHiddenEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-hidden') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.add('hidden');
    return true;
  }

  private async _handleEdgeHighlightAddedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-highlight-added') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.add('edgeHighlighted');
    return true;
  }

  private async _handleEdgeHighlightRemovedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-highlight-removed') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.remove('edgeHighlighted');
    return true;
  }

  private async _handleEdgeLabelChangedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-label-changed') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getEdgeLabel(event.edgeId);
    if (edgeLabel?.textContent) {
      edgeLabel.textContent = event.label;
    }
    return true;
  }

  private async _handleEdgeLabelDisplayedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-label-displayed') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getEdgeLabel(event.edgeId);
    edgeLabel?.classList.remove('hidden');
    return true;
  }

  private async _handleEdgeLabelHiddenEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-label-hidden') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getEdgeLabel(event.edgeId);
    edgeLabel?.classList.add('hidden');
    return true;
  }

  private async _handleEdgeLabelHighlightAddedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-label-highlight-added') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getEdgeLabel(event.edgeId);
    edgeLabel?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleEdgeLabelHighlightRemovedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-edge-label-highlight-removed') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getEdgeLabel(event.edgeId);
    edgeLabel?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleGraphInitializedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-initialized') {
      return false;
    }
    this._cachedGraphInitializedEvent = event;
    const graph = await this._graphRenderer.render(event);
    this._setGraph(graph);
    return true;
  }

  private async _handleNodeDisplayEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-displayed') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.remove('hidden');
    return true;
  }

  private async _handleNodeHideEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-hidden') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.add('hidden');
    return true;
  }

  private async _handleNodeHighlightAddedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-highlight-added') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeHighlightRemovedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-highlight-removed') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeLabelChangedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-label-changed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    if (nodeLabel?.textContent) {
      nodeLabel.textContent = event.label;
    }
    return true;
  }

  private async _handleNodeLabelDisplayEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-label-displayed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    nodeLabel?.classList.remove('hidden');
    return true;
  }

  private async _handleNodeLabelHideEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-label-hidden') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    nodeLabel?.classList.add('hidden');
    return true;
  }

  private async _handleNodeLabelHighlightAddedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-label-highlight-added') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    nodeLabel?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeLabelHighlightRemovedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-label-highlight-removed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    nodeLabel?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeTitleChangedEvent(event: GraphViewEvent) {
    if (event.name !== 'graph-view-node-title-changed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getNodeLabel(event.nodeId);
    nodeLabel?.setAttribute('title', event.title);
    return true;
  }

  private async _handleViewResetEvent(event: GraphViewEvent) {
    if (
      event.name !== 'graph-view-reset' ||
      !this._cachedGraphInitializedEvent
    ) {
      return false;
    }
    const graph = await this._graphRenderer.render(
      this._cachedGraphInitializedEvent,
    );
    this._setGraph(graph);
    return true;
  }
}
