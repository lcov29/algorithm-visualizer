import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

export class GraphViewNodeHiddenEvent extends GraphViewNodeBaseEvent<'graph-view-node-hidden'> {
  constructor(args: IGraphViewNodeBaseEventArgs) {
    super('graph-view-node-hidden', args);
  }
}
