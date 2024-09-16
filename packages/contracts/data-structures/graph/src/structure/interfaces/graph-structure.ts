import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphStructureEvent } from '../types';
import { IReducedGraphStructureEdgeList } from './graph-structure-edge-list';
import { IReducedGraphStructureNodeList } from './graph-structure-node-list';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraph extends IEventSubscriber<GraphStructureEvent> {
  readonly nodeList: IReducedGraphStructureNodeList;
  readonly edgeList: IReducedGraphStructureEdgeList;
}
