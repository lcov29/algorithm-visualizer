import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { TableContentHighlightStyleClass } from '../../types';

interface ITableContentHighlightAddedEventArgs {
  rowId: number;
  columnId: number;
  contentId: number;
  highlightClass: TableContentHighlightStyleClass;
}

export class TableContentHighlightAddedEvent extends BaseEvent<'table-content-highlight-added'> {
  private _rowId: number;
  private _columnId: number;
  private _contentId: number;
  private _highlightClass: TableContentHighlightStyleClass;

  constructor(args: ITableContentHighlightAddedEventArgs) {
    super('table-content-highlight-added');
    this._rowId = args.rowId;
    this._columnId = args.columnId;
    this._contentId = args.contentId;
    this._highlightClass = args.highlightClass;
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

  set contentId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property contentId is forbidden',
    });
  }

  set highlightClass(input: TableContentHighlightStyleClass) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property highlightClass is forbidden',
    });
  }
}
