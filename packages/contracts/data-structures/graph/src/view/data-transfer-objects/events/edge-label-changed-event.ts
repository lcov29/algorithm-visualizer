import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IEdgeLabelChangedEventArgs {
  edgeId: number;
  label: string;
}

/**
 * @throws InvalidOperationError
 */
export class EdgeLabelChangedEvent extends BaseEvent<'edge-label-changed'> {
  private _edgeId: number;
  private _label: string;

  constructor(args: IEdgeLabelChangedEventArgs) {
    super('edge-label-changed');
    this._edgeId = args.edgeId;
    this._label = args.label;
  }

  get edgeId() {
    return this._edgeId;
  }

  get label() {
    return this._label;
  }

  set edgeId(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeId is forbidden',
    });
  }

  set label(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property label is forbidden',
    });
  }
}
