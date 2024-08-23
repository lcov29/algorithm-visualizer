import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeHighlightAddedEvent } from '../../../../src';

describe('EdgeHighlightAddedEvent', () => {
  describe('edge()', () => {
    const edgeId = 3;
    let edgeHighlightAddedEvent: EdgeHighlightAddedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      edgeHighlightAddedEvent = new EdgeHighlightAddedEvent(edgeId);
    });

    describe('getter edgeId()', () => {
      it('returns specified edge id', () => {
        expect(edgeHighlightAddedEvent.edgeId).toEqual(edgeId);
      });
    });

    describe('setter edgeId()', () => {
      it('throws an invalid operation error when trying to write to the edge property', () => {
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
});
