import {
  AlgorithmExecutionLogOptionSequenceStartedEvent,
  AlgorithmExecutionLogStepAddedEvent,
  AlgorithmExecutionLogSubStepSequenceEndedEvent,
  AlgorithmExecutionLogSubStepSequenceStartedEvent,
} from '@algorithm-visualizer/algorithm-execution-log-contract';

import { AlgorithmExecutionLog } from '../src/algorithm-execution-log';
import { buildAlgorithmExecutionLog } from '../src/build-algorithm-execution-log';

// integration test
describe('buildAlgorithmExecutionLog()', () => {
  let executionLog: AlgorithmExecutionLog;

  function checkStep(args: {
    stepId: number;
    title: string;
    description: string;
    hasSubSteps?: boolean;
    subStepOf?: number;
    optionId?: number;
  }) {
    const {
      stepId,
      title,
      description,
      hasSubSteps = false,
      subStepOf = null,
      optionId,
    } = args;
    const step = executionLog.getStep({ stepId, optionId });
    expect(step?.id).toBe(stepId);
    expect(step?.title).toBe(title);
    expect(step?.description).toBe(description);
    expect(step?.hasSubSteps).toBe(hasSubSteps);
    expect(step?.subStepOf).toBe(subStepOf);
  }

  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-expect-error interface is missing private properties
    executionLog = buildAlgorithmExecutionLog();
  });

  describe('step sequence without sub steps and options', () => {
    it('is correctly saved', async () => {
      // (0, step1, foo) --> (1, step2, bar) --> (2, step3, baz)

      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step1',
          description: 'foo',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'baz',
        }),
      );
      expect(executionLog.getFirstStepId()).toBe(0);
      expect(executionLog.getLastStepId()).toBe(2);

      checkStep({ stepId: 0, title: 'step1', description: 'foo' });
      checkStep({ stepId: 1, title: 'step2', description: 'bar' });
      checkStep({ stepId: 2, title: 'step3', description: 'baz' });
    });
  });

  describe('step sequence with sub steps', () => {
    it('is correctly saved when there is only one sub step sequence', async () => {
      // (0, step1, foo) --> (1, step2, bar) --> (4, step5, bat)
      //                            |
      //                            --> (2, step3, baz) --> (3, step4, bak)

      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step1',
          description: 'foo',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceStartedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'baz',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step4',
          description: 'bak',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step5',
          description: 'bat',
        }),
      );

      expect(executionLog.getFirstStepId()).toBe(0);
      expect(executionLog.getLastStepId()).toBe(4);

      checkStep({ stepId: 0, title: 'step1', description: 'foo' });
      checkStep({
        stepId: 1,
        title: 'step2',
        description: 'bar',
        hasSubSteps: true,
      });
      checkStep({
        stepId: 2,
        title: 'step3',
        description: 'baz',
        subStepOf: 1,
      });
      checkStep({
        stepId: 3,
        title: 'step4',
        description: 'bak',
        subStepOf: 1,
      });
      checkStep({
        stepId: 4,
        title: 'step5',
        description: 'bat',
      });
    });

    it('is correctly saved when there are multiple nested sub step sequence', async () => {
      // (0, step1, foo) --> (4, step5, kat)
      //       |
      //       --> (1, step2, bar) --> (3, step4, bat)
      //                 |
      //                 --> (2, step3, bak)

      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step1',
          description: 'foo',
        }),
      );

      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceStartedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceStartedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'bak',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step4',
          description: 'bat',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step5',
          description: 'kat',
        }),
      );

      expect(executionLog.getFirstStepId()).toBe(0);
      expect(executionLog.getLastStepId()).toBe(4);

      checkStep({
        stepId: 0,
        title: 'step1',
        description: 'foo',
        hasSubSteps: true,
      });
      checkStep({
        stepId: 1,
        title: 'step2',
        description: 'bar',
        hasSubSteps: true,
        subStepOf: 0,
      });
      checkStep({
        stepId: 2,
        title: 'step3',
        description: 'bak',
        subStepOf: 1,
      });
      checkStep({
        stepId: 3,
        title: 'step4',
        description: 'bat',
        subStepOf: 0,
      });
      checkStep({
        stepId: 4,
        title: 'step5',
        description: 'kat',
      });
    });
  });

  describe('step sequence with option end steps', () => {
    it('is correctly saved', async () => {
      //                 /--> (0, optionA, 1, step2, bar1) --> (0, optionA, 2, step3, baz1)
      //                /
      // (0, step1, foo) ---> (1, optionB, 1, step2, bar2) --> (1, optionB, 2, step3, baz2)
      //                \
      //                 \--> (2, optionC, 1, step2, bar3) --> (2, optionC, 2, step3, baz3)

      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step1',
          description: 'foo',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogOptionSequenceStartedEvent({
          optionLabel: 'optionA',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar1',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'baz1',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogOptionSequenceStartedEvent({
          optionLabel: 'optionB',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar2',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'baz2',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogOptionSequenceStartedEvent({
          optionLabel: 'optionC',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step2',
          description: 'bar3',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogStepAddedEvent({
          title: 'step3',
          description: 'baz3',
        }),
      );
      await executionLog.handleEvent(
        new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
      );

      expect(executionLog.getFirstStepId()).toBe(0);
      expect(executionLog.getLastStepId()).toBe(0);

      checkStep({ stepId: 0, title: 'step1', description: 'foo' });

      checkStep({
        optionId: 0,
        stepId: 1,
        title: 'step2',
        description: 'bar1',
      });
      checkStep({
        optionId: 0,
        stepId: 2,
        title: 'step3',
        description: 'baz1',
      });

      checkStep({
        optionId: 1,
        stepId: 1,
        title: 'step2',
        description: 'bar2',
      });
      checkStep({
        optionId: 1,
        stepId: 2,
        title: 'step3',
        description: 'baz2',
      });

      checkStep({
        optionId: 2,
        stepId: 1,
        title: 'step2',
        description: 'bar3',
      });
      checkStep({
        optionId: 2,
        stepId: 2,
        title: 'step3',
        description: 'baz3',
      });
    });
  });
});
