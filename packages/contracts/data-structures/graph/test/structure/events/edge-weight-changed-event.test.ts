import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeWeightChangedEvent } from '../../../src';

describe('EdgeWeightChangedEvent', () => {
  const edgeWeightChangedEvent = new EdgeWeightChangedEvent({
    edgeId: 3,
    newWeight: 7,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['edgeId', 3],
    ['newWeight', 7],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(edgeWeightChangedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      // @ts-expect-error invoke method by string name
      expect(() => (edgeWeightChangedEvent[methodName] = 1)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
