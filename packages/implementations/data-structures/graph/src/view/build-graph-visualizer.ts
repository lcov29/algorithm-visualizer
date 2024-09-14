import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphViewEvent,
  GraphVisualizationBuilder,
} from '@algorithm-visualizer/graph-contract';

import { GraphVisualizer } from './graph-visualizer';
import { GraphMermaidComponentSelector } from './mermaid-renderer/graph-mermaid-component-selector';
import { GraphMermaidRenderer } from './mermaid-renderer/graph-mermaid-renderer';

export const buildGraphVisualizer: GraphVisualizationBuilder = () => {
  const graphRenderer = new GraphMermaidRenderer();
  const graphComponentSelector = new GraphMermaidComponentSelector();
  const eventHandlerChain = new EventHandlerChain<GraphViewEvent>({
    abortAfterSuccess: false,
    validator: new FunctionValidator(),
  });

  return new GraphVisualizer({
    graphRenderer,
    graphComponentSelector,
    eventHandlerChain,
  });
};
