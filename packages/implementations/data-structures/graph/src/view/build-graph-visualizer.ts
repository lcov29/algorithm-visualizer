import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { GraphViewEvent } from '@algorithm-visualizer/graph-contract';

import { GraphVisualizer } from './graph-visualizer';
import { GraphMermaidComponentSelector } from './mermaid-renderer/graph-mermaid-component-selector';
import { GraphMermaidDefinitionParser } from './mermaid-renderer/graph-mermaid-definition-parser';
import { GraphMermaidRenderer } from './mermaid-renderer/graph-mermaid-renderer';
import {
  MermaidCurveStyle,
  MermaidFlowchartDirection,
} from './mermaid-renderer/mermaid-types';

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
  const graphMermaidDefinitionParser = new GraphMermaidDefinitionParser(args);
  const graphRenderer = new GraphMermaidRenderer({
    graphMermaidDefinitionParser,
  });
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
