import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import {
  AlgorithmExecutionLogStep,
  IAlgorithmExecutionLogStepOption,
} from '../src/data-transfer-objects/algorithm-execution-log-step';

class MockEvent extends BaseEvent<string> {
  constructor(name: string) {
    super(name);
  }
}

function getAlgorithmExecutionLogStep(
  args: Partial<{
    id: number;
    title: string;
    description: string;
    viewEvents: BaseEvent<string>[];
    options: IAlgorithmExecutionLogStepOption[];
    subStepOf: number;
    hasSubSteps: boolean;
  }> = {},
) {
  return new AlgorithmExecutionLogStep({
    id: 1,
    title: 'title',
    description: 'description',
    viewEvents: [],
    ...args,
  });
}

describe('AlgorithmExecutionLogStep', () => {
  let step: AlgorithmExecutionLogStep;
  const mockEvent = new MockEvent('mock-event-name');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['id', { id: 4 }, 4],
    ['title', { title: 'foo' }, 'foo'],
    ['description', { description: 'bar' }, 'bar'],
    ['viewEvents', { viewEvents: [mockEvent] }, [mockEvent]],
    [
      'options',
      { options: [{ id: 1, label: 'A', steps: [] }] },
      [{ id: 1, label: 'A', steps: [] }],
    ],
    ['subStepOf', { subStepOf: 4 }, 4],
    ['hasSubSteps', { hasSubSteps: true }, true],
  ])('%s()', (methodName, args, expectedResult) => {
    beforeEach(() => {
      step = getAlgorithmExecutionLogStep(args);
    });

    describe('getter', () => {
      it(`returns the specified ${methodName} value`, () => {
        // @ts-expect-error invoke method by string name
        expect(step[methodName]).toEqual(expectedResult);
      });

      if (methodName === 'viewEvents') {
        it(`returns a clone of the specified ${methodName} list`, () => {
          const list = step.viewEvents;
          const newElement = {} as BaseEvent<string>;
          list.push(newElement);
          list.push(newElement);
          expect(step.viewEvents).toEqual(expectedResult);
        });
      }
    });

    describe('setter', () => {
      it('throws an invalid operation error', () => {
        expect(() => {
          // @ts-expect-error invoke method by string name
          step[methodName] = expectedResult;
        }).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      });
    });
  });
});
