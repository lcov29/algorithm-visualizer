import { EdgeAddedEvent } from './edge-added-event';
import { EdgeDeletedEvent } from './edge-deleted-event';
import { EdgeWeightChangedEvent } from './edge-weight-changed-event';
import { GraphCreatedEvent } from './graph-created-event';
import { NodeAddedEvent } from './node-added-event';
import { NodeDeletedEvent } from './node-deleted-event';
import { NodeLabelChangedEvent } from './node-label-changed-event';

export type GraphEvent =
  | NodeAddedEvent
  | NodeDeletedEvent
  | NodeLabelChangedEvent
  | GraphCreatedEvent
  | EdgeAddedEvent
  | EdgeDeletedEvent
  | EdgeWeightChangedEvent;
