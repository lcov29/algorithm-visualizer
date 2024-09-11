import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export interface IGraphStructureEdgeBaseEventArgs {
  edgeId: number;
}

/**
 * @throws InvalidOperationError
 */
export abstract class GraphStructureEdgeBaseEvent<
  Name extends string,
> extends BaseEvent<Name> {
  private _edgeId: number;

  constructor(name: Name, args: IGraphStructureEdgeBaseEventArgs) {
    super(name);
    this._edgeId = args.edgeId;
  }

  get edgeId() {
    return this._edgeId;
  }

  set edgeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeId is forbidden',
    });
  }
}
