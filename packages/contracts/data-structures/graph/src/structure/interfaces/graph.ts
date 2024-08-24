import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphEvent } from '../types';
import { IEdge } from './edge';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraph extends IEventSubscriber<GraphEvent> {
  readonly nodes: number[];
  readonly edges: IEdge[];
}
