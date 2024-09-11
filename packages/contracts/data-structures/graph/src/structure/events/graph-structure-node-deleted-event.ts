import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IGraphStructureNodeDeletedEventArgs {
  nodeId: number;
}

/**
 * @throws InvalidOperationError
 */
export class GraphStructureNodeDeletedEvent extends BaseEvent<'graph-structure-node-deleted'> {
  private _nodeId: number;

  constructor(args: IGraphStructureNodeDeletedEventArgs) {
    super('graph-structure-node-deleted');
    this._nodeId = args.nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }

  set nodeId(nodeId: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeId is forbidden',
    });
  }
}
