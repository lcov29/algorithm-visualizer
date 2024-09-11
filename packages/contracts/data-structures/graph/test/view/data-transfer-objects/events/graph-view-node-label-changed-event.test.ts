import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphViewNodeLabelChangedEvent } from '../../../../src';

describe('GraphViewNodeLabelChangedEvent', () => {
  const nodeId = 3;
  const label = 'foo';
  const edgeLabelChangedEvent = new GraphViewNodeLabelChangedEvent({
    nodeId,
    label,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('label()', () => {
    it(`getter returns the specified label value`, () => {
      expect(edgeLabelChangedEvent.label).toBe(label);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeLabelChangedEvent.label = label;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property label is forbidden`,
        }),
      );
    });
  });
});
