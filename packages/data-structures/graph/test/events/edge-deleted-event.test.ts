import { EdgeDeletedEvent } from '../../src/events/edge-deleted-event';

describe('EdgeDeletedEvent', () => {
  const edgeId = 8;
  let edgeDeletedEvent: EdgeDeletedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    edgeDeletedEvent = new EdgeDeletedEvent({ edgeId });
  });

  describe('edgeId()', () => {
    it('returns specified edge id', () => {
      expect(edgeDeletedEvent.edgeId).toEqual(edgeId);
    });

    it('is read only', () => {
      expect(() => {
        // @ts-expect-error 'edge' is a read-only-property
        edgeDeletedEvent.edgeId = edgeId;
      }).toThrow(
        new TypeError(
          'Cannot set property edgeId of #<EdgeDeletedEvent> which has only a getter',
        ),
      );
    });
  });
});
