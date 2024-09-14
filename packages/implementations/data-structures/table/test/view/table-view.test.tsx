/**
 * @jest-environment jsdom
 */
import { ITableCell } from '@algorithm-visualizer/table-contract';

import { TableView } from '../../src';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

function generateTableData(): ITableCell[][] {
  return [
    [
      { content: [{ label: 'Label_A', text: 'Text_A' }] },
      { content: [{ label: 'Label_B', text: 'Text_B' }] },
    ],
    [
      { content: [{ label: 'Label_C', text: 'Text_C' }] },
      { content: [{ label: 'Label_D', text: 'Text_D' }] },
    ],
  ];
}

describe('TableView', () => {
  it('renders the specified table', () => {
    render(<TableView data={generateTableData()} alignment="horizontal" />);
    expect(screen.getAllByText('Label_A:')).toHaveLength(1);
    expect(screen.getAllByText('Text_A')).toHaveLength(1);
    expect(screen.getAllByText('Label_B:')).toHaveLength(1);
    expect(screen.getAllByText('Text_B')).toHaveLength(1);
    expect(screen.getAllByText('Label_B:')).toHaveLength(1);
    expect(screen.getAllByText('Label_C:')).toHaveLength(1);
    expect(screen.getAllByText('Text_C')).toHaveLength(1);
    expect(screen.getAllByText('Label_D:')).toHaveLength(1);
    expect(screen.getAllByText('Text_D')).toHaveLength(1);
  });

  it('renders a horizontal table when alignment is set to "horizontal"', () => {
    const { container } = render(
      <TableView data={generateTableData()} alignment="horizontal" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a vertical table when alignment is set to "vertical"', () => {
    const { container } = render(
      <TableView data={generateTableData()} alignment="vertical" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('sets the correct highlight classes', () => {
    const data = generateTableData();
    data[0][0].rowHighlightClass = 'tableCellHighlightStyle1';
    data[0][1].columnHighlightClass = 'tableCellHighlightStyle2';
    data[1][0].cellHighlightClass = 'tableCellHighlightStyle3';
    data[1][1].content[0].highlightClass = 'tableContentHighlightStyle1';
    const { container } = render(
      <TableView data={data} alignment="horizontal" />,
    );
    expect(container).toMatchSnapshot();
  });
});
