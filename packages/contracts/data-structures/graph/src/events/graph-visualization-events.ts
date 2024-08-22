import { EdgeHighlightAddedEvent } from './edge-highlight-added-event';
import { EdgeHighlightRemovedEvent } from './edge-highlight-removed-event';
import { EdgeLabelHighlightAddedEvent } from './edge-label-highlight-added-event';
import { EdgeLabelHighlightRemovedEvent } from './edge-label-highlight-removed-event';
import { EdgeWeightChangedEvent } from './edge-weight-changed-event';
import { GraphCreatedEvent } from './graph-created-event';
import { NodeHighlightAddedEvent } from './node-highlight-added-event';
import { NodeHighlightRemovedEvent } from './node-highlight-removed-event';
import { NodeLabelChangedEvent } from './node-label-changed-event';

export type GraphVisualizationEvent =
  | GraphCreatedEvent
  | NodeHighlightAddedEvent
  | NodeHighlightRemovedEvent
  | NodeLabelChangedEvent
  | EdgeHighlightAddedEvent
  | EdgeHighlightRemovedEvent
  | EdgeWeightChangedEvent
  | EdgeLabelHighlightAddedEvent
  | EdgeLabelHighlightRemovedEvent;
