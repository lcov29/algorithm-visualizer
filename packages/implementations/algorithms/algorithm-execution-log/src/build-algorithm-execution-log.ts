import {
  AlgorithmExecutionLogBuilder,
  AlgorithmExecutionLogEvent,
  IAlgorithmExecutionLogStepId,
} from '@algorithm-visualizer/algorithm-execution-log-contract';
import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { Stack } from '@algorithm-visualizer/stack';

import { AlgorithmExecutionLog } from './algorithm-execution-log';

export const buildAlgorithmExecutionLog: AlgorithmExecutionLogBuilder = () => {
  const eventHandlerChain = new EventHandlerChain<AlgorithmExecutionLogEvent>({
    abortAfterSuccess: true,
    validator: new FunctionValidator(),
  });
  const sequenceRootStack = new Stack<IAlgorithmExecutionLogStepId>();
  return new AlgorithmExecutionLog({ eventHandlerChain, sequenceRootStack });
};
