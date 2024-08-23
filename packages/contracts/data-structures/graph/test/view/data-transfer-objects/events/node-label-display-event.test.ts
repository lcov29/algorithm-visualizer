import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelDisplayEvent } from '../../../../src';

describe('NodeLabelDisplayEvent', () => {
  const nodeId = 3;
  const nodeLabelDisplayEvent = new NodeLabelDisplayEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeLabelDisplayEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelDisplayEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
