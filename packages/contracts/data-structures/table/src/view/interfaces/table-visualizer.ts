import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { TableViewEvent } from '../types';
import { ITableCell } from './table-cell';

type ReactStateSetter = React.Dispatch<
  React.SetStateAction<ITableCell[][] | null>
>;

export interface ITableVisualizer extends IEventSubscriber<TableViewEvent> {
  setTableDataSetter: (setter: ReactStateSetter) => void;
}
