import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

export class GraphViewEdgeHighlightRemovedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-highlight-removed'> {
  constructor(args: IGraphViewEdgeBaseEventArgs) {
    super('graph-view-edge-highlight-removed', args);
  }
}
