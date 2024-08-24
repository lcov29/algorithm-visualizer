import {
  EdgeDisplayEvent,
  EdgeHideEvent,
  EdgeHighlightAddedEvent,
  EdgeHighlightRemovedEvent,
  EdgeLabelChangedEvent,
  EdgeLabelDisplayEvent,
  EdgeLabelHideEvent,
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightRemovedEvent,
  GraphRenderEvent,
  NodeDisplayEvent,
  NodeHideEvent,
  NodeHighlightAddedEvent,
  NodeHighlightRemovedEvent,
  NodeLabelChangedEvent,
  NodeLabelDisplayEvent,
  NodeLabelHideEvent,
  NodeLabelHighlightAddedEvent,
  NodeLabelHighlightRemovedEvent,
  NodeTitleChangedEvent,
} from '../data-transfer-objects/events';

export type GraphViewEvent =
  | EdgeDisplayEvent
  | EdgeHideEvent
  | EdgeHighlightAddedEvent
  | EdgeHighlightRemovedEvent
  | EdgeLabelChangedEvent
  | EdgeLabelDisplayEvent
  | EdgeLabelHideEvent
  | EdgeLabelHighlightAddedEvent
  | EdgeLabelHighlightRemovedEvent
  | GraphRenderEvent
  | NodeDisplayEvent
  | NodeHideEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelChangedEvent
  | NodeLabelDisplayEvent
  | NodeLabelHideEvent
  | NodeLabelHighlightAddedEvent
  | NodeLabelHighlightRemovedEvent
  | NodeTitleChangedEvent;
