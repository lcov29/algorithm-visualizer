import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { IReducedGraphStructureEdgeList } from './graph-structure-edge-list';
import { IReducedGraphStructureNodeList } from './graph-structure-node-list';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraphStructure extends IEventSubscriber {
  readonly nodeList: IReducedGraphStructureNodeList;
  readonly edgeList: IReducedGraphStructureEdgeList;
}
