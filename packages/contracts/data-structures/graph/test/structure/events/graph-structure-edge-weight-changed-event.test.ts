import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureEdgeWeightChangedEvent } from '../../../src';

describe('GraphStructureEdgeWeightChangedEvent', () => {
  const edgeWeightChangedEvent = new GraphStructureEdgeWeightChangedEvent({
    edgeId: 3,
    newWeight: 7,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('newWeight()', () => {
    it('getter returns the specified newWeight value', () => {
      expect(edgeWeightChangedEvent.newWeight).toBe(7);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (edgeWeightChangedEvent.newWeight = 1)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property newWeight is forbidden`,
        }),
      );
    });
  });
});
