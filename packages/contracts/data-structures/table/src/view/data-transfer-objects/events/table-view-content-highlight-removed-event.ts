import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableViewContentHighlightRemovedEventArgs {
  rowId: number;
  columnId: number;
  contentId: number;
}

export class TableViewContentHighlightRemovedEvent extends BaseEvent<'table-view-content-highlight-removed'> {
  private _rowId: number;
  private _columnId: number;
  private _contentId: number;

  constructor(args: ITableViewContentHighlightRemovedEventArgs) {
    super('table-view-content-highlight-removed');
    this._rowId = args.rowId;
    this._columnId = args.columnId;
    this._contentId = args.contentId;
  }

  get rowId() {
    return this._rowId;
  }

  get columnId() {
    return this._columnId;
  }

  get contentId() {
    return this._contentId;
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

  set contentId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property contentId is forbidden',
    });
  }
}
