import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeHiddenEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-hidden'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-hidden', args);
  }
}
