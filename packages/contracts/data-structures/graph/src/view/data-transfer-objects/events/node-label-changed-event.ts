import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeLabelChangedEventArgs extends INodeBaseEventArgs {
  label: string;
}

/**
 * @throws InvalidOperationError
 */
export class NodeLabelChangedEvent extends NodeBaseEvent<'node-label-changed'> {
  private _label: string;

  constructor(args: INodeLabelChangedEventArgs) {
    super('node-label-changed', args);
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
