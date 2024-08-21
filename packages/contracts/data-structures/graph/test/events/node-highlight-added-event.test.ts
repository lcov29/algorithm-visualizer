import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightAddedEvent } from '../../src/events';

describe('NodeHighlightAddedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    let nodeHighlightAddedEvent: NodeHighlightAddedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeHighlightAddedEvent = new NodeHighlightAddedEvent(nodeId);
    });

    describe('getter nodeId()', () => {
      it('returns specified node id', () => {
        expect(nodeHighlightAddedEvent.nodeId).toEqual(nodeId);
      });
    });

    describe('setter nodeId()', () => {
      it('throws an invalid operation error when trying to write to the node property', () => {
        expect(() => {
          nodeHighlightAddedEvent.nodeId = 5;
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property nodeId is forbidden',
          }),
        );
      });
    });
  });
});
