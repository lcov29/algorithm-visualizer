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
      .add(event => this._handleNodeHighlightRemovedEvent(event));
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
    node?.classList.add('nodeHighlighted');
    return true;
  }

  private async _handleNodeHighlightRemovedEvent(
    event: GraphVisualizationEvent,
  ) {
    if (event.name !== 'node-highlight-removed') {
      return false;
    }
    const node = this._graphComponentSelector.getNode(event.nodeId);
    node?.classList.remove('nodeHighlighted');
    return true;
  }
}
