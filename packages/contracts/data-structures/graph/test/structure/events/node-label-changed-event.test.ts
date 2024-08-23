import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelChangedEvent } from '../../../src';

describe('NodeLabelChangedEvent', () => {
  const nodeLabelChangedEvent = new NodeLabelChangedEvent({
    nodeId: 3,
    label: 'newLabel',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['nodeId', 3],
    ['label', 'newLabel'],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(nodeLabelChangedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (nodeLabelChangedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
