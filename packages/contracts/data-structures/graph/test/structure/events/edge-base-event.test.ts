import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeBaseEvent } from '../../../src/structure/events/edge-base-event';

describe('EdgeBaseEvent', () => {
  describe('edge()', () => {
    const edgeId = 3;
    // @ts-ignore instantiation of an abstract class
    const edgeBaseEvent = new EdgeBaseEvent('edge-base', { edgeId });

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
});
