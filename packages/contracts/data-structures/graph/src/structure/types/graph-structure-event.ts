import {
  EdgeAddedEvent,
  EdgeDeletedEvent,
  EdgeWeightChangedEvent,
  GraphCreatedEvent,
  NodeAddedEvent,
  NodeDeletedEvent,
} from '../events';

export type GraphStructureEvent =
  | EdgeAddedEvent
  | EdgeDeletedEvent
  | EdgeWeightChangedEvent
  | GraphCreatedEvent
  | NodeAddedEvent
  | NodeDeletedEvent;
