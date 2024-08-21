import { GraphCreatedEvent } from './graph-created-event';
import { NodeHighlightRemovedEvent } from './node-highlight-removed-event';
import { NodeHighlightedEvent } from './node-highlighted-event';

export type GraphVisualizationEvent =
  | GraphCreatedEvent
  | NodeHighlightedEvent
  | NodeHighlightRemovedEvent;
