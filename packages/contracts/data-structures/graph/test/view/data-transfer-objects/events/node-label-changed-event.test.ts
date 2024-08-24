import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelChangedEvent } from '../../../../src';

describe('NodeLabelChangedEvent', () => {
  const nodeId = 3;
  const label = 'foo';
  const edgeLabelChangedEvent = new NodeLabelChangedEvent({
    nodeId,
    label,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['nodeId', nodeId],
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
