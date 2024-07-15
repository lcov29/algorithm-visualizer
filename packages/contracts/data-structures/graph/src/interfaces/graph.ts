import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphEvent } from '../events';
import { IEdge } from './edge';
import { INode } from './node';

/**
 * Data structure representing a graph.
 * Can be modified by different {@link GraphEvent}.
 *
 * @throws EventHandlingError
 */
export interface IGraph extends IEventSubscriber<GraphEvent> {
  readonly nodes: INode[];
  readonly edges: IEdge[];
}
