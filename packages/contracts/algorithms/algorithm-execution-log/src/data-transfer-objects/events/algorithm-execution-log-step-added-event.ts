import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IAlgorithmExecutionLogStepAddedEventArgs {
  title: string;
  description: string;
  viewEvents?: BaseEvent<string>[];
}

export class AlgorithmExecutionLogStepAddedEvent extends BaseEvent<'algorithm-execution-log-step-added'> {
  private _title: string;
  private _description: string;
  private _viewEvents: BaseEvent<string>[];

  constructor(args: IAlgorithmExecutionLogStepAddedEventArgs) {
    super('algorithm-execution-log-step-added');
    this._title = args.title;
    this._description = args.description;
    this._viewEvents = args.viewEvents ?? [];
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get viewEvents() {
    return this._viewEvents.map(event => event);
  }

  set title(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property title is forbidden',
    });
  }

  set description(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property description is forbidden',
    });
  }

  set viewEvents(input: BaseEvent<string>[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property viewEvents is forbidden',
    });
  }
}
