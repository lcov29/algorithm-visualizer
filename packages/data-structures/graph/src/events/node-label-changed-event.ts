import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

interface NodeLabelChangedEventArgs {
  nodeId: number;
  label: string;
}

export interface INodeLabelChangedEvent
  extends IBaseEvent<'node-label-changed'>,
    NodeLabelChangedEventArgs {}

export class NodeLabelChangedEvent
  extends BaseEvent<'node-label-changed'>
  implements INodeLabelChangedEvent
{
  private _nodeId: number;
  private _label: string;

  constructor(args: NodeLabelChangedEventArgs) {
    super('node-label-changed');
    this._nodeId = args.nodeId;
    this._label = args.label;
  }

  get nodeId() {
    return this._nodeId;
  }

  get label() {
    return this._label;
  }
}
