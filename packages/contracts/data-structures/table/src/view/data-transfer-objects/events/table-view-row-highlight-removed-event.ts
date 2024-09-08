import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableViewRowHighlightRemovedEventArgs {
  rowId: number;
}

export class TableViewRowHighlightRemovedEvent extends BaseEvent<'table-view-row-highlight-removed'> {
  private _rowId: number;

  constructor(args: ITableViewRowHighlightRemovedEventArgs) {
    super('table-view-row-highlight-removed');
    this._rowId = args.rowId;
  }

  get rowId() {
    return this._rowId;
  }

  set rowId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowId is forbidden',
    });
  }
}
