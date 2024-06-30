import { EdgeAddedEvent } from '../../src/events/edge-added-event';
import { IEdge } from '../../src/structure/edge-list';

describe('EdgeAddedEvent', () => {
  describe('edge()', () => {
    const edge: Omit<IEdge, 'id'> = { startNodeId: 1, endNodeId: 2 };
    let edgeAddedEvent: EdgeAddedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      edgeAddedEvent = new EdgeAddedEvent(edge);
    });

    it('returns edge object with specified property values', () => {
      expect(edgeAddedEvent.edge).toEqual(edge);
    });

    it('returns a clone of the specified edge object', () => {
      const clone = edgeAddedEvent.edge;
      clone.startNodeId = 8;
      expect(edgeAddedEvent.edge).not.toBe(edge);
      expect(edgeAddedEvent.edge).toEqual(edge);
    });

    it('is read only', () => {
      expect(() => {
        // @ts-expect-error 'edge' is a read-only-property
        edgeAddedEvent.edge = { idStartNode: 6, idEndNode: 8 };
      }).toThrow(
        new TypeError(
          'Cannot set property edge of #<EdgeAddedEvent> which has only a getter',
        ),
      );
    });
  });
});
