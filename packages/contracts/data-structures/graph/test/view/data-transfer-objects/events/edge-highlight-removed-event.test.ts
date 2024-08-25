import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeHighlightRemovedEvent } from '../../../../src';

describe('EdgeHighlightRemovedEvent', () => {
  const edgeId = 3;
  const edgeHighlightRemovedEvent = new EdgeHighlightRemovedEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeHighlightRemovedEvent.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeHighlightRemovedEvent.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
