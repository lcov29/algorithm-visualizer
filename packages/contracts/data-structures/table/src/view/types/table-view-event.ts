import {
  TableViewCellHighlightAddedEvent,
  TableViewCellHighlightRemovedEvent,
  TableViewColumnHighlightAddedEvent,
  TableViewColumnHighlightRemovedEvent,
  TableViewColumnsSwitchedEvent,
  TableViewContentHighlightAddedEvent,
  TableViewContentHighlightRemovedEvent,
  TableViewContentUpdatedEvent,
  TableViewInitializedEvent,
  TableViewRenderedEvent,
  TableViewRowHighlightAddedEvent,
  TableViewRowHighlightRemovedEvent,
  TableViewRowsSwitchedEvent,
} from '../data-transfer-objects';

export type TableViewEvent =
  | TableViewCellHighlightAddedEvent
  | TableViewCellHighlightRemovedEvent
  | TableViewColumnHighlightAddedEvent
  | TableViewColumnHighlightRemovedEvent
  | TableViewColumnsSwitchedEvent
  | TableViewContentHighlightAddedEvent
  | TableViewContentHighlightRemovedEvent
  | TableViewContentUpdatedEvent
  | TableViewInitializedEvent
  | TableViewRenderedEvent
  | TableViewRowHighlightAddedEvent
  | TableViewRowHighlightRemovedEvent
  | TableViewRowsSwitchedEvent;
