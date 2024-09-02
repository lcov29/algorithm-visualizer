import {
  TableStructureColumnsSwitchedEvent,
  TableStructureDataChangedEvent,
  TableStructureInitializedEvent,
  TableStructureRowsSwitchedEvent,
} from '../data-transfer-objects';

export type TableStructureEvent<Data> =
  | TableStructureColumnsSwitchedEvent
  | TableStructureDataChangedEvent<Data>
  | TableStructureInitializedEvent<Data>
  | TableStructureRowsSwitchedEvent;
