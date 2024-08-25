import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeHiddenEvent } from '../../../../src';

describe('EdgeHiddenEvent', () => {
  const edgeId = 3;
  const edgeHiddenEvent = new EdgeHiddenEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeHiddenEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeHiddenEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
