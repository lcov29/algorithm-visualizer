import { GraphCreatedEvent } from '../../generator';
import {
  EdgeDisplayEvent,
  EdgeHideEvent,
  EdgeHighlightAddedEvent,
  EdgeHighlightRemovedEvent,
  EdgeLabelDisplayEvent,
  EdgeLabelHideEvent,
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightRemovedEvent,
  NodeDisplayEvent,
  NodeHideEvent,
  NodeHighlightAddedEvent,
  NodeHighlightRemovedEvent,
  NodeLabelDisplayEvent,
  NodeLabelHideEvent,
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
  | EdgeLabelDisplayEvent
  | EdgeLabelHideEvent
  | EdgeLabelHighlightAddedEvent
  | EdgeLabelHighlightRemovedEvent
  | EdgeWeightChangedEvent
  | GraphCreatedEvent
  | NodeAddedEvent
  | NodeDeletedEvent
  | NodeDisplayEvent
  | NodeHideEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelDisplayEvent
  | NodeLabelHideEvent
  | NodeLabelChangedEvent
  | NodeLabelHighlightAddedEvent
  | NodeLabelHighlightRemovedEvent
  | NodeTitleChangedEvent;
