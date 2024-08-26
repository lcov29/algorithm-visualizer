import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { INodeBaseEventArgs, NodeBaseEvent } from './node-base-event';

interface INodeTitleChangedEventArgs extends INodeBaseEventArgs {
  title: string;
}

/**
 * @throws InvalidOperationError
 */
export class NodeTitleChangedEvent extends NodeBaseEvent<'node-title-changed'> {
  private _title: string;

  constructor(args: INodeTitleChangedEventArgs) {
    super('node-title-changed', args);
    this._title = args.title;
  }

  get title() {
    return this._title;
  }

  set title(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property title is forbidden',
    });
  }
}
