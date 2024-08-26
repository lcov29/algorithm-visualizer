import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightStyleClass,
} from '../../../../src';

describe('EdgeLabelHighlightAddedEvent', () => {
  const edgeId = 3;
  const highlightStyleClass: EdgeLabelHighlightStyleClass =
    'edgeLabelHighlightStyle1';
  const edgeLabelHighlightAddedEvent = new EdgeLabelHighlightAddedEvent({
    edgeId,
    highlightStyleClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass()', () => {
    it(`getter returns the specified highlightStyleClass value`, () => {
      expect(edgeLabelHighlightAddedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        edgeLabelHighlightAddedEvent.highlightStyleClass = highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
