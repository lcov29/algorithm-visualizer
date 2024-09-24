import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class AlgorithmExecutionLogOptionSequenceEndedEvent extends BaseEvent<'algorithm-execution-log-option-sequence-ended'> {
  constructor() {
    super('algorithm-execution-log-option-sequence-ended');
  }
}
