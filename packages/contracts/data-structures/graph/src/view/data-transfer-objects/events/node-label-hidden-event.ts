import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

export class NodeLabelHiddenEvent extends NodeBaseEvent<'node-label-hidden'> {
  constructor(args: INodeBaseEventArgs) {
    super('node-label-hidden', args);
  }
}
