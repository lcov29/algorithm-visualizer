import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphStructureEvent } from '../types';
import { IReducedEdgeList } from './edge-list';
import { IReducedNodeList } from './node-list';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraph extends IEventSubscriber<GraphStructureEvent> {
  readonly nodeList: IReducedNodeList;
  readonly edgeList: IReducedEdgeList;
}
