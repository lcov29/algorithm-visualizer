import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeDeletedEvent } from '../../src/events';

describe('EdgeDeletedEvent', () => {
  const edgeId = 8;
  let edgeDeletedEvent: EdgeDeletedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    edgeDeletedEvent = new EdgeDeletedEvent({ edgeId });
  });

  describe('getter edgeId()', () => {
    it('returns specified edge id', () => {
      expect(edgeDeletedEvent.edgeId).toEqual(edgeId);
    });
  });

  describe('setter edgeId()', () => {
    it('throws an invalid operation error when trying to write to the edge property', () => {
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
