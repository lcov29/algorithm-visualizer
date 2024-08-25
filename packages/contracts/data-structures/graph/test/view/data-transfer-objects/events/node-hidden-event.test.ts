import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHiddenEvent } from '../../../../src';

describe('NodeHiddenEvent', () => {
  const nodeId = 3;
  const nodeHiddenEvent = new NodeHiddenEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeHiddenEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeHiddenEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
