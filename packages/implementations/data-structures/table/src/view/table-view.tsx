import {
  ITableCell,
  ITableVisualizer,
} from '@algorithm-visualizer/table-contract';

import './table-view.css';

import React, { JSX, useState } from 'react';

interface ITableViewProps {
  alignment: 'horizontal' | 'vertical';
  tableVisualizer: ITableVisualizer;
}

function getInvertedTable(rows: ITableCell[][]): ITableCell[][] {
  const invertedTable: ITableCell[][] = [];

  const rowCount = rows.length;
  const columnCount = rows[0].length;

  for (let columnId = 0; columnId < columnCount; columnId++) {
    invertedTable.push([]);
    for (let rowId = 0; rowId < rowCount; rowId++) {
      invertedTable[columnId].push(rows[rowId][columnId]);
    }
  }

  return invertedTable;
}

export function TableView(props: ITableViewProps): JSX.Element | null {
  const { alignment, tableVisualizer } = props;

  const [tableData, setTableData] = useState<ITableCell[][] | null>(null);

  tableVisualizer.setTableDataSetter(setTableData);

  if (!tableData) {
    return null;
  }

  const tableRows =
    alignment === 'horizontal' ? tableData : getInvertedTable(tableData);

  return (
    <table className="tableView">
      <tbody>
        {tableRows.map((row, index) => (
          <tr key={index}>
            {row.map((column, index) => (
              <td
                key={index}
                className={
                  column.rowHighlightClass ??
                  column.columnHighlightClass ??
                  column.cellHighlightClass
                }>
                {column.content.map(
                  ({ text, label, highlightClass }, index) => (
                    <p key={index}>
                      {label ? `${label}: ` : null}
                      <span className={highlightClass}>{text}</span>
                    </p>
                  ),
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
