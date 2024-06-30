import { IEdgeAddedEvent } from './edge-added-event';
import { IEdgeDeletedEvent } from './edge-deleted-event';
import { IEdgeWeightChangedEvent } from './edge-weight-changed-event';
import { INodeAddedEvent } from './node-added-event';
import { INodeDeletedEvent } from './node-deleted-event';
import { INodeLabelChangedEvent } from './node-label-changed-event';

export type GraphEvent =
  | INodeAddedEvent
  | INodeDeletedEvent
  | INodeLabelChangedEvent
  | IEdgeAddedEvent
  | IEdgeDeletedEvent
  | IEdgeWeightChangedEvent;
