import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightRemovedEvent } from '../../src/events';

describe('NodeHighlightRemovedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    let nodeHighlightRemovedEvent: NodeHighlightRemovedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeHighlightRemovedEvent = new NodeHighlightRemovedEvent(nodeId);
    });

    describe('getter nodeId()', () => {
      it('returns specified node id', () => {
        expect(nodeHighlightRemovedEvent.nodeId).toEqual(nodeId);
      });
    });

    describe('setter nodeId()', () => {
      it('throws an invalid operation error when trying to write to the node property', () => {
        expect(() => {
          nodeHighlightRemovedEvent.nodeId = 5;
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property nodeId is forbidden',
          }),
        );
      });
    });
  });
});
