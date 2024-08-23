import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  NodeLabelHighlightRemovedEvent,
  NodeLabelHighlightStyleClass,
} from '../../../../src';

describe('NodeLabelHighlightRemovedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeLabelHighlightStyleClass =
    'nodeLabelHighlightStyle1';
  const nodeLabelHighlightRemovedEvent = new NodeLabelHighlightRemovedEvent({
    nodeId,
    highlightStyleClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['nodeId', nodeId],
    ['highlightStyleClass', highlightStyleClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(nodeLabelHighlightRemovedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        // @ts-expect-error invoke method by string name
        nodeLabelHighlightRemovedEvent[methodName] = expectedResult;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
