import { GraphCreatedEvent } from './graph-created-event';
import { NodeHighlightAddedEvent } from './node-highlight-added-event';
import { NodeHighlightRemovedEvent } from './node-highlight-removed-event';
import { NodeLabelChangedEvent } from './node-label-changed-event';

export type GraphVisualizationEvent =
  | GraphCreatedEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelChangedEvent;
