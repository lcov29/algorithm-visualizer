import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableViewColumnHighlightRemovedEventArgs {
  columnId: number;
}

export class TableViewColumnHighlightRemovedEvent extends BaseEvent<'table-view-column-highlight-removed'> {
  private _columnId: number;

  constructor(args: ITableViewColumnHighlightRemovedEventArgs) {
    super('table-view-column-highlight-removed');
    this._columnId = args.columnId;
  }

  get columnId() {
    return this._columnId;
  }

  set columnId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnId is forbidden',
    });
  }
}
