import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeLabelDisplayedEvent extends EdgeBaseEvent<'edge-label-displayed'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-label-displayed', args);
  }
}
