import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableStructureInitializedEventArgs<Data> {
  data: Data[][];
}

export class TableStructureInitializedEvent<
  Data,
> extends BaseEvent<'table-structure-initialized'> {
  private _data: Data[][];

  constructor(args: ITableStructureInitializedEventArgs<Data>) {
    super('table-structure-initialized');
    this._data = args.data;
  }

  get data() {
    return this._data;
  }

  set data(input: Data[][]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property data is forbidden',
    });
  }
}
