import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeDisplayedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-displayed'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-displayed', args);
  }
}
