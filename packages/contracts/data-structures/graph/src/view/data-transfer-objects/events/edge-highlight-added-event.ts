import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeHighlightAddedEvent extends EdgeBaseEvent<'edge-highlight-added'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-highlight-added', args);
  }
}
