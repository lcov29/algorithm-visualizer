import { ITableViewContent } from '@algorithm-visualizer/table-contract';

import { TableViewModel } from '../../src/view/table-view-model';

describe('TableViewModel', () => {
  let model: TableViewModel;
  const data: Omit<ITableViewContent, 'highlightClass'>[][][] = [
    [
      [{ label: 'foo1.1', text: 'bar1.1' }],
      [{ label: 'foo1.2', text: 'bar1.2' }],
    ],
    [
      [{ label: 'foo2.1', text: 'bar2.1' }],
      [{ label: 'foo2.2', text: 'bar2.2' }],
    ],
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    model = new TableViewModel();
    model.initializeTableData(data);
  });

  describe('initializeTableData()', () => {
    it('initializes the internal table data', () => {
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('changeColumnHighlight()', () => {
    it('changes the highlightClass of the specified column to the specified highlightClass', () => {
      const highlightClass = 'tableCellHighlightStyle1';
      model.changeColumnHighlight({
        columnId: 1,
        highlightClass,
      });

      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: highlightClass,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: highlightClass,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('changeCellHighlight()', () => {
    it('changes the highlightClass of the specified cell to the specified highlightClass', () => {
      const highlightClass = 'tableCellHighlightStyle1';
      model.changeCellHighlight({ rowId: 0, columnId: 1, highlightClass });
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: highlightClass,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('changeContent()', () => {
    it('changes the content of the specified cell to the specified new content', () => {
      model.changeContent({
        rowId: 1,
        columnId: 1,
        newContent: [{ label: 'newFoo', text: 'newBar' }],
      });
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'newFoo',
                text: 'newBar',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('changeContentHighlight()', () => {
    it('changes the highlightClass of the specified content to the specified highlightClass', () => {
      const highlightClass = 'tableContentHighlightStyle1';
      model.changeContentHighlight({
        rowId: 0,
        columnId: 1,
        contentId: 0,
        highlightClass,
      });

      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: 'tableContentHighlightStyle1',
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('changeRowHighlight()', () => {
    it('changes the highlightClass of the specified row to the specified highlightClass', () => {
      const highlightClass = 'tableCellHighlightStyle1';
      model.changeRowHighlight({ rowId: 1, highlightClass });
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: highlightClass,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: highlightClass,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('switchColumns()', () => {
    it('switches the specified columns', () => {
      model.switchColumns({ columnAId: 0, columnBId: 1 });
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('switchRows()', () => {
    it('switches the specified rows', () => {
      model.switchRows({ rowAId: 0, rowBId: 1 });
      // @ts-expect-error access private property
      expect(model._tableData).toEqual([
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });
  });

  describe('getContent()', () => {
    it('returns the content of the specified cell', () => {
      expect(model.getContent({ rowId: 0, columnId: 0 })).toEqual([
        { label: 'foo1.1', text: 'bar1.1', highlightClass: undefined },
      ]);
    });
  });

  describe('getTableData()', () => {
    it('returns the current table data', () => {
      expect(model.getTableData()).toEqual([
        [
          {
            content: [
              {
                label: 'foo1.1',
                text: 'bar1.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo1.2',
                text: 'bar1.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
        [
          {
            content: [
              {
                label: 'foo2.1',
                text: 'bar2.1',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
          {
            content: [
              {
                label: 'foo2.2',
                text: 'bar2.2',
                highlightClass: undefined,
              },
            ],
            columnHighlightClass: undefined,
            rowHighlightClass: undefined,
            cellHighlightClass: undefined,
          },
        ],
      ]);
    });

    it('returns a clone of the current table data', () => {
      const tableClone = model.getTableData();
      tableClone[0][0].content[0].text = 'modifiedText';
      expect(model.getTableData()[0][0].content[0].text).toBe('bar1.1');
    });
  });
});
