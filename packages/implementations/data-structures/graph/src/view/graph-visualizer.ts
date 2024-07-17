import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import {
  GraphVisualizationEvent,
  IGraphSVGRenderEngine,
  IGraphVisualizer,
} from '@algorithm-visualizer/graph-contract';

import React from 'react';

interface GraphVisualizerArgs {
  eventHandlerChain: IEventHandlerChain<GraphVisualizationEvent>;
  graphSVGRenderEngine: IGraphSVGRenderEngine<string>;
}

export class GraphVisualizer implements IGraphVisualizer {
  private _eventHandlerChain: IEventHandlerChain<GraphVisualizationEvent>;
  private _graphSVGRenderEngine: IGraphSVGRenderEngine<string>;
  private _graphRef: React.RefObject<HTMLDivElement>;
  private _setGraphSVGString: React.Dispatch<React.SetStateAction<string>>;

  constructor(args: GraphVisualizerArgs) {
    this._eventHandlerChain = args.eventHandlerChain;
    this._graphSVGRenderEngine = args.graphSVGRenderEngine;
    this._graphRef = { current: null };
    this._setGraphSVGString = () => {};
    this._initializeEventHandlerChain();
  }

  setGraphViewReferences(
    graphRef: React.RefObject<HTMLDivElement>,
    setGraphSVGString: React.Dispatch<React.SetStateAction<string>>,
  ) {
    this._graphRef = graphRef;
    this._setGraphSVGString = setGraphSVGString;
  }

  async handleEvent(event: GraphVisualizationEvent) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain.add(event => this._handleGraphCreatedEvent(event));
  }

  private async _handleGraphCreatedEvent(event: GraphVisualizationEvent) {
    if (event.name !== 'graph-created') {
      return false;
    }
    const svg = await this._graphSVGRenderEngine.render(event);
    this._setGraphSVGString(svg);
    return true;
  }
}
