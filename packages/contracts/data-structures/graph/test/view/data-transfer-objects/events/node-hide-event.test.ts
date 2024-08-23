import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHideEvent } from '../../../../src';

describe('NodeHideEvent', () => {
  const nodeId = 3;
  const nodeDisplayEvent = new NodeHideEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeDisplayEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeDisplayEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
