import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewNodeBaseEvent,
  IGraphViewNodeBaseEventArgs,
} from './graph-view-node-base-event';

interface IGraphViewNodeTitleChangedEventArgs
  extends IGraphViewNodeBaseEventArgs {
  title: string;
}

/**
 * @throws InvalidOperationError
 */
export class GraphViewNodeTitleChangedEvent extends GraphViewNodeBaseEvent<'graph-view-node-title-changed'> {
  private _title: string;

  constructor(args: IGraphViewNodeTitleChangedEventArgs) {
    super('graph-view-node-title-changed', args);
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
