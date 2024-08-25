import {
  EdgeDisplayedEvent,
  EdgeHiddenEvent,
  EdgeHighlightAddedEvent,
  EdgeHighlightRemovedEvent,
  EdgeLabelChangedEvent,
  EdgeLabelDisplayedEvent,
  EdgeLabelHiddenEvent,
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightRemovedEvent,
  GraphRenderedEvent,
  NodeDisplayedEvent,
  NodeHiddenEvent,
  NodeHighlightAddedEvent,
  NodeHighlightRemovedEvent,
  NodeLabelChangedEvent,
  NodeLabelDisplayedEvent,
  NodeLabelHiddenEvent,
  NodeLabelHighlightAddedEvent,
  NodeLabelHighlightRemovedEvent,
  NodeTitleChangedEvent,
} from '../data-transfer-objects/events';

export type GraphViewEvent =
  | EdgeDisplayedEvent
  | EdgeHiddenEvent
  | EdgeHighlightAddedEvent
  | EdgeHighlightRemovedEvent
  | EdgeLabelChangedEvent
  | EdgeLabelDisplayedEvent
  | EdgeLabelHiddenEvent
  | EdgeLabelHighlightAddedEvent
  | EdgeLabelHighlightRemovedEvent
  | GraphRenderedEvent
  | NodeDisplayedEvent
  | NodeHiddenEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelChangedEvent
  | NodeLabelDisplayedEvent
  | NodeLabelHiddenEvent
  | NodeLabelHighlightAddedEvent
  | NodeLabelHighlightRemovedEvent
  | NodeTitleChangedEvent;
