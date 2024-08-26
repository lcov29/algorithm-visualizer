import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeHiddenEvent extends EdgeBaseEvent<'edge-hidden'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-hidden', args);
  }
}
