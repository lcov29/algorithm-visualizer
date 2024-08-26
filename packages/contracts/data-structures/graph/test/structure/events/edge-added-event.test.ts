import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeAddedEvent, IEdge } from '../../../src';

describe('EdgeAddedEvent', () => {
  describe('edge()', () => {
    const edge: Omit<IEdge, 'id'> = { startNodeId: 1, endNodeId: 2 };
    const edgeAddedEvent = new EdgeAddedEvent({ edge });

    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe('getter', () => {
      it('returns an edge object with the specified property values', () => {
        expect(edgeAddedEvent.edge).toEqual(edge);
      });

      it('returns a clone of the specified edge object', () => {
        const clone = edgeAddedEvent.edge;
        clone.startNodeId = 8;
        expect(edgeAddedEvent.edge).not.toBe(edge);
        expect(edgeAddedEvent.edge).toEqual(edge);
      });
    });

    describe('setter', () => {
      it('throws an invalid operation error when trying to write to the edge property', () => {
        expect(() => {
          edgeAddedEvent.edge = { startNodeId: 6, endNodeId: 8 };
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property edge is forbidden',
          }),
        );
      });
    });
  });
});
