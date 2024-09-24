import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { AlgorithmExecutionLogStepAddedEvent } from '../../src/data-transfer-objects';

class MockEvent extends BaseEvent<'mock-event'> {
  constructor() {
    super('mock-event');
  }
}

function buildAlgorithmExecutionLogStepAddedEvent(
  args: Partial<{
    title: string;
    description: string;
    viewEvents: BaseEvent<string>[];
  }> = {},
) {
  return new AlgorithmExecutionLogStepAddedEvent({
    title: 'title',
    description: 'description',
    viewEvents: [],
    ...args,
  });
}

describe('AlgorithmExecutionLogStepAddedEvent', () => {
  let stepAddedEvent: AlgorithmExecutionLogStepAddedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['title', { title: 'foo' }, 'foo'],
    ['description', { description: 'bar' }, 'bar'],
    ['viewEvents', { viewEvents: [new MockEvent()] }, [new MockEvent()]],
  ])('%s()', (methodName, args, expectedResult) => {
    beforeEach(() => {
      stepAddedEvent = buildAlgorithmExecutionLogStepAddedEvent(args);
    });

    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(stepAddedEvent[methodName]).toEqual(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      // @ts-expect-error invoke method by string name
      expect(() => (stepAddedEvent[methodName] = expectedResult)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
