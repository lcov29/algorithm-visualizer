import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphViewEvent,
  GraphVisualizationBuilder,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaidComponentSelector } from './graph-mermaid-component-selector';
import { GraphMermaidDefinitionParser } from './graph-mermaid-definition-parser';
import { GraphMermaidSVGRenderEngine } from './graph-mermaid-svg-render-engine';
import { GraphVisualizer } from './graph-visualizer';

export const buildGraphVisualizer: GraphVisualizationBuilder = () => {
  const graphDefinitionParser = new GraphMermaidDefinitionParser();
  const graphSVGRenderEngine = new GraphMermaidSVGRenderEngine();
  const eventHandlerChain = new EventHandlerChain<GraphViewEvent>({
    abortAfterSuccess: false,
    validator: new FunctionValidator(),
  });

  const graphComponentSelector = new GraphMermaidComponentSelector();

  return new GraphVisualizer({
    eventHandlerChain,
    graphComponentSelector,
    graphDefinitionParser,
    graphSVGRenderEngine,
  });
};
