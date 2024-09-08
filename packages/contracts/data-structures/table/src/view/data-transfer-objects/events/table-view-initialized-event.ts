import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { ITableViewContent } from '../../interfaces';

interface ITableViewInitializedEventArgs {
  table: Omit<ITableViewContent, 'highlightClass'>[][][];
}

export class TableViewInitializedEvent extends BaseEvent<'table-view-initialized'> {
  private _table: Omit<ITableViewContent, 'highlightClass'>[][][];

  constructor(args: ITableViewInitializedEventArgs) {
    super('table-view-initialized');
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
