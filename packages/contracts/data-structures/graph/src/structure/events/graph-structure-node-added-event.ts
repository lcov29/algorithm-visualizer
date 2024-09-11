import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

/**
 * @throws InvalidOperationError
 */
export class GraphStructureNodeAddedEvent extends BaseEvent<'graph-structure-node-added'> {
  constructor() {
    super('graph-structure-node-added');
  }
}
