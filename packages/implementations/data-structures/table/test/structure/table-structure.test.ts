import {
  TableStructureColumnsSwitchedEvent,
  TableStructureDataChangedEvent,
  TableStructureInitializedEvent,
  TableStructureRowsSwitchedEvent,
} from '@algorithm-visualizer/table-contract';

import { buildTableStructure } from '../../src';
import { TableStructure } from '../../src/structure/table-structure';

type DataPayload = {
  content: string;
};

function getMockData(): DataPayload[][] {
  return [
    [{ content: 'A' }, { content: 'B' }, { content: 'C' }],
    [{ content: 'D' }, { content: 'E' }, { content: 'F' }],
  ];
}

describe('TableStructure', () => {
  let table: TableStructure<DataPayload>;

  beforeEach(async () => {
    jest.resetAllMocks();
    table = buildTableStructure();
    await table.handleEvent(
      new TableStructureInitializedEvent({ data: getMockData() }),
    );
  });

  describe('getData()', () => {
    const cellCoords = { rowId: 1, columnId: 1 };

    it('returns the data of the specified cell', () => {
      expect(table.getData(cellCoords)).toEqual({
        content: 'E',
      });
    });

    it('returns a clone of the data', () => {
      const cellCoords = { rowId: 1, columnId: 1 };
      const cellData = table.getData(cellCoords);
      cellData.content = 'X';
      expect(table.getData(cellCoords)).toEqual({ content: 'E' });
    });
  });

  describe('getDimension()', () => {
    it('returns the current row and column amounts', () => {
      expect(table.getDimension()).toEqual({ rowAmount: 2, columnAmount: 3 });
    });
  });

  describe('getTable()', () => {
    it('returns the current table data', () => {
      expect(table.getTable()).toEqual(getMockData());
    });

    it('returns a clone of the current table data', () => {
      const tableClone = table.getTable();
      tableClone[1][1].content = 'X';
      expect(table.getTable()).toEqual(getMockData());
    });
  });

  describe('handleEvent()', () => {
    describe('when passed a TableStructureColumnsSwitchedEvent', () => {
      it('switches the specified columns', async () => {
        const columnsSwitchedEvent = new TableStructureColumnsSwitchedEvent({
          columnAId: 0,
          columnBId: 2,
        });
        await table.handleEvent(columnsSwitchedEvent);
        expect(table.getTable()).toEqual([
          [{ content: 'C' }, { content: 'B' }, { content: 'A' }],
          [{ content: 'F' }, { content: 'E' }, { content: 'D' }],
        ]);
      });
    });

    describe('when passed a TableStructureDataChangedEvent', () => {
      it('changes the content of the specified cell to the specified new content', async () => {
        const dataChangedEvent = new TableStructureDataChangedEvent({
          columnId: 1,
          rowId: 0,
          data: { content: 'X' },
        });
        await table.handleEvent(dataChangedEvent);
        expect(table.getTable()).toEqual([
          [{ content: 'A' }, { content: 'X' }, { content: 'C' }],
          [{ content: 'D' }, { content: 'E' }, { content: 'F' }],
        ]);
      });
    });

    describe('when passed a TableStructureInitializedEvent', () => {
      it('initialized the table data', async () => {
        const data = [
          [{ content: '1' }, { content: '2' }, { content: '3' }],
          [{ content: '4' }, { content: '5' }, { content: '6' }],
        ];
        const initializedEvent = new TableStructureInitializedEvent({ data });
        await table.handleEvent(initializedEvent);
        expect(table.getTable()).toEqual(data);
      });
    });

    describe('when passed a TableStructureRowsSwitchedEvent', () => {
      it('switches the specified rows', async () => {
        const rowsSwitchedEvent = new TableStructureRowsSwitchedEvent({
          rowAId: 0,
          rowBId: 1,
        });
        await table.handleEvent(rowsSwitchedEvent);
        expect(table.getTable()).toEqual([
          [{ content: 'D' }, { content: 'E' }, { content: 'F' }],
          [{ content: 'A' }, { content: 'B' }, { content: 'C' }],
        ]);
      });
    });
  });
});
