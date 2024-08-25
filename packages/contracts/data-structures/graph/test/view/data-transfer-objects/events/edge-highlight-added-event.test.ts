import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeHighlightAddedEvent } from '../../../../src';

describe('EdgeHighlightAddedEvent', () => {
  const edgeId = 3;
  const edgeHighlightAddedEvent = new EdgeHighlightAddedEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeHighlightAddedEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeHighlightAddedEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
