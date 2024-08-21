import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeHighlightRemovedEvent } from '../../src/events';

describe('EdgeHighlightRemovedEvent', () => {
  describe('edge()', () => {
    const edgeId = 3;
    let edgeHighlightRemovedEvent: EdgeHighlightRemovedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      edgeHighlightRemovedEvent = new EdgeHighlightRemovedEvent(edgeId);
    });

    describe('getter edgeId()', () => {
      it('returns specified edge id', () => {
        expect(edgeHighlightRemovedEvent.edgeId).toEqual(edgeId);
      });
    });

    describe('setter edgeId()', () => {
      it('throws an invalid operation error when trying to write to the edge property', () => {
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
});
