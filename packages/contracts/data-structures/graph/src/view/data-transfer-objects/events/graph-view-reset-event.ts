import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class GraphViewResetEvent extends BaseEvent<'graph-view-reset'> {
  constructor() {
    super('graph-view-reset');
  }
}
