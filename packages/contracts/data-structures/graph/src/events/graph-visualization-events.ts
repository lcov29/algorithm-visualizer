import { GraphCreatedEvent } from './graph-created-event';
import { NodeHighlightAddedEvent } from './node-highlight-added-event';
import { NodeHighlightRemovedEvent } from './node-highlight-removed-event';

export type GraphVisualizationEvent =
  | GraphCreatedEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent;
