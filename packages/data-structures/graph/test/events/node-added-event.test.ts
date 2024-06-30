import { NodeAddedEvent } from '../../src/events/node-added-event';
import { INode } from '../../src/structure/node-list';

describe('NodeAddedEvent', () => {
  describe('node()', () => {
    const node: Omit<INode, 'id'> = { label: 'NodeA' };
    let nodeAddedEvent: NodeAddedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeAddedEvent = new NodeAddedEvent(node);
    });

    it('returns node object with specified property values', () => {
      expect(nodeAddedEvent.node).toEqual(node);
    });

    it('returns a clone of the specified node object', () => {
      const clone = nodeAddedEvent.node;
      clone.label = 'modifiedLabel';
      expect(nodeAddedEvent.node).not.toBe(node);
      expect(nodeAddedEvent.node).toEqual(node);
    });

    it('is read only', () => {
      expect(() => {
        // @ts-expect-error 'node' is a read-only-property
        nodeAddedEvent.node = { label: 'modifiedLabel' };
      }).toThrow(
        new TypeError(
          'Cannot set property node of #<NodeAddedEvent> which has only a getter',
        ),
      );
    });
  });
});
