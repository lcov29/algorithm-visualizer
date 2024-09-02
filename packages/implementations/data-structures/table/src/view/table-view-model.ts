import {
  ITableCell,
  ITableViewContent,
  ITableViewModel,
  TableCellHighlightStyleClass,
  TableContentHighlightStyleClass,
} from '@algorithm-visualizer/table-contract';

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

interface IChangeContentHighlightArgs {
  rowId: number;
  columnId: number;
  contentId: number;
  highlightClass?: TableContentHighlightStyleClass;
}

interface ISwitchRowsArgs {
  rowAId: number;
  rowBId: number;
}

interface ISwitchColumnsArgs {
  columnAId: number;
  columnBId: number;
}

export class TableViewModel implements ITableViewModel {
  private _tableData: ITableCell[][];

  constructor() {
    this._tableData = [];
  }

  changeColumnHighlight(args: IChangeColumnHighlightArgs) {
    const { columnId, highlightClass } = args;
    this._tableData.forEach(
      row => (row[columnId].columnHighlightClass = highlightClass),
    );
  }

  changeCellHighlight(args: IChangeCellHighlightArgs) {
    const { rowId, columnId, highlightClass } = args;
    this._tableData[rowId][columnId].cellHighlightClass = highlightClass;
  }

  changeContent(args: IChangeContentArgs) {
    const { rowId, columnId, newContent } = args;
    this._tableData[rowId][columnId].content = newContent;
    console.log(this._tableData);
  }

  changeContentHighlight(args: IChangeContentHighlightArgs) {
    const { rowId, columnId, contentId, highlightClass } = args;
    this._tableData[rowId][columnId].content[contentId].highlightClass =
      highlightClass;
  }

  changeRowHighlight(args: IChangeRowHighlightArgs) {
    const { rowId, highlightClass } = args;
    this._tableData[rowId].forEach(
      column => (column.rowHighlightClass = highlightClass),
    );
  }

  getContent(args: IGetContentArgs) {
    const { rowId, columnId } = args;
    return this._tableData[rowId][columnId].content;
  }

  getTableData() {
    return structuredClone(this._tableData);
  }

  initializeTableData(data: Omit<ITableViewContent, 'highlightClass'>[][][]) {
    this._tableData = [];

    data.forEach(row =>
      this._tableData.push(
        row.map(column => ({
          content: column.map(column2 => ({
            ...column2,
            highlightStyleClass: undefined,
          })),
          columnHighlightClass: undefined,
          rowHighlightedClass: undefined,
          cellHighlightClass: undefined,
        })),
      ),
    );
  }

  switchColumns(args: ISwitchColumnsArgs) {
    const { columnAId, columnBId } = args;
    this._tableData.forEach(row => {
      const columnA = row[columnAId];
      row[columnAId] = row[columnBId];
      row[columnBId] = columnA;
    });
  }

  switchRows(args: ISwitchRowsArgs) {
    const { rowAId, rowBId } = args;
    const rowA = this._tableData[rowAId];
    this._tableData[rowAId] = this._tableData[rowBId];
    this._tableData[rowBId] = rowA;
  }
}
