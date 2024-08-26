import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeLabelHiddenEvent extends EdgeBaseEvent<'edge-label-hidden'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-label-hidden', args);
  }
}
