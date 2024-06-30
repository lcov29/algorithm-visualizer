import { BaseEvent, IBaseEvent } from '@algorithm-visualizer/event-handling';

interface EdgeWeightChangedEventArgs {
  edgeId: number;
  newWeight: number;
}

export interface IEdgeWeightChangedEvent
  extends IBaseEvent<'edge-weight-changed'>,
    EdgeWeightChangedEventArgs {}

export class EdgeWeightChangedEvent
  extends BaseEvent<'edge-weight-changed'>
  implements IEdgeWeightChangedEvent
{
  private _edgeId: number;
  private _newWeight: number;

  constructor(args: EdgeWeightChangedEventArgs) {
    super('edge-weight-changed');
    this._edgeId = args.edgeId;
    this._newWeight = args.newWeight;
  }

  get edgeId() {
    return this._edgeId;
  }

  get newWeight() {
    return this._newWeight;
  }
}
