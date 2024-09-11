import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphViewNodeBaseEvent } from '../../../../src/view/data-transfer-objects/events/graph-view-node-base-event';

describe('GraphViewNodeBaseEvent', () => {
  const nodeId = 3;
  // @ts-ignore instantiation of an abstract class
  const nodeBaseEvent = new GraphViewNodeBaseEvent('graph-view-node-base', {
    nodeId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(nodeBaseEvent.nodeId).toBe(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeBaseEvent.nodeId = nodeId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
