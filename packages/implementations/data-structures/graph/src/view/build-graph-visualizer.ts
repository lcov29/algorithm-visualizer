import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphViewEvent,
  MermaidCurveStyle,
  MermaidFlowchartDirection,
} from '@algorithm-visualizer/graph-contract';

import { GraphVisualizer } from './graph-visualizer';
import { GraphMermaidComponentSelector } from './mermaid-renderer/graph-mermaid-component-selector';
import { GraphMermaidRenderer } from './mermaid-renderer/graph-mermaid-renderer';

interface IGraphVisualizationBuilderArgs {
  direction: MermaidFlowchartDirection;
  curveStyle: MermaidCurveStyle;
}

export function buildGraphVisualizer(
  args: IGraphVisualizationBuilderArgs = {
    direction: 'LR',
    curveStyle: 'monotoneX',
  },
) {
  const graphRenderer = new GraphMermaidRenderer(args);
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
}
