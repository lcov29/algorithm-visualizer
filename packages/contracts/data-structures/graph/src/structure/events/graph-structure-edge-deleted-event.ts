import {
  GraphStructureEdgeBaseEvent,
  IGraphStructureEdgeBaseEventArgs,
} from './graph-structure-edge-base-event';

/**
 * @throws InvalidOperationError
 */
export class GraphStructureEdgeDeletedEvent extends GraphStructureEdgeBaseEvent<'graph-structure-edge-deleted'> {
  constructor(args: IGraphStructureEdgeBaseEventArgs) {
    super('graph-structure-edge-deleted', args);
  }
}
