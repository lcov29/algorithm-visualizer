import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureEdgeBaseEvent } from '../../../src/structure/events/graph-structure-edge-base-event';

describe('GraphStructureEdgeBaseEvent', () => {
  const edgeId = 3;
  // @ts-ignore instantiation of an abstract class
  const edgeBaseEvent = new GraphStructureEdgeBaseEvent('edge-base', {
    edgeId,
  });

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
