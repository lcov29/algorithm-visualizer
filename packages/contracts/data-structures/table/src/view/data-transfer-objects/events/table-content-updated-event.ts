import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { ITableViewContent } from '../../interfaces';

interface ITableContentUpdatedArgs {
  rowId: number;
  columnId: number;
  newContent: ITableViewContent[];
}

export class TableContentUpdatedEvent extends BaseEvent<'table-content-updated'> {
  private _rowId: number;
  private _columnId: number;
  private _newContent: ITableViewContent[];

  constructor(args: ITableContentUpdatedArgs) {
    super('table-content-updated');
    this._rowId = args.rowId;
    this._columnId = args.columnId;
    this._newContent = args.newContent;
  }

  get rowId() {
    return this._rowId;
  }

  get columnId() {
    return this._columnId;
  }

  get newContent() {
    return structuredClone(this._newContent);
  }

  set rowId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowId is forbidden',
    });
  }

  set columnId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnId is forbidden',
    });
  }

  set newContent(input: ITableViewContent[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property newContent is forbidden',
    });
  }
}
