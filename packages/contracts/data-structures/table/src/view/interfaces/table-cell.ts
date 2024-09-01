import { TableCellHighlightStyleClass } from '../types';
import { ITableViewContent } from './table-view-content';

export interface ITableCell {
  content: ITableViewContent[];
  columnHighlightClass?: TableCellHighlightStyleClass;
  rowHighlightClass?: TableCellHighlightStyleClass;
  cellHighlightClass?: TableCellHighlightStyleClass;
}
