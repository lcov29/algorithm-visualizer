import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelDisplayEvent } from '../../../../src';

describe('EdgeLabelDisplayEvent', () => {
  const edgeId = 3;
  const edgeHideEvent = new EdgeLabelDisplayEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeHideEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeHideEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
