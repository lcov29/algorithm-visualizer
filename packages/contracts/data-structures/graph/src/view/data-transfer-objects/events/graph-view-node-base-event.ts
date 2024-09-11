import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export interface IGraphViewNodeBaseEventArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export abstract class GraphViewNodeBaseEvent<
  Name extends string,
> extends BaseEvent<Name> {
  private _nodeId: number;

  constructor(name: Name, args: IGraphViewNodeBaseEventArgs) {
    super(name);
    this._nodeId = args.nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }

  set nodeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }
}
