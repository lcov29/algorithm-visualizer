import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphEvent,
  GraphVisualizationBuilder,
  GraphVisualizationError,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaidComponentSelector } from './graph-mermaid-component-selector';
import { GraphMermaidSVGRenderEngine } from './graph-mermaid-svg-render-engine';
import { GraphRenderDirectionMap } from './graph-render-direction-map';
import { GraphVisualizer } from './graph-visualizer';

export const buildGraphVisualizer: GraphVisualizationBuilder = args => {
  const { graphDirection } = args;
  if (!GraphRenderDirectionMap.has(graphDirection)) {
    throw new GraphVisualizationError({
      message: `Failed to map graph render direction text ${graphDirection} to valid mermaid flowchart direction`,
    });
  }

  const mermaidGraphRenderDirection =
    GraphRenderDirectionMap.get(graphDirection)!;
  const graphSVGRenderEngine = new GraphMermaidSVGRenderEngine(
    mermaidGraphRenderDirection,
  );
  const eventHandlerChain = new EventHandlerChain<GraphEvent>({
    abortAfterSuccess: false,
    validator: new FunctionValidator(),
  });

  const graphComponentSelector = new GraphMermaidComponentSelector();

  return new GraphVisualizer({
    eventHandlerChain,
    graphSVGRenderEngine,
    graphComponentSelector,
  });
};
