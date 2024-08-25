import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelDisplayedEvent } from '../../../../src';

describe('NodeLabelDisplayedEvent', () => {
  const nodeId = 3;
  const nodeLabelDisplayedEvent = new NodeLabelDisplayedEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeLabelDisplayedEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelDisplayedEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
