import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeLabelChangedEventArgs
  extends IGraphViewNodeBaseEventArgs {
  label: string;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewNodeLabelChangedEvent extends GraphViewNodeBaseEvent<'graph-view-node-label-changed'> {
  private _label: string;

  constructor(args: IGraphViewNodeLabelChangedEventArgs) {
    super('graph-view-node-label-changed', args);
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
