import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelDisplayedEvent } from '../../../../src';

describe('EdgeLabelDisplayedEvent', () => {
  const edgeId = 3;
  const edgeLabelDisplayedEvent = new EdgeLabelDisplayedEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeLabelDisplayedEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeLabelDisplayedEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
