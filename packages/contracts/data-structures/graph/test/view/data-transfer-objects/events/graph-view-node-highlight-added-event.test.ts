import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphViewNodeHighlightAddedEvent } from '../../../../src';

describe('GraphViewNodeHighlightAddedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass = 'nodeHighlightStyle1';
  const nodeHighlightAddedEvent = new GraphViewNodeHighlightAddedEvent({
    nodeId,
    highlightStyleClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass()', () => {
    it(`getter returns the specified highlightStyleClass value`, () => {
      expect(nodeHighlightAddedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeHighlightAddedEvent.highlightStyleClass = highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
