import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

export class EdgeDisplayedEvent extends EdgeBaseEvent<'edge-displayed'> {
  constructor(args: IEdgeBaseEventArgs) {
    super('edge-displayed', args);
  }
}
