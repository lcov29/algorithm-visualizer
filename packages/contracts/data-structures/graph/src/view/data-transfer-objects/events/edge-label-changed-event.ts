import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeBaseEvent, IEdgeBaseEventArgs } from './edge-base-event';

interface IEdgeLabelChangedEventArgs extends IEdgeBaseEventArgs {
  label: string;
}

export class EdgeLabelChangedEvent extends EdgeBaseEvent<'edge-label-changed'> {
  private _label: string;

  constructor(args: IEdgeLabelChangedEventArgs) {
    super('edge-label-changed', args);
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
