import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { TableCellHighlightStyleClass } from '../../types';

interface ITableViewCellHighlightAddedEventArgs {
  rowId: number;
  columnId: number;
  highlightClass: TableCellHighlightStyleClass;
}

export class TableViewCellHighlightAddedEvent extends BaseEvent<'table-view-cell-highlight-added'> {
  private _rowId: number;
  private _columnId: number;
  private _highlightClass: TableCellHighlightStyleClass;

  constructor(args: ITableViewCellHighlightAddedEventArgs) {
    super('table-view-cell-highlight-added');
    this._rowId = args.rowId;
    this._columnId = args.columnId;
    this._highlightClass = args.highlightClass;
  }

  get rowId() {
    return this._rowId;
  }

  get columnId() {
    return this._columnId;
  }

  get highlightClass() {
    return this._highlightClass;
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

  set highlightClass(input: TableCellHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightClass is forbidden',
    });
  }
}
