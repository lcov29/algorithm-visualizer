import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { ITableViewContent } from '../../interfaces';

interface ITableInitializedEventArgs {
  table: Omit<ITableViewContent, 'highlightClass'>[][][];
}

export class TableInitializedEvent extends BaseEvent<'table-initialized'> {
  private _table: Omit<ITableViewContent, 'highlightClass'>[][][];

  constructor(args: ITableInitializedEventArgs) {
    super('table-initialized');
    this._table = args.table;
  }

  get table() {
    return this._table;
  }

  set table(input: Omit<ITableViewContent, 'highlightClass'>[][][]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property table is forbidden',
    });
  }
}
