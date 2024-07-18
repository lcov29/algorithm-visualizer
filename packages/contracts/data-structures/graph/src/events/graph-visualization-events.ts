import { GraphCreatedEvent } from './graph-created-event';
import { NodeHighlightedEvent } from './node-highlighted-event';

export type GraphVisualizationEvent = GraphCreatedEvent | NodeHighlightedEvent;
