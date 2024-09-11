import {
  GraphViewEdgeDisplayedEvent,
  GraphViewEdgeHiddenEvent,
  GraphViewEdgeHighlightAddedEvent,
  GraphViewEdgeHighlightRemovedEvent,
  GraphViewEdgeLabelChangedEvent,
  GraphViewEdgeLabelDisplayedEvent,
  GraphViewEdgeLabelHiddenEvent,
  GraphViewEdgeLabelHighlightAddedEvent,
  GraphViewEdgeLabelHighlightRemovedEvent,
  GraphViewNodeDisplayedEvent,
  GraphViewNodeHiddenEvent,
  GraphViewNodeHighlightAddedEvent,
  GraphViewNodeHighlightRemovedEvent,
  GraphViewNodeLabelChangedEvent,
  GraphViewNodeLabelDisplayedEvent,
  GraphViewNodeLabelHiddenEvent,
  GraphViewNodeLabelHighlightAddedEvent,
  GraphViewNodeLabelHighlightRemovedEvent,
  GraphViewNodeTitleChangedEvent,
  GraphViewRenderedEvent,
} from '../data-transfer-objects/events';

export type GraphViewEvent =
  | GraphViewEdgeDisplayedEvent
  | GraphViewEdgeHiddenEvent
  | GraphViewEdgeHighlightAddedEvent
  | GraphViewEdgeHighlightRemovedEvent
  | GraphViewEdgeLabelChangedEvent
  | GraphViewEdgeLabelDisplayedEvent
  | GraphViewEdgeLabelHiddenEvent
  | GraphViewEdgeLabelHighlightAddedEvent
  | GraphViewEdgeLabelHighlightRemovedEvent
  | GraphViewRenderedEvent
  | GraphViewNodeDisplayedEvent
  | GraphViewNodeHiddenEvent
  | GraphViewNodeHighlightAddedEvent
  | GraphViewNodeHighlightRemovedEvent
  | GraphViewNodeLabelChangedEvent
  | GraphViewNodeLabelDisplayedEvent
  | GraphViewNodeLabelHiddenEvent
  | GraphViewNodeLabelHighlightAddedEvent
  | GraphViewNodeLabelHighlightRemovedEvent
  | GraphViewNodeTitleChangedEvent;
