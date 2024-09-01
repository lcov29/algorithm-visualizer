import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { TableCellHighlightStyleClass } from '../../types';

interface ITableRowHighlightAddedEventArgs {
  rowId: number;
  highlightClass: TableCellHighlightStyleClass;
}

export class TableRowHighlightAddedEvent extends BaseEvent<'table-row-highlight-added'> {
  private _rowId: number;
  private _highlightClass: TableCellHighlightStyleClass;

  constructor(args: ITableRowHighlightAddedEventArgs) {
    super('table-row-highlight-added');
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
