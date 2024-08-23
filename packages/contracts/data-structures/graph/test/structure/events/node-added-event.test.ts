import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { INode, NodeAddedEvent } from '../../../src';

describe('NodeAddedEvent', () => {
  describe('node()', () => {
    const node: Omit<INode, 'id'> = { label: 'NodeA' };
    const nodeAddedEvent = new NodeAddedEvent(node);

    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe('getter', () => {
      it('returns node object with specified property values', () => {
        expect(nodeAddedEvent.node).toEqual(node);
      });

      it('returns a clone of the specified node object', () => {
        const clone = nodeAddedEvent.node;
        clone.label = 'modifiedLabel';
        expect(nodeAddedEvent.node).not.toBe(node);
        expect(nodeAddedEvent.node).toEqual(node);
      });
    });

    describe('setter', () => {
      it('throws an invalid operation error when trying to write to the node property', () => {
        expect(() => {
          nodeAddedEvent.node = { label: 'modifiedLabel' };
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property node is forbidden',
          }),
        );
      });
    });
  });
});
