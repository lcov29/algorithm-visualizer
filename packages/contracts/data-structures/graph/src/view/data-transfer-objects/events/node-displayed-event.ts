import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

export class NodeDisplayedEvent extends NodeBaseEvent<'node-displayed'> {
  constructor(args: INodeBaseEventArgs) {
    super('node-displayed', args);
  }
}
