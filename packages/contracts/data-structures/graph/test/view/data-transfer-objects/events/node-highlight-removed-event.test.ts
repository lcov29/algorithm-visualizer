import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  NodeHighlightRemovedEvent,
  NodeHighlightStyleClass,
} from '../../../../src';

describe('NodeHighlightRemovedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    const highlightStyleClass: NodeHighlightStyleClass = 'nodeHighlightStyle1';
    const nodeHighlightRemovedEvent = new NodeHighlightRemovedEvent({
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
        expect(nodeHighlightRemovedEvent[methodName]).toBe(expectedResult);
      });

      it('setter throws an invalid operation error', () => {
        expect(() => {
          // @ts-expect-error invoke method by string name
          nodeHighlightRemovedEvent[methodName] = expectedResult;
        }).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      });
    });
  });
});
