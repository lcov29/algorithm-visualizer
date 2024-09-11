import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

export class GraphViewNodeLabelHiddenEvent extends GraphViewNodeBaseEvent<'graph-view-node-label-hidden'> {
  constructor(args: IGraphViewNodeBaseEventArgs) {
    super('graph-view-node-label-hidden', args);
  }
}
