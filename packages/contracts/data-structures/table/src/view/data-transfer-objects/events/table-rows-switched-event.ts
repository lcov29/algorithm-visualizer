import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableRowsSwitchedEventArgs {
  rowAId: number;
  rowBId: number;
}

export class TableRowsSwitchedEvent extends BaseEvent<'table-rows-switched'> {
  private _rowAId: number;
  private _rowBId: number;

  constructor(args: ITableRowsSwitchedEventArgs) {
    super('table-rows-switched');
    this._rowAId = args.rowAId;
    this._rowBId = args.rowBId;
  }

  get rowAId() {
    return this._rowAId;
  }

  get rowBId() {
    return this._rowBId;
  }

  set rowAId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowAId is forbidden',
    });
  }

  set rowBId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowBId is forbidden',
    });
  }
}
