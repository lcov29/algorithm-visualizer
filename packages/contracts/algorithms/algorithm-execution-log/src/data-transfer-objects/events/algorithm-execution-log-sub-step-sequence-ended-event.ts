import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class AlgorithmExecutionLogSubStepSequenceEndedEvent extends BaseEvent<'algorithm-execution-log-sub-step-sequence-ended'> {
  constructor() {
    super('algorithm-execution-log-sub-step-sequence-ended');
  }
}
