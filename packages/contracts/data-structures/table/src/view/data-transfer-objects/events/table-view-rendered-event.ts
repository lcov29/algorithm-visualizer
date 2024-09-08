import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class TableViewRenderedEvent extends BaseEvent<'table-view-rendered'> {
  constructor() {
    super('table-view-rendered');
  }
}
