import { IGraph } from '@algorithm-visualizer/graph-contract';

import { EventHandlerChain } from '../../../../event-handling';
import { EdgeList } from './edge-list';
import { Graph } from './graph';
import { NodeList } from './node-list';

/**
 * Builds an empty graph instance.
 */
export function buildGraph(): IGraph {
  return new Graph({
    nodes: new NodeList(),
    edges: new EdgeList(),
    eventHandlerChain: new EventHandlerChain({ abortAfterSuccess: true }),
  });
}
