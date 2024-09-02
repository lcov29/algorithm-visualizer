import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import {
  ITableStructure,
  TableStructureEvent,
} from '@algorithm-visualizer/table-contract';

interface ITableStructureArgs<Data> {
  eventHandlerChain: IEventHandlerChain<TableStructureEvent<Data>>;
}

interface IGetDataArgs {
  rowId: number;
  columnId: number;
}

export class TableStructure<Data> implements ITableStructure<Data> {
  private _data: Data[][];
  private _eventHandlerChain: IEventHandlerChain<TableStructureEvent<Data>>;

  constructor(args: ITableStructureArgs<Data>) {
    this._data = [];
    this._eventHandlerChain = args.eventHandlerChain;
    this._initializeEventHandlerChain();
  }

  getData(args: IGetDataArgs) {
    const { rowId, columnId } = args;
    return structuredClone(this._data[rowId][columnId]);
  }

  getDimension() {
    return {
      rowAmount: this._data.length,
      columnAmount: this._data[0].length,
    };
  }

  getTable() {
    return structuredClone(this._data);
  }

  async handleEvent(event: TableStructureEvent<Data>) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleTableColumnsSwitchedEvent(event))
      .add(event => this._handleTableDataChangedEvent(event))
      .add(event => this._handleInitializedEvent(event))
      .add(event => this._handleRowsSwitchedEvent(event));
  }

  private async _handleTableColumnsSwitchedEvent(
    event: TableStructureEvent<Data>,
  ) {
    if (event.name !== 'table-structure-columns-switched') {
      return false;
    }
    const { columnAId, columnBId } = event;
    this._data.forEach(row => {
      const columnA = row[columnAId];
      row[columnAId] = row[columnBId];
      row[columnBId] = columnA;
    });
    return true;
  }

  private async _handleTableDataChangedEvent(event: TableStructureEvent<Data>) {
    if (event.name !== 'table-structure-data-changed-event') {
      return false;
    }
    const { rowId, columnId, data } = event;
    this._data[rowId][columnId] = data;
    return true;
  }

  private async _handleInitializedEvent(event: TableStructureEvent<Data>) {
    if (event.name !== 'table-structure-initialized') {
      return false;
    }
    this._data = event.data;
    return true;
  }

  private async _handleRowsSwitchedEvent(event: TableStructureEvent<Data>) {
    if (event.name !== 'table-structure-rows-switched') {
      return false;
    }
    const { rowAId, rowBId } = event;
    const rowA = this._data[rowAId];
    this._data[rowAId] = this._data[rowBId];
    this._data[rowBId] = rowA;
    return true;
  }
}
