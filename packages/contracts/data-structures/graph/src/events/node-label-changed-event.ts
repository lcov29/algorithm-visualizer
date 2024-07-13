import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
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

  set nodeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }

  set label(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property label is forbidden',
    });
  }
}
