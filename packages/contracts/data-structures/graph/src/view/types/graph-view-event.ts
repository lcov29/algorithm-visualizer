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
  GraphViewInitializedEvent,
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
  GraphViewResetEvent,
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
  | GraphViewInitializedEvent
  | GraphViewNodeDisplayedEvent
  | GraphViewNodeHiddenEvent
  | GraphViewNodeHighlightAddedEvent
  | GraphViewNodeHighlightRemovedEvent
  | GraphViewNodeLabelChangedEvent
  | GraphViewNodeLabelDisplayedEvent
  | GraphViewNodeLabelHiddenEvent
  | GraphViewNodeLabelHighlightAddedEvent
  | GraphViewNodeLabelHighlightRemovedEvent
  | GraphViewNodeTitleChangedEvent
  | GraphViewResetEvent;
