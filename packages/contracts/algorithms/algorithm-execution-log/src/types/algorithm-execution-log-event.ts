import {
  AlgorithmExecutionLogOptionSequenceEndedEvent,
  AlgorithmExecutionLogOptionSequenceStartedEvent,
  AlgorithmExecutionLogStepAddedEvent,
  AlgorithmExecutionLogSubStepSequenceEndedEvent,
  AlgorithmExecutionLogSubStepSequenceStartedEvent,
} from '../data-transfer-objects';

export type AlgorithmExecutionLogEvent =
  | AlgorithmExecutionLogOptionSequenceEndedEvent
  | AlgorithmExecutionLogOptionSequenceStartedEvent
  | AlgorithmExecutionLogStepAddedEvent
  | AlgorithmExecutionLogSubStepSequenceEndedEvent
  | AlgorithmExecutionLogSubStepSequenceStartedEvent;
