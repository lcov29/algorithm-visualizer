import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHiddenEvent } from '../../../../src';

describe('NodeLabelHiddenEvent', () => {
  const nodeId = 3;
  const nodeLabelHiddenEvent = new NodeLabelHiddenEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeLabelHiddenEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelHiddenEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
