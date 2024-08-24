import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelChangedEvent } from '../../../../src';

describe('EdgeLabelChangedEvent', () => {
  const edgeId = 3;
  const label = 'foo';
  const edgeLabelChangedEvent = new EdgeLabelChangedEvent({
    edgeId,
    label,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['edgeId', edgeId],
    ['label', label],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(edgeLabelChangedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        // @ts-expect-error invoke method by string name
        edgeLabelChangedEvent[methodName] = expectedResult;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
