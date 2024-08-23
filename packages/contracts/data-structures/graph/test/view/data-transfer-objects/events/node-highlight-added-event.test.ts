import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightAddedEvent } from '../../../../src';

describe('NodeHighlightAddedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    const highlightStyleClass = 'nodeHighlightStyle1';
    const nodeHighlightAddedEvent = new NodeHighlightAddedEvent({
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
        expect(nodeHighlightAddedEvent[methodName]).toBe(expectedResult);
      });

      it('setter throws an invalid operation error', () => {
        expect(() => {
          // @ts-expect-error invoke method by string name
          nodeHighlightAddedEvent[methodName] = expectedResult;
        }).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      });
    });
  });
});
