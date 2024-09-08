import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { TableCellHighlightStyleClass } from '../../types';

interface ITableViewRowHighlightAddedEventArgs {
  rowId: number;
  highlightClass: TableCellHighlightStyleClass;
}

export class TableViewRowHighlightAddedEvent extends BaseEvent<'table-view-row-highlight-added'> {
  private _rowId: number;
  private _highlightClass: TableCellHighlightStyleClass;

  constructor(args: ITableViewRowHighlightAddedEventArgs) {
    super('table-view-row-highlight-added');
    this._rowId = args.rowId;
    this._highlightClass = args.highlightClass;
  }

  get rowId() {
    return this._rowId;
  }

  get highlightClass() {
    return this._highlightClass;
  }

  set rowId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowId is forbidden',
    });
  }

  set highlightClass(input: TableCellHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightClass is forbidden',
    });
  }
}
