import {
  GraphStructureEdgeAddedEvent,
  GraphStructureEdgeDeletedEvent,
  GraphStructureEdgeWeightChangedEvent,
  GraphStructureInitializedEvent,
  GraphStructureNodeAddedEvent,
  GraphStructureNodeDeletedEvent,
} from '../events';

export type GraphStructureEvent =
  | GraphStructureEdgeAddedEvent
  | GraphStructureEdgeDeletedEvent
  | GraphStructureEdgeWeightChangedEvent
  | GraphStructureInitializedEvent
  | GraphStructureNodeAddedEvent
  | GraphStructureNodeDeletedEvent;
