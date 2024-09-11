import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewNodeLabelHighlightRemovedEvent,
  NodeLabelHighlightStyleClass,
} from '../../../../src';

describe('GraphViewNodeLabelHighlightRemovedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeLabelHighlightStyleClass =
    'nodeLabelHighlightStyle1';
  const nodeLabelHighlightRemovedEvent =
    new GraphViewNodeLabelHighlightRemovedEvent({
      nodeId,
      highlightStyleClass,
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass', () => {
    it(`getter returns the specified highlightStyleClass value`, () => {
      expect(nodeLabelHighlightRemovedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeLabelHighlightRemovedEvent.highlightStyleClass =
          highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
