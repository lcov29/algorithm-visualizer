import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeHighlightAddedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-highlight-added'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-highlight-added', args);
  }
}
