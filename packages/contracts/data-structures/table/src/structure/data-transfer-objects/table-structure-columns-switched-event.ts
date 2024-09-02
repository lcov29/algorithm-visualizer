import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface ITableStructureColumnsSwitchedArgs {
  columnAId: number;
  columnBId: number;
}

export class TableStructureColumnsSwitchedEvent extends BaseEvent<'table-structure-columns-switched'> {
  private _columnAId: number;
  private _columnBId: number;

  constructor(args: ITableStructureColumnsSwitchedArgs) {
    super('table-structure-columns-switched');
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
