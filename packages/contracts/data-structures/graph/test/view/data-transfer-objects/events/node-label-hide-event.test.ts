import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHideEvent } from '../../../../src';

describe('NodeLabelHideEvent', () => {
  const nodeId = 3;
  const nodeLabelHideEvent = new NodeLabelHideEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns the specified nodeId value', () => {
      expect(nodeLabelHideEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelHideEvent.nodeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
