import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeHighlightRemovedEvent extends EdgeBaseEvent<'edge-highlight-removed'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-highlight-removed', args);
  }
}
