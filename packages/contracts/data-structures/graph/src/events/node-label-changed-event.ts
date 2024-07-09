import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeLabelChangedEventArgs {
  nodeId: number;
  label: string;
}

export class NodeLabelChangedEvent extends BaseEvent<'node-label-changed'> {
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
