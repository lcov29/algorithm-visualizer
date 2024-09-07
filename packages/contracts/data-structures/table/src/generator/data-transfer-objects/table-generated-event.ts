import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableGeneratorEventArgs<Data> {
  data: Data[][];
}

export class TableGeneratedEvent<
  Data,
> extends BaseEvent<'table-generated-event'> {
  private _data: Data[][];

  constructor(args: ITableGeneratorEventArgs<Data>) {
    super('table-generated-event');
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
