import {
  AlgorithmExecutionLogEvent,
  AlgorithmExecutionLogOptionSequenceEndedEvent,
  AlgorithmExecutionLogOptionSequenceStartedEvent,
  AlgorithmExecutionLogStep,
  AlgorithmExecutionLogStepAddedEvent,
  AlgorithmExecutionLogSubStepSequenceEndedEvent,
  AlgorithmExecutionLogSubStepSequenceStartedEvent,
  IAlgorithmExecutionLogStepId,
} from '@algorithm-visualizer/algorithm-execution-log-contract';
import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import { IStack } from '@algorithm-visualizer/stack-contract';
import { TableViewCellHighlightAddedEvent } from '@algorithm-visualizer/table-contract';

import { AlgorithmExecutionLog } from '../src/algorithm-execution-log';

const mockAdd = jest.fn();
const mockHandle = jest.fn();
const mockPush = jest.fn();
const mockPop = jest.fn();
const mockTop = jest.fn();
const mockIsEmpty = jest.fn();

const mockEventHandlerChain: IEventHandlerChain<AlgorithmExecutionLogEvent> = {
  add: mockAdd,
  handle: mockHandle,
};

const mockStack = {
  push: mockPush,
  pop: mockPop,
  top: mockTop,
  isEmpty: mockIsEmpty,
} as Partial<
  IStack<IAlgorithmExecutionLogStepId>
> as IStack<IAlgorithmExecutionLogStepId>;

describe('AlgorithmExecutionLog', () => {
  let executionLog: AlgorithmExecutionLog;

  beforeEach(() => {
    jest.resetAllMocks();
    mockAdd.mockReturnValue(mockEventHandlerChain);
    executionLog = new AlgorithmExecutionLog({
      eventHandlerChain: mockEventHandlerChain,
      sequenceRootStack: mockStack,
    });
  });

  describe('getFirstStepId()', () => {
    it('returns 0', () => {
      expect(executionLog.getFirstStepId()).toBe(0);
    });
  });

  describe('getLastStepId()', () => {
    it('returns 0 when there are no logged steps yet', () => {
      expect(executionLog.getLastStepId()).toBe(0);
    });

    it('returns the id of the last step when neither a sub step nor an option', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
        }),
        new AlgorithmExecutionLogStep({
          id: 1,
          title: 'title-step-1',
          description: 'description-step-1',
        }),
      ];
      expect(executionLog.getLastStepId()).toBe(1);
    });

    it('returns the id of the last step when it is a sub step', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
          hasSubSteps: true,
        }),
        new AlgorithmExecutionLogStep({
          id: 1,
          title: 'title-sub-step-1',
          description: 'description-sub-step-1',
          subStepOf: 0,
        }),
      ];
      expect(executionLog.getLastStepId()).toBe(1);
    });

    it('returns the id of the last non-option step when it has specified options', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
        }),
        new AlgorithmExecutionLogStep({
          id: 1,
          title: 'title-step-1',
          description: 'description-step-1',
          options: [
            {
              id: 1,
              label: 'OptionA',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 2,
                  title: 'title-step-2',
                  description: 'description-step-2',
                }),
              ],
            },
            {
              id: 2,
              label: 'OptionB',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 2,
                  title: 'title-step-2',
                  description: 'description-step-2',
                }),
              ],
            },
          ],
        }),
      ];
      expect(executionLog.getLastStepId()).toBe(1);
    });
  });

  describe('getStep()', () => {
    it('returns null if there are no logged steps', () => {
      expect(executionLog.getStep({ stepId: 0 })).toBeNull();
    });

    it('returns null if there are logged steps but none with the specified step id', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
          options: [
            {
              id: 0,
              label: 'OptionA',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 1,
                  title: 'title-step-1',
                  description: 'description-step-1',
                }),
              ],
            },
          ],
        }),
      ];
      expect(executionLog.getStep({ stepId: 0, optionId: 1 })).toBeNull();
    });

    it('returns null if no option with the specified optionId exists', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
          options: [
            {
              id: 0,
              label: 'Option-A',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 1,
                  title: 'title-step-1',
                  description: 'description-step-1',
                }),
              ],
            },
          ],
        }),
      ];
      expect(executionLog.getStep({ optionId: 2, stepId: 1 })).toBeNull();
    });

    it('returns null if the specified optionId has no step with the specified stepId', () => {
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
          options: [
            {
              id: 0,
              label: 'Option-A',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 1,
                  title: 'title-step-1',
                  description: 'description-step-1',
                }),
              ],
            },
          ],
        }),
      ];
      expect(executionLog.getStep({ optionId: 0, stepId: 2 })).toBeNull();
    });

    it('returns the step with the specified id', () => {
      const step = new AlgorithmExecutionLogStep({
        id: 0,
        title: 'title-step-0',
        description: 'description-step-0',
        hasSubSteps: true,
      });
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [step];
      expect(executionLog.getStep({ stepId: 0 })).toBe(step);
    });

    it('returns the step with the specified id of the option with the specified id', () => {
      const optionStep1 = new AlgorithmExecutionLogStep({
        id: 1,
        title: 'title-option-0-step-1',
        description: 'description-option-0-step-1',
      });
      // @ts-expect-error access a private property
      executionLog._loggedExecutionSteps = [
        new AlgorithmExecutionLogStep({
          id: 0,
          title: 'title-step-0',
          description: 'description-step-0',
          options: [
            {
              id: 0,
              label: 'Option-A',
              steps: [
                optionStep1,
                new AlgorithmExecutionLogStep({
                  id: 2,
                  title: 'title-option-0-step-2',
                  description: 'description-option-0-step-2',
                }),
              ],
            },
            {
              id: 1,
              label: 'Option-B',
              steps: [
                new AlgorithmExecutionLogStep({
                  id: 1,
                  title: 'title-option-1-step-1',
                  description: 'description-option-1-step-1',
                }),
              ],
            },
          ],
        }),
      ];
      expect(executionLog.getStep({ optionId: 0, stepId: 1 })).toBe(
        optionStep1,
      );
    });
  });

  describe('handleEvent()', () => {
    it('handles AlgorithmExecutionLog events', async () => {
      const event = new AlgorithmExecutionLogStepAddedEvent({
        title: 'foo',
        description: 'bar',
      });
      await executionLog.handleEvent(event);
      expect(mockHandle).toHaveBeenCalledTimes(1);
      expect(mockHandle).toHaveBeenCalledWith(event);
    });

    it('does not handle non AlgorithmExecutionLog events', async () => {
      await executionLog.handleEvent(
        new TableViewCellHighlightAddedEvent({
          rowId: 0,
          columnId: 2,
          highlightClass: 'tableCellHighlightStyle1',
        }),
      );
      expect(mockHandle).not.toHaveBeenCalled();
    });

    describe('_handleOptionSequenceEndedEvent()', () => {
      it('returns false when the event is not an AlgorithmExecutionLogOptionSequenceEndedEvent', async () => {
        // @ts-expect-error invoke a private method
        const result = await executionLog._handleOptionSequenceEndedEvent(
          new AlgorithmExecutionLogStepAddedEvent({
            title: 'foo',
            description: 'bar',
          }),
        );
        expect(result).toBe(false);
      });

      it('handles the passed AlgorithmExecutionLogOptionSequenceEnded event', async () => {
        // @ts-expect-error invoke a private method
        const result = await executionLog._handleOptionSequenceEndedEvent(
          new AlgorithmExecutionLogOptionSequenceEndedEvent(),
        );
        expect(mockPop).toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });

    describe('_handleOptionSequenceStartedEvent()', () => {
      it('returns false when the event is not an AlgorithmExecutionLogOptionSequenceEndedEvent', async () => {
        // @ts-expect-error invoke a private method
        const result = await executionLog._handleOptionSequenceStartedEvent(
          new AlgorithmExecutionLogStepAddedEvent({
            title: 'foo',
            description: 'bar',
          }),
        );
        expect(result).toBe(false);
      });

      it('returns false when the event is not an AlgorithmExecutionLogOptionSequenceStartedEvent', async () => {
        // @ts-expect-error invoke a private method
        const result = await executionLog._handleOptionSequenceStartedEvent(
          new AlgorithmExecutionLogStepAddedEvent({
            title: 'foo',
            description: 'bar',
          }),
        );
        expect(result).toBe(false);
      });

      it('handles the passed AlgorithmExecutionLogOptionSequenceStarted event', async () => {
        // @ts-expect-error access a private property
        executionLog._loggedExecutionSteps = [
          new AlgorithmExecutionLogStep({
            id: 0,
            title: 'foo',
            description: 'bar',
          }),
        ];

        // @ts-expect-error invoke a private method
        const result = await executionLog._handleOptionSequenceStartedEvent(
          new AlgorithmExecutionLogOptionSequenceStartedEvent({
            optionLabel: 'Option A',
          }),
        );
        expect(mockPush).toHaveBeenCalledWith({ stepId: 0, optionId: 0 });

        // @ts-expect-error access a private property
        expect(executionLog._loggedExecutionSteps).toEqual([
          new AlgorithmExecutionLogStep({
            id: 0,
            title: 'foo',
            description: 'bar',
            options: [{ id: 0, label: 'Option A', steps: [] }],
          }),
        ]);
        // @ts-expect-error access a private property
        expect(executionLog._nextAvailableOptionStepId).toBe(1);
        expect(result).toBe(true);
      });
    });

    describe('_handleStepAddedEvent()', () => {
      it('returns false when the event is not an AlgorithmExecutionLogStepAddedEvent', async () => {
        // @ts-expect-error invoke a private method
        const result = await executionLog._handleStepAddedEvent(
          new AlgorithmExecutionLogOptionSequenceEndedEvent(),
        );
        expect(result).toBe(false);
      });

      describe('when the passed AlgorithmExecutionLogStepAddedEvent is a normal step', () => {
        it('adds the event to the step list', async () => {
          mockTop.mockReturnValue(null);
          mockIsEmpty.mockReturnValue(true);
          // @ts-expect-error invoke a private method
          const result = await executionLog._handleStepAddedEvent(
            new AlgorithmExecutionLogStepAddedEvent({
              title: 'foo',
              description: 'bar',
            }),
          );
          // @ts-expect-error access a private property
          expect(executionLog._loggedExecutionSteps).toEqual([
            new AlgorithmExecutionLogStep({
              id: 0,
              title: 'foo',
              description: 'bar',
            }),
          ]);
          expect(result).toBe(true);
        });
      });

      describe('when the passed AlgorithmExecutionLogStepAddedEvent is a sub step', () => {
        it('adds the event to the step list', async () => {
          // @ts-expect-error access a private property
          executionLog._nextAvailableStepId = 1;

          // @ts-expect-error access a private property
          executionLog._loggedExecutionSteps = [
            new AlgorithmExecutionLogStep({
              id: 0,
              title: 'foo',
              description: 'bar',
            }),
          ];
          mockTop.mockReturnValue({ stepId: 0 });
          mockIsEmpty.mockReturnValue(false);

          // @ts-expect-error invoke a private method
          await executionLog._handleStepAddedEvent(
            new AlgorithmExecutionLogStepAddedEvent({
              title: 'newTitle',
              description: 'newDescription',
            }),
          );

          // @ts-expect-error access a private property
          expect(executionLog._loggedExecutionSteps).toEqual([
            new AlgorithmExecutionLogStep({
              id: 0,
              title: 'foo',
              description: 'bar',
              hasSubSteps: true,
            }),
            new AlgorithmExecutionLogStep({
              id: 1,
              title: 'newTitle',
              description: 'newDescription',
              subStepOf: 0,
            }),
          ]);
        });
      });

      describe('when the passed AlgorithmExecutionLogStepAddedEvent is an option', () => {
        it('adds the event to the option list of the last step', async () => {
          // @ts-expect-error access a private property
          executionLog._nextAvailableStepId = 1;

          // @ts-expect-error access a private property
          executionLog._nextAvailableOptionStepId = 1;

          // @ts-expect-error access a private property
          executionLog._loggedExecutionSteps = [
            new AlgorithmExecutionLogStep({
              id: 0,
              title: 'foo',
              description: 'bar',
              options: [{ id: 0, label: 'option-A', steps: [] }],
            }),
          ];

          mockTop.mockReturnValue({ stepId: 0, optionId: 0 });
          mockIsEmpty.mockReturnValue(false);

          // @ts-expect-error invoke a private method
          await executionLog._handleStepAddedEvent(
            new AlgorithmExecutionLogStepAddedEvent({
              title: 'newTitle',
              description: 'newDescription',
            }),
          );

          // @ts-expect-error access a private property
          expect(executionLog._loggedExecutionSteps).toEqual([
            new AlgorithmExecutionLogStep({
              id: 0,
              title: 'foo',
              description: 'bar',
              options: [
                {
                  id: 0,
                  label: 'option-A',
                  steps: [
                    new AlgorithmExecutionLogStep({
                      id: 1,
                      title: 'newTitle',
                      description: 'newDescription',
                    }),
                  ],
                },
              ],
            }),
          ]);
        });
      });

      describe('_handleSubStepSequenceEndedEvent()', () => {
        it('returns false when the event is not an AlgorithmExecutionSubStepSequenceEndedEvent', async () => {
          // @ts-expect-error invoke a private method
          const result = await executionLog._handleSubStepSequenceEndedEvent(
            new AlgorithmExecutionLogOptionSequenceEndedEvent(),
          );
          expect(result).toBe(false);
        });

        it('handles the passed AlgorithmExecutionSubStepSequenceEndedEvent event', async () => {
          // @ts-expect-error invoke a private method
          const result = await executionLog._handleSubStepSequenceEndedEvent(
            new AlgorithmExecutionLogSubStepSequenceEndedEvent(),
          );
          expect(mockPop).toHaveBeenCalled();
          expect(result).toBe(true);
        });
      });

      describe('_handleSubStepSequenceStartedEvent()', () => {
        it('returns false when the event is not an AlgorithmExecutionSubStepSequenceStartedEvent', async () => {
          // @ts-expect-error invoke a private method
          const result = await executionLog._handleSubStepSequenceStartedEvent(
            new AlgorithmExecutionLogOptionSequenceEndedEvent(),
          );
          expect(result).toBe(false);
        });

        it('returns false when the event is not an AlgorithmExecutionSubStepSequenceStartedEvent', async () => {
          // @ts-expect-error invoke a private method
          const result = await executionLog._handleSubStepSequenceStartedEvent(
            new AlgorithmExecutionLogSubStepSequenceStartedEvent(),
          );
          expect(mockPush).toHaveBeenCalledWith({ stepId: 0 });
          expect(result).toBe(true);
        });
      });
    });
  });
});
