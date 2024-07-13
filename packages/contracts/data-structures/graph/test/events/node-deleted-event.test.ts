import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeDeletedEvent } from '../../src/events/node-deleted-event';

describe('NodeDeletedEvent', () => {
  const nodeId = 5;
  let nodeDeletedEvent: NodeDeletedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeDeletedEvent = new NodeDeletedEvent({ nodeId });
  });

  describe('getter nodeId()', () => {
    it('returns specified node', () => {
      expect(nodeDeletedEvent.nodeId).toEqual(nodeId);
    });
  });

  describe('setter nodeId()', () => {
    it('throws an invalid operation error when trying to write to the nodeId property', () => {
      expect(() => {
        nodeDeletedEvent.nodeId = nodeId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
