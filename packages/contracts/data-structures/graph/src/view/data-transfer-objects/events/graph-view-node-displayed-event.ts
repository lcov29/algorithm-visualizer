import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

export class GraphViewNodeDisplayedEvent extends GraphViewNodeBaseEvent<'graph-view-node-displayed'> {
  constructor(args: IGraphViewNodeBaseEventArgs) {
    super('graph-view-node-displayed', args);
  }
}
