import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { GraphStructureBuilder } from '@algorithm-visualizer/graph-contract';

import { GraphStructure } from './graph-structure';
import { GraphStructureEdgeList } from './graph-structure-edge-list';
import { GraphStructureNodeList } from './graph-structure-node-list';

/**
 * Builds an empty graph instance.
 */
export const buildGraphStructure: GraphStructureBuilder = () => {
  return new GraphStructure({
    nodes: new GraphStructureNodeList(),
    edges: new GraphStructureEdgeList(),
    eventHandlerChain: new EventHandlerChain({
      abortAfterSuccess: true,
      validator: new FunctionValidator(),
    }),
  });
};
