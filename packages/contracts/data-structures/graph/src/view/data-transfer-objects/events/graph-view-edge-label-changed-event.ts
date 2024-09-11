import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewEdgeBaseEvent,
  IGraphViewEdgeBaseEventArgs,
} from './graph-view-edge-base-event';

interface IGraphViewEdgeLabelChangedEventArgs
  extends IGraphViewEdgeBaseEventArgs {
  label: string;
}

export class GraphViewEdgeLabelChangedEvent extends GraphViewEdgeBaseEvent<'graph-view-edge-label-changed'> {
  private _label: string;

  constructor(args: IGraphViewEdgeLabelChangedEventArgs) {
    super('graph-view-edge-label-changed', args);
    this._label = args.label;
  }

  get label() {
    return this._label;
  }

  set label(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property label is forbidden',
    });
  }
}
