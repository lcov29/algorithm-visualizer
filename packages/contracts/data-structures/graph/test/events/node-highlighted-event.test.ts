import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightedEvent } from '../../src/events';

describe('NodeHighlightedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    let nodeAddedEvent: NodeHighlightedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeAddedEvent = new NodeHighlightedEvent(nodeId);
    });

    describe('getter nodeId()', () => {
      it('returns specified node id', () => {
        expect(nodeAddedEvent.nodeId).toEqual(nodeId);
      });
    });

    describe('setter nodeId()', () => {
      it('throws an invalid operation error when trying to write to the node property', () => {
        expect(() => {
          nodeAddedEvent.nodeId = 5;
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property nodeId is forbidden',
          }),
        );
      });
    });
  });
});
