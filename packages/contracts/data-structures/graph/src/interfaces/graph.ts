import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphEvent } from '../events';
import { IEdge } from './edge';
import { INode } from './node';

export interface IGraph extends IEventSubscriber<GraphEvent> {
  readonly nodes: INode[];
  readonly edges: IEdge[];
  handleEvent: (event: GraphEvent) => void;
}
