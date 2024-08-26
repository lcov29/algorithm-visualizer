import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

export class NodeLabelDisplayedEvent extends NodeBaseEvent<'node-label-displayed'> {
  constructor(args: INodeBaseEventArgs) {
    super('node-label-displayed', args);
  }
}
