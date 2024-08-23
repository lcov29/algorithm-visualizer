import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeWeightChangedEvent } from '../../../src';

describe('EdgeWeightChangedEvent', () => {
  const edgeWeightChangedEvent = new EdgeWeightChangedEvent({
    edgeId: 3,
    newWeight: 7,
  });

  describe('getter methods', () => {
    it.each([
      ['edgeId', 3],
      ['newWeight', 7],
    ])('%s() returns specified value', (methodName, expectedValue) => {
      // @ts-expect-error reference to a method by its string name
      expect(edgeWeightChangedEvent[methodName]).toBe(expectedValue);
    });
  });

  describe('setter methods', () => {
    it.each([['edgeId'], ['newWeight']])(
      'throws an invalid operation error when trying to write to the %s property',
      methodName => {
        // @ts-expect-error reference to a method by its string name
        expect(() => (edgeWeightChangedEvent[methodName] = 1)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      },
    );
  });
});
