import { GraphCreatedEvent } from '../../generator';
import {
  EdgeDisplayEvent,
  EdgeHideEvent,
  EdgeHighlightAddedEvent,
  EdgeHighlightRemovedEvent,
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightRemovedEvent,
  NodeHighlightAddedEvent,
  NodeHighlightRemovedEvent,
  NodeLabelHighlightAddedEvent,
  NodeLabelHighlightRemovedEvent,
  NodeTitleChangedEvent,
} from '../../view';
import {
  EdgeAddedEvent,
  EdgeDeletedEvent,
  EdgeWeightChangedEvent,
  NodeAddedEvent,
  NodeDeletedEvent,
  NodeLabelChangedEvent,
} from '../events';

export type GraphEvent =
  | EdgeAddedEvent
  | EdgeDeletedEvent
  | EdgeDisplayEvent
  | EdgeHideEvent
  | EdgeHighlightAddedEvent
  | EdgeHighlightRemovedEvent
  | EdgeLabelHighlightAddedEvent
  | EdgeLabelHighlightRemovedEvent
  | EdgeWeightChangedEvent
  | GraphCreatedEvent
  | NodeAddedEvent
  | NodeDeletedEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelChangedEvent
  | NodeLabelHighlightAddedEvent
  | NodeLabelHighlightRemovedEvent
  | NodeTitleChangedEvent;
