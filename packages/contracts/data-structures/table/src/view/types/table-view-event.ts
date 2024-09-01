import {
  TableCellHighlightAddedEvent,
  TableCellHighlightRemovedEvent,
  TableColumnHighlightAddedEvent,
  TableColumnHighlightRemovedEvent,
  TableColumnsSwitchedEvent,
  TableContentUpdatedEvent,
  TableInitializedEvent,
  TableRenderedEvent,
  TableRowHighlightAddedEvent,
  TableRowHighlightRemovedEvent,
  TableRowsSwitchedEvent,
} from '../data-transfer-objects';

export type TableViewEvent =
  | TableCellHighlightAddedEvent
  | TableCellHighlightRemovedEvent
  | TableColumnHighlightAddedEvent
  | TableColumnHighlightRemovedEvent
  | TableColumnsSwitchedEvent
  | TableContentUpdatedEvent
  | TableInitializedEvent
  | TableRenderedEvent
  | TableRowHighlightAddedEvent
  | TableRowHighlightRemovedEvent
  | TableRowsSwitchedEvent;
