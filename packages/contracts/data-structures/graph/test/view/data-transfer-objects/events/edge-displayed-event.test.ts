import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeDisplayedEvent } from '../../../../src';

describe('EdgeDisplayedEvent', () => {
  const edgeId = 3;
  const edgeDisplayedEvent = new EdgeDisplayedEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeDisplayedEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeDisplayedEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
