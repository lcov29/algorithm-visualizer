import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { TableStructureEvent } from '../types';

export interface ITableStructure<Data>
  extends IEventSubscriber<TableStructureEvent<Data>> {
  getData: (args: { rowId: number; columnId: number }) => Data | null;
  getDimension: () => { rowAmount: number; columnAmount: number };
  getTable: () => Data[][];
}
