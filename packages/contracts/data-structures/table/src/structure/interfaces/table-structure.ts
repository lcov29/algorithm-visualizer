import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

export interface ITableStructure<Data> extends IEventSubscriber {
  getData: (args: { rowId: number; columnId: number }) => Data | null;
  getDimension: () => { rowAmount: number; columnAmount: number };
  getTable: () => Data[][];
}
