import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface NodeTitleChangedEventArgs {
  nodeId: number;
  title: string;
}

/**
 * @throws InvalidOperationError
 */
export class NodeTitleChangedEvent extends BaseEvent<'node-title-changed'> {
  private _nodeId: number;
  private _title: string;

  constructor(args: NodeTitleChangedEventArgs) {
    super('node-title-changed');
    this._nodeId = args.nodeId;
    this._title = args.title;
  }

  get nodeId() {
    return this._nodeId;
  }

  get title() {
    return this._title;
  }

  set nodeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }

  set title(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property title is forbidden',
    });
  }
}
