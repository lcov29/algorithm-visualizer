import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphViewNodeHighlightRemovedEvent,
  NodeHighlightStyleClass,
} from '../../../../src';

describe('GraphViewNodeHighlightRemovedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeHighlightStyleClass = 'nodeHighlightStyle1';
  const nodeHighlightRemovedEvent = new GraphViewNodeHighlightRemovedEvent({
    nodeId,
    highlightStyleClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('highlightStyleClass()', () => {
    it('getter returns the specified highlightStyleClass value', () => {
      expect(nodeHighlightRemovedEvent.highlightStyleClass).toBe(
        highlightStyleClass,
      );
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        nodeHighlightRemovedEvent.highlightStyleClass = highlightStyleClass;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property highlightStyleClass is forbidden`,
        }),
      );
    });
  });
});
