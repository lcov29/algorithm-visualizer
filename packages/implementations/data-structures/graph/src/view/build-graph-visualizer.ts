import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphVisualizationEvent,
  IGraphVisualizationBuilder,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaidSVGRenderEngine } from './graph-mermaid-svg-render-engine';
import { GraphVisualizer } from './graph-visualizer';

export const buildGraphVisualizer: IGraphVisualizationBuilder = () => {
  const graphSVGRenderEngine = new GraphMermaidSVGRenderEngine();
  const eventHandlerChain = new EventHandlerChain<GraphVisualizationEvent>({
    abortAfterSuccess: false,
    validator: new FunctionValidator(),
  });
  return new GraphVisualizer({
    eventHandlerChain,
    graphSVGRenderEngine,
  });
};
