import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

export class GraphViewNodeLabelDisplayedEvent extends GraphViewNodeBaseEvent<'graph-view-node-label-displayed'> {
  constructor(args: IGraphViewNodeBaseEventArgs) {
    super('graph-view-node-label-displayed', args);
  }
}
