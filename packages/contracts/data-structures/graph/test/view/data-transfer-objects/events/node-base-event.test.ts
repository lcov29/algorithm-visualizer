import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeBaseEvent } from '../../../../src/view/data-transfer-objects/events/node-base-event';

describe('NodeBaseEvent', () => {
  const nodeId = 3;
  // @ts-ignore instantiation of an abstract class
  const nodeBaseEvent = new NodeBaseEvent('node-base', { nodeId });

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
