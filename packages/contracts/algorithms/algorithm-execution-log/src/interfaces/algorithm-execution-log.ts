import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { AlgorithmExecutionLogStep } from '../data-transfer-objects';

export interface IAlgorithmExecutionLogStepId {
  stepId: number;
  optionId?: number;
}

export interface IAlgorithmExecutionLogProducer extends IEventSubscriber {}

export interface IAlgorithmExecutionLogConsumer {
  getStep: (
    args: IAlgorithmExecutionLogStepId,
  ) => AlgorithmExecutionLogStep | null;
  getFirstStepId: () => number;
  getLastStepId: () => number;
}

export interface IAlgorithmExecutionLog
  extends IAlgorithmExecutionLogProducer,
    IAlgorithmExecutionLogConsumer {}
