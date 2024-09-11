import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewNodeLabelHighlightAddedEvent,
  NodeLabelHighlightStyleClass,
} from '../../../../src';

describe('GraphViewNodeLabelHighlightAddedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeLabelHighlightStyleClass =
    'nodeLabelHighlightStyle1';
  const nodeLabelHighlightAddedEvent =
    new GraphViewNodeLabelHighlightAddedEvent({
      nodeId,
      highlightStyleClass,
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass()', () => {
    it(`getter returns the specified highlightStyleClass value`, () => {
      expect(nodeLabelHighlightAddedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelHighlightAddedEvent.highlightStyleClass = highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
