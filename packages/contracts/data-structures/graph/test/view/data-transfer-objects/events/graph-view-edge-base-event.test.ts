import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphViewEdgeBaseEvent } from '../../../../src/view/data-transfer-objects/events/graph-view-edge-base-event';

describe('GraphViewEdgeBaseEvent', () => {
  const edgeId = 3;
  // @ts-expect-error instantiation of an abstract class
  const edgeBaseEvent = new GraphViewEdgeBaseEvent('edge-base', { edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeBaseEvent.edgeId).toBe(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeBaseEvent.edgeId = edgeId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
