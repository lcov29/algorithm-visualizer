import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableViewCellHighlightRemovedEventArgs {
  rowId: number;
  columnId: number;
}

export class TableViewCellHighlightRemovedEvent extends BaseEvent<'table-view-cell-highlight-removed'> {
  private _rowId: number;
  private _columnId: number;

  constructor(args: ITableViewCellHighlightRemovedEventArgs) {
    super('table-view-cell-highlight-removed');
    this._rowId = args.rowId;
    this._columnId = args.columnId;
  }

  get rowId() {
    return this._rowId;
  }

  get columnId() {
    return this._columnId;
  }

  set rowId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowId is forbidden',
    });
  }

  set columnId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnId is forbidden',
    });
  }
}
