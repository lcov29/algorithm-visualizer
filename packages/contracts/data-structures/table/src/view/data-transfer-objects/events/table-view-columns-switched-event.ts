import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableViewColumnsSwitchedEventArgs {
  columnAId: number;
  columnBId: number;
}

export class TableViewColumnsSwitchedEvent extends BaseEvent<'table-view-columns-switched'> {
  private _columnAId: number;
  private _columnBId: number;

  constructor(args: ITableViewColumnsSwitchedEventArgs) {
    super('table-view-columns-switched');
    this._columnAId = args.columnAId;
    this._columnBId = args.columnBId;
  }

  get columnAId() {
    return this._columnAId;
  }

  get columnBId() {
    return this._columnBId;
  }

  set columnAId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnAId is forbidden',
    });
  }

  set columnBId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnBId is forbidden',
    });
  }
}
