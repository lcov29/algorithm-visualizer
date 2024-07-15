import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { IGraphBuilder } from '@algorithm-visualizer/graph-contract';

import { EdgeList } from './edge-list';
import { Graph } from './graph';
import { NodeList } from './node-list';

/**
 * Builds an empty graph instance.
 */
export const buildGraph: IGraphBuilder = () => {
  return new Graph({
    nodes: new NodeList(),
    edges: new EdgeList(),
    eventHandlerChain: new EventHandlerChain({
      abortAfterSuccess: true,
      validator: new FunctionValidator(),
    }),
  });
};
