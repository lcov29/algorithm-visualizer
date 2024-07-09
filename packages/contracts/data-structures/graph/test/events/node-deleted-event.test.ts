import { NodeDeletedEvent } from '../../src/events/node-deleted-event';

describe('NodeDeletedEvent', () => {
  const nodeId = 5;
  let nodeDeletedEvent: NodeDeletedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeDeletedEvent = new NodeDeletedEvent({ nodeId });
  });

  describe('nodeId()', () => {
    it('returns specified node', () => {
      expect(nodeDeletedEvent.nodeId).toEqual(nodeId);
    });

    it('is read only', () => {
      expect(() => {
        // @ts-expect-error 'nodeId' is a read-only-property
        nodeDeletedEvent.nodeId = nodeId;
      }).toThrow(
        new TypeError(
          'Cannot set property nodeId of #<NodeDeletedEvent> which has only a getter',
        ),
      );
    });
  });
});
