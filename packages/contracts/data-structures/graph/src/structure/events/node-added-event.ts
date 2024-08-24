import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

/**
 * @throws InvalidOperationError
 */
export class NodeAddedEvent extends BaseEvent<'node-added'> {
  constructor() {
    super('node-added');
  }
}
