import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeLabelHiddenEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-label-hidden'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-label-hidden', args);
  }
}
