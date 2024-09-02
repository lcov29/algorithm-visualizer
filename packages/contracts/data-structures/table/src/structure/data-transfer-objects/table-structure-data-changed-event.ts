import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableStructureDataChangedEventArgs<Data> {
  rowId: number;
  columnId: number;
  data: Data;
}

export class TableStructureDataChangedEvent<
  Data,
> extends BaseEvent<'table-structure-data-changed-event'> {
  private _columnId: number;
  private _data: Data;
  private _rowId: number;

  constructor(args: ITableStructureDataChangedEventArgs<Data>) {
    super('table-structure-data-changed-event');
    this._columnId = args.columnId;
    this._data = args.data;
    this._rowId = args.rowId;
  }

  get columnId() {
    return this._columnId;
  }

  get data() {
    return this._data;
  }

  get rowId() {
    return this._rowId;
  }

  set columnId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnId is forbidden',
    });
  }

  set data(input: Data) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property data is forbidden',
    });
  }

  set rowId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowId is forbidden',
    });
  }
}
