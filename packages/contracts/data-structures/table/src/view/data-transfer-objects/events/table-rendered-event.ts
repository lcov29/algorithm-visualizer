import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class TableRenderedEvent extends BaseEvent<'table-rendered'> {
  constructor() {
    super('table-rendered');
  }
}
