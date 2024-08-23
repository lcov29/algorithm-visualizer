import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelHideEvent } from '../../../../src';

describe('EdgeLabelHideEvent', () => {
  const edgeId = 3;
  const edgeHideEvent = new EdgeLabelHideEvent({ edgeId });

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
