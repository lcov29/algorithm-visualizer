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

  describe.each([
    ['edgeId', edgeId],
    ['highlightStyleClass', highlightStyleClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(edgeLabelHighlightAddedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        // @ts-expect-error invoke method by string name
        edgeLabelHighlightAddedEvent[methodName] = expectedResult;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
