import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export class AlgorithmExecutionLogSubStepSequenceStartedEvent extends BaseEvent<'algorithm-execution-log-sub-step-sequence-started'> {
  constructor() {
    super('algorithm-execution-log-sub-step-sequence-started');
  }
}
