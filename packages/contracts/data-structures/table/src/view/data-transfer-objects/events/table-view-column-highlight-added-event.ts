import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { TableCellHighlightStyleClass } from '../../types';

interface ITableViewColumnHighlightAddedEventArgs {
  columnId: number;
  highlightClass: TableCellHighlightStyleClass;
}

export class TableViewColumnHighlightAddedEvent extends BaseEvent<'table-view-column-highlight-added'> {
  private _columnId: number;
  private _highlightClass: TableCellHighlightStyleClass;

  constructor(args: ITableViewColumnHighlightAddedEventArgs) {
    super('table-view-column-highlight-added');
    this._columnId = args.columnId;
    this._highlightClass = args.highlightClass;
  }

  get columnId() {
    return this._columnId;
  }

  get highlightClass() {
    return this._highlightClass;
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
