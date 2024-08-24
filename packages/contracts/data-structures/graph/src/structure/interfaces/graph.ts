import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphStructureEvent } from '../types';
import { IEdge } from './edge';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraph extends IEventSubscriber<GraphStructureEvent> {
  readonly nodes: number[];
  readonly edges: IEdge[];
}
