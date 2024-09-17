import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { ITableCell } from './table-cell';

type ReactStateSetter = React.Dispatch<
  React.SetStateAction<ITableCell[][] | null>
>;

export interface ITableVisualizer extends IEventSubscriber {
  setTableDataSetter: (setter: ReactStateSetter) => void;
}
