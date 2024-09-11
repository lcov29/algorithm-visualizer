import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeLabelDisplayedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-label-displayed'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-label-displayed', args);
  }
}
