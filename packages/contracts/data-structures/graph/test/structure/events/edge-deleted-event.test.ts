import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeDeletedEvent } from '../../../src';

describe('EdgeDeletedEvent', () => {
  const edgeId = 8;
  const edgeDeletedEvent = new EdgeDeletedEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeDeletedEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeDeletedEvent.edgeId = edgeId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
