import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import {
  GraphVisualizationEvent,
  IGraphComponentSelector,
  IGraphSVGRenderEngine,
  IGraphVisualizer,
} from '@algorithm-visualizer/graph-contract';

import React from 'react';

interface GraphVisualizerArgs {
  eventHandlerChain: IEventHandlerChain<GraphVisualizationEvent>;
  graphSVGRenderEngine: IGraphSVGRenderEngine<string>;
  graphComponentSelector: IGraphComponentSelector;
}

export class GraphVisualizer implements IGraphVisualizer {
  private _eventHandlerChain: IEventHandlerChain<GraphVisualizationEvent>;
  private _graphSVGRenderEngine: IGraphSVGRenderEngine<string>;
  private _graphComponentSelector: IGraphComponentSelector;
  private _setGraphSVGString: React.Dispatch<React.SetStateAction<string>>;

  constructor(args: GraphVisualizerArgs) {
    this._eventHandlerChain = args.eventHandlerChain;
    this._graphSVGRenderEngine = args.graphSVGRenderEngine;
    this._graphComponentSelector = args.graphComponentSelector;
    this._setGraphSVGString = () => {};
    this._initializeEventHandlerChain();
  }

  setGraphViewReferences(
    graphRef: React.RefObject<HTMLDivElement>,
    setGraphSVGString: React.Dispatch<React.SetStateAction<string>>,
  ) {
    this._graphComponentSelector.setGraphReference(graphRef);
    this._setGraphSVGString = setGraphSVGString;
  }

  async handleEvent(event: GraphVisualizationEvent) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleGraphCreatedEvent(event))
      .add(event => this._handleNodeHighlightAddedEvent(event))
      .add(event => this._handleNodeHighlightRemovedEvent(event))
      .add(event => this._handleNodeLabelChangedEvent(event))
      .add(event => this._handleEdgeHighlightAddedEvent(event))
      .add(event => this._handleEdgeHighlightRemovedEvent(event))
      .add(event => this._handleEdgeWeightChangedEvent(event))
      .add(event => this._handleEdgeLabelHighlightAddedEvent(event))
      .add(event => this._handleEdgeLabelHighlightRemovedEvent(event))
      .add(event => this._handleNodeLabelHighlightAddedEvent(event))
      .add(event => this._handleNodeLabelHighlightRemovedEvent(event))
      .add(event => this._handleNodeTitleChangedEvent(event));
  }

  private async _handleGraphCreatedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'graph-created') {
      return false;
    }
    const svg = await this._graphSVGRenderEngine.render(event);
    this._setGraphSVGString(svg);
    return true;
  }

  private async _handleNodeHighlightAddedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'node-highlight-added') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeHighlightRemovedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'node-highlight-removed') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeLabelChangedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'node-label-changed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getLabelOfNode(event.nodeId);
    if (nodeLabel?.textContent) {
      nodeLabel.textContent = event.label;
    }
    return true;
  }

  private async _handleEdgeHighlightAddedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'edge-highlight-added') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.add('edgeHighlighted');
    return true;
  }

  private async _handleEdgeHighlightRemovedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'edge-highlight-removed') {
      return false;
    }
    const edge = this._graphComponentSelector.getEdge(event.edgeId);
    edge?.classList.remove('edgeHighlighted');
    return true;
  }

  private async _handleEdgeWeightChangedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'edge-weight-changed') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getLabelOfEdge(event.edgeId);
    if (edgeLabel?.textContent) {
      edgeLabel.textContent = event.newWeight.toString();
    }
    return true;
  }

  private async _handleEdgeLabelHighlightAddedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'edge-label-highlight-added') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getLabelOfEdge(event.edgeId);
    edgeLabel?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleEdgeLabelHighlightRemovedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'edge-label-highlight-removed') {
      return false;
    }
    const edgeLabel = this._graphComponentSelector.getLabelOfEdge(event.edgeId);
    edgeLabel?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeLabelHighlightAddedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'node-label-highlight-added') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getLabelOfNode(event.nodeId);
    nodeLabel?.classList.add(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeLabelHighlightRemovedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'node-label-highlight-removed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getLabelOfNode(event.nodeId);
    nodeLabel?.classList.remove(event.highlightStyleClass);
    return true;
  }

  private async _handleNodeTitleChangedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'node-title-changed') {
      return false;
    }
    const nodeLabel = this._graphComponentSelector.getLabelOfNode(event.nodeId);
    nodeLabel?.setAttribute('title', event.title);
    return true;
  }
}
