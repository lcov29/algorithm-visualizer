import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableRowHighlightRemovedEventArgs {
  rowId: number;
}

export class TableRowHighlightRemovedEvent extends BaseEvent<'table-row-highlight-removed'> {
  private _rowId: number;

  constructor(args: ITableRowHighlightRemovedEventArgs) {
    super('table-row-highlight-removed');
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
