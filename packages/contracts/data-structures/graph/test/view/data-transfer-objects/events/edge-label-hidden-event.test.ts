import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { EdgeLabelHiddenEvent } from '../../../../src';

describe('EdgeLabelHiddenEvent', () => {
  const edgeId = 3;
  const edgeLabelHidden = new EdgeLabelHiddenEvent({ edgeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('edgeId()', () => {
    it('getter returns the specified edgeId value', () => {
      expect(edgeLabelHidden.edgeId).toEqual(edgeId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeLabelHidden.edgeId = 5;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property edgeId is forbidden',
        }),
      );
    });
  });
});
