import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

export class NodeHiddenEvent extends NodeBaseEvent<'node-hidden'> {
  constructor(args: INodeBaseEventArgs) {
    super('node-hidden', args);
  }
}
