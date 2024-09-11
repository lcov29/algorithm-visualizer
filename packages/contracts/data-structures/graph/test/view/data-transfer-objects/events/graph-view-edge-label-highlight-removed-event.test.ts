import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  EdgeLabelHighlightStyleClass,
  GraphViewEdgeLabelHighlightRemovedEvent,
} from '../../../../src';

describe('GraphViewEdgeLabelHighlightRemovedEvent', () => {
  const edgeId = 3;
  const highlightStyleClass: EdgeLabelHighlightStyleClass =
    'edgeLabelHighlightStyle1';
  const edgeLabelHighlightRemovedEvent =
    new GraphViewEdgeLabelHighlightRemovedEvent({
      edgeId,
      highlightStyleClass,
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass()', () => {
    it(`getter returns the specified highlightStyleClass value`, () => {
      expect(edgeLabelHighlightRemovedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeLabelHighlightRemovedEvent.highlightStyleClass =
          highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
