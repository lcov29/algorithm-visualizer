import { TableCellHighlightStyleClass } from '../types';
import { ITableCell } from './table-cell';
import { ITableViewContent } from './table-view-content';

interface IGetContentArgs {
  rowId: number;
  columnId: number;
}

interface IChangeContentArgs {
  rowId: number;
  columnId: number;
  newContent: ITableViewContent[];
}

interface IChangeColumnHighlightArgs {
  columnId: number;
  highlightClass?: TableCellHighlightStyleClass;
}

interface IChangeRowHighlightArgs {
  rowId: number;
  highlightClass?: TableCellHighlightStyleClass;
}

interface IChangeCellHighlightArgs {
  rowId: number;
  columnId: number;
  highlightClass?: TableCellHighlightStyleClass;
}

interface ISwitchRowsArgs {
  rowAId: number;
  rowBId: number;
}

interface ISwitchColumnsArgs {
  columnAId: number;
  columnBId: number;
}

export interface ITableViewModel {
  initializeTableData: (
    data: Omit<ITableViewContent, 'highlightClass'>[][][],
  ) => void;
  getTableData: () => ITableCell[][];
  getContent: (args: IGetContentArgs) => ITableViewContent[];
  changeContent: (args: IChangeContentArgs) => void;
  changeColumnHighlight: (args: IChangeColumnHighlightArgs) => void;
  changeRowHighlight: (args: IChangeRowHighlightArgs) => void;
  changeCellHighlight: (args: IChangeCellHighlightArgs) => void;
  switchRows: (args: ISwitchRowsArgs) => void;
  switchColumns: (args: ISwitchColumnsArgs) => void;
}
