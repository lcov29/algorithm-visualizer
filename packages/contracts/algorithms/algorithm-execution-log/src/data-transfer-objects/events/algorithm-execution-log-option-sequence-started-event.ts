import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

interface IAlgorithmExecutionLogOptionSequenceStartedEventArgs {
  optionLabel: string;
}

export class AlgorithmExecutionLogOptionSequenceStartedEvent extends BaseEvent<'algorithm-execution-log-option-sequence-started'> {
  private _optionLabel: string;

  constructor(args: IAlgorithmExecutionLogOptionSequenceStartedEventArgs) {
    super('algorithm-execution-log-option-sequence-started');
    this._optionLabel = args.optionLabel;
  }

  get optionLabel() {
    return this._optionLabel;
  }

  set optionLabel(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property optionLabel is forbidden',
    });
  }
}
