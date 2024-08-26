import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

/**
 * @throws InvalidOperationError
 */
export class EdgeDeletedEvent extends EdgeBaseEvent<'edge-deleted'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-deleted', args);
  }
}
